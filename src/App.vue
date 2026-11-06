<script setup>
import { ref } from 'vue';
import IntroSRR from './components/IntroSRR.vue';
import NavFrame from './components/NavFrame.vue';
import BannerHero from './components/BannerHero.vue';
import NossaMissao from './components/NossaMissao.vue';
import FooterSRR from './components/FooterSRR.vue';

const introPronta = ref(false);

const links = [
  { href: '#sobre', label: 'Sobre nós' },
  { href: '#torneios', label: 'Torneios' },
  { href: '#integrantes', label: 'Integrantes' },
  { href: '#patrocinios', label: 'Patrocinadores' },
  { href: '#contatos', label: 'Contatos' },
];

const redes = [
  { href: 'https://www.instagram.com/senna_rain_racing', icon: 'fa-instagram', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@senna.rain.racing', icon: 'fa-tiktok', label: 'TikTok' },
];

const integrantes = [
  {
    id: 1,
    foto: `/integrantes/foto_joao1.png`,
    name: 'João Miguel de Medeiros',
    funcao: 'Gestor de Projetos',
    frase: '“Disciplina é a ponte que liga nossos sonhos às nossas realizações.” -  Pat Tillman',
    insta: 'https://www.instagram.com/joaomeddeiross?igsh=MXNmamlucWF0NDcxMw%3D%3D&utm_source=qr',
    linke: 'https://www.linkedin.com/in/jo%C3%A3o-miguel-de-medeiros-4514472a0/',
  },
  {
    id: 2,
    foto: '/integrantes/foto_pedro_correta1.png',
    name: 'Pedro Miguel Setti de Jesus',
    funcao: 'Engenheiro de modelagem',
    frase: '“If you no longer go for a gap that exists, you are no longer a racing driver.” - Ayrton Senna',
    insta: 'https://www.instagram.com/pedro_setti/',
    linke: 'https://www.linkedin.com/in/pedro-miguel-setti-de-jesus-4b667b289/?originalSubdomain=br',
  },
  {
    id: 3,
    foto: '/integrantes/foto_julia1.png',
    name: 'Julia Moreira Albino',
    funcao: 'Gerente de Projeto Social',
    frase: '“Acredito ter habilidades para não ficar preso a uma máquina.” The Greatest Showman',
    insta: 'https://www.instagram.com/moreirajulia_bye?igsh=YjZ4eGZtdHZ2M2F3&utm_source=qr',
    linke: '',
  },
  {
    id: 4,
    foto: '/integrantes/foto_Guilherme1.png',
    name: 'Guilherme França',
    funcao: 'Engenheiro Chefe',
    frase: '"turns out, teaching is the best way to learn"',
    insta: 'https://www.instagram.com/francoa_086?igsh=YjFzcjIweDJhb3p1',
  },
  {
    id: 5,
    foto: '/integrantes/foto_franzoi1.png',
    name: 'Leonardo Cunha Franzoi',
    funcao: 'Gerente de Enterprise',
    frase: '“Não se assuste com a altura do voo. Quanto mais alto, mais longe do perigo” Santos Dumont',
    insta: 'https://www.instagram.com/leofranzzoi?igsh=bGw2dTdyeHZ5NXRm&utm_source=qr',
    linke: '',
  },
  {
    id: 6,
    foto: '/integrantes/foto_tigas1.png',
    name: 'Tiago Felipe do Rosário',
    funcao: 'Engenheiro Aerodinâmico',
    frase: '"Seja você quem for, seja qual for sua posição social que você tenha na vida, a mais alta ou a mais baixa, tenha sempre como meta muita força, muita determinação e sempre faça tudo com amor e com muita fé em Deus, que um dia você chega lá. De alguma maneira você chega lá". - Aryton Senna',
    insta: 'https://www.instagram.com/tigasxlm/',
    linke: '',
  },
];

const missao = [
  {
    id: 1,
    title: 'Competição Educacional',
    explicacao: 'A STEM Racing é uma competição internacional que envolve estudantes do ensino fundamental e médio, onde equipes projetam, fabricam e competem com carros em miniatura movidos a ar comprimido.'
  },
  {
    id: 2,
    title: 'Desenvolvimento de Habilidades',
    explicacao: 'A competição promove o aprendizado de conceitos de engenharia, design, matemática e trabalho em equipe, incentivando os alunos a aplicarem suas habilidades em um ambiente prático e desafiador.'
  },
  {
    id: 3,
    title: 'Inovação e Criatividade',
    explicacao: 'Os participantes são desafiados a serem inovadores e criativos na criação de seus carros, utilizando tecnologia moderna e métodos de design para otimizar o desempenho.'
  },
];

const patrocinadores = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  logo: `/patrocinadores/patrocinador${i === 0 ? '' : i}.png`,
  link: '',
}));
</script>

