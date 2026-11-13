<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({ pessoas: { type: Array, required: true } });

const secao = ref(null);
const cena = ref(null);
const palco = ref(null);
const dica = ref(null);
const vagas = ref([]);
const fotos = ref([]);
const infos = ref([]);
let frame = 0;

const limitar = (v) => Math.min(Math.max(v, 0), 1);
const misturar = (a, b, t) => a + (b - a) * t;
const suave = (t) => t * t * (3 - 2 * t);

// Igual yanndo: a foto sai da faixa de cima, cai girando até o palco e,
// quando a próxima cai, a anterior despenca pra fora da tela.
function atualizar() {
  frame = 0;
  const { top, height } = secao.value.getBoundingClientRect();
  const total = height - innerHeight;
  const n = props.pessoas.length;
  const c = (total > 0 ? limitar(-top / total) : 0) * n; // 0..n: quantas já caíram

  // lê tudo antes de escrever, pra não forçar layout a cada foto
  const base = cena.value.getBoundingClientRect();
  const centro = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2, w: r.width };
  };
  const destino = centro(palco.value);
  const vagasPos = vagas.value.map(centro);
  const W = destino.w;
  const H = palco.value.offsetHeight;

  dica.value.style.opacity = 1 - limitar(c / 0.3);

  for (let i = 0; i < n; i++) {
    const a = c - i; // <0 na faixa, 0..0.5 caindo, 0.5..1 no palco, 1..1.5 saindo
    const lado = i % 2 ? -1 : 1;
    const vaga = vagasPos[i];
    let x = vaga.x, y = vaga.y, s = vaga.w / W, r = 0;

    if (a >= 1) {
      const t = limitar((a - 1) / 0.5);
      x = destino.x + t * 120 * lado;
      y = destino.y + t * t * (base.height + H);
      s = 1;
      r = t * 30 * lado;
    } else if (a >= 0.5) {
      x = destino.x; y = destino.y; s = 1;
    } else if (a > 0) {
      const t = a / 0.5;
      x = misturar(vaga.x, destino.x, suave(t));
      y = misturar(vaga.y, destino.y, t * t); // acelera como queda
      s = misturar(s, 1, suave(t));
      r = Math.sin(t * Math.PI) * 22 * lado; // gira no meio da queda e assenta reto
    }

    const foto = fotos.value[i];
    foto.style.transform = `translate(${x - W / 2}px, ${y - H / 2}px) rotate(${r}deg) scale(${s})`;
    foto.style.zIndex = a > 0 ? 10 + i : 1;

    const o = a < 1 ? limitar((a - 0.35) / 0.2) : 1 - limitar((a - 1) / 0.2);
    infos.value[i].style.setProperty('--o', o);
    infos.value[i].inert = o < 0.5; // links de quem não está no palco não recebem tab nem clique
  }
}
const agendar = () => frame || (frame = requestAnimationFrame(atualizar));

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  addEventListener('scroll', agendar, { passive: true });
  addEventListener('resize', agendar);
  atualizar();
});
onUnmounted(() => {
  removeEventListener('scroll', agendar);
  removeEventListener('resize', agendar);
  cancelAnimationFrame(frame);
});

const dois = (v) => String(v).padStart(2, '0');
</script>

<template>
  <section ref="secao" class="equipe" id="integrantes" :style="{ '--n': pessoas.length }">
    <div ref="cena" class="cena">
      <div class="cena__topo">
        <div>
          <p class="cena__tag">Equipe</p>
          <h2>INTEGRANTES</h2>
        </div>
        <div class="faixa" aria-hidden="true">
          <span v-for="pessoa in pessoas" :key="pessoa.id" ref="vagas" class="vaga"></span>
        </div>
      </div>

      <div ref="palco" class="cena__palco" aria-hidden="true"></div>
      <p ref="dica" class="cena__dica" aria-hidden="true">Role para puxar ↓</p>

      <article v-for="(pessoa, i) in pessoas" :key="pessoa.id" class="pessoa">
        <img ref="fotos" class="pessoa__foto" :src="pessoa.foto" :alt="pessoa.name" />
        <div ref="infos" class="pessoa__info">
          <p class="pessoa__num">{{ dois(i + 1) }} / {{ dois(pessoas.length) }}</p>
          <p class="pessoa__funcao">{{ pessoa.funcao }}</p>
          <h3>{{ pessoa.name }}</h3>
          <p class="pessoa__frase">{{ pessoa.frase }}</p>
          <div class="pessoa__social">
            <a v-if="pessoa.insta" :href="pessoa.insta" target="_blank" rel="noopener"
              :aria-label="'Instagram de ' + pessoa.name">
              <span class="fab fa-instagram" aria-hidden="true"></span>
            </a>
            <a v-if="pessoa.linke" :href="pessoa.linke" target="_blank" rel="noopener"
              :aria-label="'LinkedIn de ' + pessoa.name">
              <span class="fab fa-linkedin" aria-hidden="true"></span>
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.equipe {
  /* 1 tela presa + ~70% de tela de scroll por pessoa */
  height: calc(100vh + var(--n) * 70vh);
}

