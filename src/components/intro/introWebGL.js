import {
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three';

// Mesma técnica do kprverse:
// 1) padrão de fundo = sequência de 101 quadros minúsculos (224x126), feita no Hyperframes (intro-video/),
//    ampliada, borrada e recortada no shader -> formas gosmentas e lisas;
// 2) logo nítido revelado traço a traço por um mapa de ordem (intro-video/gerar-logo.py).
const SPRITE = { url: '/intro/padrao.png', colunas: 9, linhas: 12, quadros: 101, w: 224, h: 126, fps: 30 };
const LOGO = { url: '/intro/logo.png', aspecto: 1732 / 648 };

// Linha do tempo (s)
const LOGO_INICIO = 0.9;
const LOGO_FIM = 2.1;
const CORTINA_INICIO = 3.5;
const CORTINA_FIM = 4.6;
export const DURACAO_TOTAL = CORTINA_FIM;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uSprite;
  uniform sampler2D uLogo;
  uniform vec2 uGrade;      // colunas, linhas da spritesheet
  uniform vec2 uQuadroPx;   // tamanho de um quadro em pixels
  uniform float uQuadro;
  uniform float uProgresso; // revelação do logo 0..1
  uniform float uReveal;    // cortina
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uLogoAspecto;
  varying vec2 vUv;

  float aastep(float limite, float v) {
    float w = fwidth(v) * 0.7;
    return smoothstep(limite - w, limite + w, v);
  }

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }

  // tinta do quadro atual em coordenadas 0..1 do quadro, já borrada
  float padrao(vec2 st) {
    vec2 celula = vec2(mod(uQuadro, uGrade.x), floor(uQuadro / uGrade.x));
    vec2 meio = 0.5 / uQuadroPx; // não deixa o borrão vazar pro quadro vizinho
    float s = 0.0;
    for (int x = -1; x <= 1; x++)
      for (int y = -1; y <= 1; y++) {
        vec2 p = clamp(st + vec2(x, y) * 0.6 / uQuadroPx, meio, 1.0 - meio);
        vec2 uv = (celula + p) / uGrade; // y pra baixo, como na imagem
        s += 1.0 - texture2D(uSprite, vec2(uv.x, 1.0 - uv.y)).r;
      }
    return s / 9.0;
  }

  void main() {
    // padrão cobre a tela inteira (cover), centralizado
    float aspTela = uRes.x / uRes.y;
    float aspQuadro = uQuadroPx.x / uQuadroPx.y;
    vec2 st = vec2(vUv.x, 1.0 - vUv.y);
    if (aspTela > aspQuadro) st.y = (st.y - 0.5) * aspQuadro / aspTela + 0.5;
    else st.x = (st.x - 0.5) * aspTela / aspQuadro + 0.5;
    float tinta = aastep(0.42, padrao(st));

    // logo centralizado: 80% da largura, sem passar de 45% da altura
    float largura = min(0.8, 0.45 * uLogoAspecto / aspTela);
    vec2 lc = vec2((vUv.x - 0.5) / largura, (vUv.y - 0.5) / (largura * aspTela / uLogoAspecto)) + 0.5;
    if (all(greaterThanEqual(lc, vec2(0.0))) && all(lessThanEqual(lc, vec2(1.0)))) {
      vec4 l = texture2D(uLogo, lc);
      // o logo original é pequeno: borra de leve antes do corte pra borda ficar lisa
      vec2 px = 3.0 / vec2(1732.0, 648.0);
      float cobertura = 0.0;
      for (int x = -1; x <= 1; x++)
        for (int y = -1; y <= 1; y++) cobertura += texture2D(uLogo, lc + vec2(x, y) * px).g;
      cobertura /= 9.0;
      float desenhado = 1.0 - aastep(uProgresso, l.r + 0.001);
      tinta = max(tinta, aastep(0.5, cobertura) * desenhado);
    }

    // cortina líquida subindo: embaixo vira transparente e mostra o site
    float onda = (noise(vec2(vUv.x * 7.0, uTime * 2.0)) - 0.5) * 0.12;
    float alfa = smoothstep(uReveal - 0.004, uReveal + 0.004, vUv.y + onda);

    gl_FragColor = vec4(vec3(1.0 - tinta), alfa);
  }
`;

const suave = (x) => {
  const c = Math.min(Math.max(x, 0), 1);
  return c < 0.5 ? 2 * c * c : 1 - (-2 * c + 2) ** 2 / 2;
};

/**
 * Monta e anima a intro no container. Lança erro se não houver WebGL ou se as imagens não carregarem.
 */
export async function iniciarIntroWebGL(container, { aoRevelar, aoTerminar }) {
  const renderer = new WebGLRenderer({ alpha: true, antialias: false });
  const loader = new TextureLoader();
  const [sprite, logo] = await Promise.all([loader.loadAsync(SPRITE.url), loader.loadAsync(LOGO.url)]);
  for (const t of [sprite, logo]) {
    t.minFilter = LinearFilter; // dados, não foto: sem mipmap nem conversão de cor
    t.generateMipmaps = false;
  }

  const dpr = Math.min(devicePixelRatio, 2);
  const w = innerWidth;
  const h = innerHeight;
  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h);
  container.appendChild(renderer.domElement);

  const geometria = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: {
      uSprite: { value: sprite },
      uLogo: { value: logo },
      uGrade: { value: new Vector2(SPRITE.colunas, SPRITE.linhas) },
      uQuadroPx: { value: new Vector2(SPRITE.w, SPRITE.h) },
      uQuadro: { value: 0 },
      uProgresso: { value: 0 },
      uReveal: { value: -0.1 },
      uTime: { value: 0 },
      uRes: { value: new Vector2(w, h) },
      uLogoAspecto: { value: LOGO.aspecto },
    },
  });
  const cena = new Scene();
  cena.add(new Mesh(geometria, material));
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const desenhar = (t) => {
    const u = material.uniforms;
    u.uTime.value = t;
    u.uQuadro.value = Math.min(Math.floor(t * SPRITE.fps), SPRITE.quadros - 1);
    u.uProgresso.value = suave((t - LOGO_INICIO) / (LOGO_FIM - LOGO_INICIO));
    u.uReveal.value = -0.1 + suave((t - CORTINA_INICIO) / (CORTINA_FIM - CORTINA_INICIO)) * 1.2;
    renderer.render(cena, camera);
  };

  desenhar(0); // primeiro quadro já pintado, sem piscar o site
  let revelou = false;
  const inicio = performance.now();
  renderer.setAnimationLoop(() => {
    const t = (performance.now() - inicio) / 1000;
    if (!revelou && t >= CORTINA_INICIO) {
      revelou = true;
      aoRevelar();
    }
    desenhar(t);
    if (t >= CORTINA_FIM) aoTerminar();
  });

  return function destruir() {
    renderer.setAnimationLoop(null);
    sprite.dispose();
    logo.dispose();
    geometria.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