<template>
  <IntroSRR @done="introPronta = true" />
  <NavFrame :links="links" :redes="redes" />

  <main>
    <BannerHero :pronto="introPronta" />

    <!-- faixa de patrocinadores logo abaixo do banner, estilo CPX -->
    <section class="faixa" aria-label="Patrocinadores">
      <div class="faixa__trilho">
        <img v-for="(p, i) in [...patrocinadores, ...patrocinadores]" :key="i" :src="p.logo"
          :alt="i < patrocinadores.length ? 'Patrocinador ' + p.id : ''" :aria-hidden="i >= patrocinadores.length" />
      </div>
    </section>

    <section class="secao quem-somos" id="sobre">
      <div class="quem-somos__texto">
        <p class="tag">Sobre nós</p>
        <h2>QUEM SOMOS</h2>
        <p>
          Somos a <strong>Senna Rain Racing</strong>, uma equipe formada por seis estudantes do Ensino Médio do SESI
          de Referência Joinville, participantes da competição internacional <strong>STEM Racing</strong>, promovida pela
          Fórmula 1 em parceria com a FIRST.
        </p>
        <p>
          Estreamos em 2023 no Regional de Santa Catarina, com uma participação inicial voltada à imersão e aprendizado.
          Já na Temporada 24/25, voltamos mais preparados, nos destacamos no Regional e avançamos para a Etapa Nacional
          em Brasília (2025), onde conquistamos o prêmio de <strong>Pensamento Criativo</strong>. Atualmente, nos
          dedicamos aos preparativos para o Regional da Temporada 25/26.
        </p>
        <p>
          A STEM Racing nos desafia a atuar como uma startup e como uma verdadeira escuderia de Fórmula 1. Desenvolvemos
          um carro em miniatura movido por CO₂, além de portfólios de Gestão de Projetos, Engenharia e Empreendedorismo,
          e promovemos iniciativas de marketing, impacto social e sustentabilidade — refletindo a inovação, versatilidade
          e compromisso da nossa equipe.
        </p>
      </div>
      <div class="quem-somos__imagem">
        <img src="/sobreNos.jpeg" alt="Equipe Senna Rain Racing" loading="lazy" />
      </div>
    </section>

    <section class="torneios" id="torneios">
      <div class="secao">
        <p class="tag">Trajetória</p>
        <h2>TORNEIOS</h2>
        <div class="torneios__numeros">
          <div><strong>3º</strong><span>lugar geral no Regional 2024</span></div>
          <div><strong>10</strong><span>indicações em 12 categorias</span></div>
          <div><strong>1</strong><span>prêmio de Pensamento Criativo na Nacional</span></div>
        </div>
        <p>Nossa trajetória começou no Regional da Temporada 23/24, onde vivenciamos uma experiência repleta de
          aprendizados e descobertas. No ano seguinte, a Senna Rain Racing teve um desempenho de destaque no Regional de
          2024, sendo indicada a 10 prêmios em 12 categorias e conquistando o 3º lugar geral, o que nos garantiu a
          classificação para a Etapa Nacional em Brasília.</p>
        <p>Na Nacional, fomos reconhecidos com o prêmio de Pensamento Criativo, além de vivenciarmos uma rica troca de
          experiências com equipes de todo o Brasil, fortalecendo nosso networking e visão de futuro.</p>
        <p>Agora, seguimos com ainda mais determinação nos preparativos para o Regional da Temporada 25/26, prontos para
          elevar nosso desempenho e alcançar novos horizontes.</p>
      </div>
      <img class="torneios__foto" src="/torneios.jpg" alt="Equipe Senna Rain Racing na Etapa Nacional" loading="lazy" />
    </section>

    <section class="secao" id="integrantes">
      <p class="tag">Equipe</p>
      <h2>INTEGRANTES</h2>
      <div class="cards">
        <article v-for="pessoa in integrantes" :key="pessoa.id" class="card">
          <img :src="pessoa.foto" :alt="pessoa.name" class="card__foto" loading="lazy" />
          <div class="card__corpo">
            <p class="card__funcao">{{ pessoa.funcao }}</p>
            <h3>{{ pessoa.name }}</h3>
            <p class="card__frase">{{ pessoa.frase }}</p>
            <div class="card__social">
              <a :href="pessoa.insta" target="_blank" rel="noopener" :aria-label="'Instagram de ' + pessoa.name">
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

    <NossaMissao :itens="missao" />

    <section class="secao" id="patrocinios">
      <p class="tag">Parceiros</p>
      <h2>NOSSOS PATROCINADORES</h2>
      <div class="patrocinadores">
        <div v-for="patro in patrocinadores" :key="patro.id" class="patro">
          <img :src="patro.logo" :alt="'Patrocinador ' + patro.id" loading="lazy" />
        </div>
      </div>
    </section>
  </main>

  <FooterSRR :links="links" :redes="redes" />