.cena {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  box-sizing: border-box;
  padding: 100px max(1.5rem, calc((100% - 1200px) / 2)) 2rem;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-areas: 'topo topo' 'palco info';
  column-gap: 3rem;
  row-gap: 1.5rem;
}

/* Título + faixa de blocos (as fotos pequenas ficam aqui antes de cair) */
.cena__topo {
  grid-area: topo;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.cena__tag {
  color: var(--vermelho);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0 0 0.5rem;
}

.cena__topo h2 {
  font-family: 'League Gothic', sans-serif;
  font-weight: normal;
  font-size: clamp(3rem, 6vw, 5.5rem);
  line-height: 0.85;
  letter-spacing: 0;
  margin: 0;
}

.faixa {
  display: flex;
  gap: 6px;
}

.vaga {
  width: 56px;
  aspect-ratio: 2 / 3;
  border: 1px dashed rgba(255, 255, 255, 0.25);
}

/* Palco: mesmo tamanho da foto grande; o JS mede ele e as vagas pra posicionar as fotos */
.cena__palco,
.pessoa__foto {
  height: min(56vh, 500px);
  aspect-ratio: 2 / 3;
}

.cena__palco {
  grid-area: palco;
  align-self: center;
}

.cena__dica {
  grid-area: info;
  align-self: center;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: var(--texto-2);
  margin: 0;
}

.pessoa {
  display: contents;
}

.pessoa__foto {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: top;
  border-bottom: 3px solid var(--vermelho);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  background: var(--fundo-2);
  will-change: transform;
}

.pessoa__info {
  --o: 0;
  grid-area: info;
  align-self: center;
  max-width: 30rem;
  opacity: var(--o);
  transform: translateY(calc((1 - var(--o)) * 20px));
}

.pessoa__num {
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: var(--texto-2);
  margin: 0 0 1rem;
}

.pessoa__funcao {
  color: var(--vermelho);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0;
}

.pessoa__info h3 {
  font-family: 'League Gothic', sans-serif;
  font-weight: normal;
  font-size: clamp(2.4rem, 4.5vw, 4rem);
  line-height: 0.95;
  letter-spacing: 0;
  margin: 0.25rem 0 0.75rem;
}

.pessoa__frase {
  color: var(--texto-2);
  font-size: 0.9rem;
  font-style: italic;
  line-height: 1.6;
  margin: 0 0 1rem;
}

.pessoa__social {
  display: flex;
  gap: 1rem;
  font-size: 1.4rem;
}

.pessoa__social a {
  color: inherit;
  text-decoration: none;
}

.pessoa__social a:hover,
.pessoa__social a:focus-visible {
  color: var(--vermelho);
}

/* Celular: título e faixa em cima, foto no meio, dados embaixo */
@media (max-width: 900px) {
  .cena {
    padding: 90px 1.25rem 1.25rem;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto auto;
    grid-template-areas: 'topo' 'palco' 'info';
    align-content: start;
    row-gap: 1rem;
    text-align: center;
  }

  .cena__topo {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .vaga {
    width: 40px;
  }

  .cena__palco,
  .pessoa__foto {
    height: min(38vh, 340px);
  }

  .cena__palco,
  .cena__dica,
  .pessoa__info {
    justify-self: center;
  }

  .pessoa__num {
    margin-bottom: 0.4rem;
  }

  .pessoa__info h3 {
    margin-bottom: 0.4rem;
  }

  .pessoa__frase {
    font-size: 0.78rem;
    margin-bottom: 0.6rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .pessoa__social {
    justify-content: center;
  }
}

/* Sem animação: grade simples de cartões */
@media (prefers-reduced-motion: reduce) {
  .equipe {
    height: auto;
  }

  .cena {
    position: static;
    height: auto;
    overflow: visible;
    padding-block: 6rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-template-rows: none;
    grid-template-areas: none;
    gap: 1.5rem;
    text-align: left;
  }

  .cena__topo {
    grid-column: 1 / -1;
  }

  .faixa,
  .cena__palco,
  .cena__dica,
  .pessoa__num {
    display: none;
  }

  .pessoa {
    display: block;
    background: var(--fundo-2);
  }

  .pessoa__foto {
    position: static;
    width: 100%;
    height: auto;
    display: block;
    box-shadow: none;
  }

  .pessoa__info {
    padding: 1.5rem;
    opacity: 1;
    transform: none;
  }

  .pessoa__social {
    justify-content: flex-start;
  }
}
</style>