</template>

<style>
:root {
  --vermelho: #c1121f;
  --vermelho-escuro: #6e0010;
  --fundo: #0b0b0b;
  --fundo-2: #151515;
  --texto: #f5f5f5;
  --texto-2: #b5b5b5;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

body {
  background: var(--fundo);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
</style>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

h2 {
  font-size: clamp(2.2rem, 6vw, 4rem);
  overflow-wrap: anywhere;
  margin: 0 0 2rem;
  line-height: 1;
}

.secao {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 1.5rem;
}

.tag {
  display: inline-block;
  color: var(--vermelho);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0 0 0.75rem;
  padding-left: 2.5rem;
  position: relative;
}

.tag::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 1.8rem;
  height: 2px;
  background: currentColor;
}

/* Faixa de patrocinadores */
.faixa {
  background: var(--vermelho);
  overflow: hidden;
  padding: 1.25rem 0;
}

.faixa__trilho {
  display: flex;
  align-items: center;
  gap: 4rem;
  width: max-content;
  animation: rolar 40s linear infinite;
}

.faixa__trilho img {
  height: 48px;
  width: auto;
}

.faixa:hover .faixa__trilho {
  animation-play-state: paused;
}

@keyframes rolar {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .faixa__trilho {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
  }
}

/* Quem somos */
.quem-somos {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.quem-somos__texto p:not(.tag) {
  color: var(--texto-2);
  line-height: 1.8;
}

.quem-somos__texto strong {
  color: var(--texto);
}

.quem-somos__imagem {
  position: relative;
}

.quem-somos__imagem::before {
  content: '';
  position: absolute;
  inset: 1.5rem -1.5rem -1.5rem 1.5rem;
  border: 2px solid var(--vermelho);
}

.quem-somos__imagem img {
  position: relative;
  width: 100%;
  display: block;
}

/* Torneios */
.torneios {
  background: var(--fundo-2);
}

.torneios .secao {
  padding-bottom: 3rem;
}

.torneios p:not(.tag) {
  color: var(--texto-2);
  line-height: 1.8;
  max-width: 60rem;
}

.torneios__numeros {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.torneios__numeros div {
  border-left: 3px solid var(--vermelho);
  padding-left: 1rem;
}

.torneios__numeros strong {
  display: block;
  font-family: 'League Gothic', sans-serif;
  font-size: 4rem;
  font-weight: normal;
  line-height: 1;
  color: var(--vermelho);
}

.torneios__numeros span {
  color: var(--texto-2);
  font-size: 0.9rem;
}

.torneios__foto {
  width: 100%;
  height: clamp(140px, 22vw, 320px);
  object-fit: cover;
  display: block;
}

/* Integrantes */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  background: var(--fundo-2);
  border-bottom: 3px solid var(--vermelho);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s, box-shadow 0.25s;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(193, 18, 31, 0.25);
}

.card__foto {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: top;
  background: linear-gradient(180deg, var(--vermelho-escuro), var(--fundo-2));
}

.card__corpo {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card__funcao {
  color: var(--vermelho);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0;
}

.card h3 {
  font-size: 2rem;
  margin: 0.25rem 0 0.75rem;
}

.card__frase {
  color: var(--texto-2);
  font-size: 0.9rem;
  font-style: italic;
  line-height: 1.6;
  flex-grow: 1;
  margin: 0 0 1rem;
}

.card__social {
  display: flex;
  gap: 1rem;
  font-size: 1.3rem;
}

.card__social a:hover,
.card__social a:focus-visible {
  color: var(--vermelho);
}

/* Patrocinadores */
.patrocinadores {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: #2a2a2a;
  border: 1px solid #2a2a2a;
}

.patro {
  background: var(--fundo);
  height: 150px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s;
}

.patro img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.7;
  transition: opacity 0.25s, transform 0.25s;
}

.patro:hover {
  background: var(--vermelho-escuro);
}

.patro:hover img {
  opacity: 1;
  transform: scale(1.06);
}

/* Responsivo */
@media (max-width: 900px) {
  .quem-somos,
  .torneios__numeros {
    grid-template-columns: 1fr;
  }

  .quem-somos__imagem {
    margin-right: 0.75rem;
  }

  .quem-somos__imagem::before {
    inset: 0.75rem -0.75rem -0.75rem 0.75rem;
  }

  .patrocinadores {
    grid-template-columns: repeat(2, 1fr);
  }

  .patro {
    height: 110px;
    padding: 1rem;
  }
}
</style>
