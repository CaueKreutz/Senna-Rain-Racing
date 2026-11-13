<script setup>
import { ref } from 'vue';
import IntroSRR from './components/IntroSRR.vue';
import NavFrame from './components/NavFrame.vue';
// Banner anterior (foto de fundo antiga): import BannerHero from './components/BannerHero.vue';
import BannerEquipe from './components/BannerEquipe.vue';
import NossaMissao from './components/NossaMissao.vue';
//import EquipeSRR from './components/EquipeSRR.vue';
import EquipeQueda from './components/EquipeQueda.vue';
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
    foto: '/integrantes/foto_joao2.jpeg',
    name: 'João Medeiros',
    funcao: 'Líder e Gestor do Projeto',
    frase: '“No que diz respeito ao empenho, ao compromisso, ao esforço e à dedicação, não existe meio-termo.” — Ayrton Senna',
    insta: 'https://www.instagram.com/joaomeddeiross/',
    linke: 'https://www.linkedin.com/in/jo%C3%A3o-miguel-de-medeiros-4514472a0/',
  },
  {
    id: 2,
    foto: '/integrantes/foto_julia2.jpeg',
    name: 'Julia Albino',
    funcao: 'Gestora do Projeto Social',
    frase: '“Acredito ter habilidades para não ficar preso a uma máquina.” —The Greatest Showman',
    insta: 'https://www.instagram.com/moreirajulia_bye/',
    linke: 'https://www.linkedin.com/in/julia-moreira-albino-aa41a3365/',
  },
  {
    id: 3,
    foto: '/integrantes/foto_franzoi2.jpeg',
    name: 'Leonardo Franzoi',
    funcao: 'Gerente de Empreendimento',
    frase: '“Não se assuste com a altura do voo. Quanto mais alto, mais longe do perigo” — Santos Dumont',
    insta: 'https://www.instagram.com/leofranzzoi/',
    linke: 'https://www.linkedin.com/in/leonardocunhafranzoi/',
  },
  {
    id: 4,
    foto: '/integrantes/foto_yasmin.jpeg',
    name: 'Yasmin Machado',
    funcao: 'Analista de Empreendimento',
    frase: '“O sucesso não é definitivo, o fracasso não é fatal: é a coragem de continuar que conta.”',
    insta: 'https://www.instagram.com/_yasdsm/',
    linke: 'https://www.linkedin.com/in/yasmin-desouza-machado/',
  },
  {
    id: 5,
    foto: '/integrantes/Tiago.jpeg',
    name: 'Tiago Rosário',
    funcao: 'Chefe de Engenharia e Aerodinâmica',
    frase: '“Forte é quem, depois de tanto perder, reergue-se e segue lutando.” — Ayrton Senna',
    insta: 'https://www.instagram.com/tigasxlm/',
    linke: 'https://www.linkedin.com/in/tiago-felipe-do-ros%C3%A1rio-194668351/',
  },
  {
    id: 6,
    foto: '/integrantes/foto_pedro.jpeg',
    name: 'Pedro Setti',
    funcao: 'Engenheiro de Design e Manufatura',
    frase: '“Se você quiser alguém em quem confiar, confie em si mesmo.” — Renato Russo',
    insta: 'https://www.instagram.com/pedro_setti/',
    linke: 'https://www.linkedin.com/in/pedro-setti-4b667b289',
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

const patrocinadores = [
  'patrocinador1.png',
  'patrocinador3.png',
  'patrocinador6.png',
  'patrocinador7.png',
  'patrocinador8.png',
  'patrocinador10.png',
  'patrocinador11.png',
  'alltech-logo.png', // Grupo Alltech
].map((arquivo, i) => ({ id: i + 1, logo: `/patrocinadores/${arquivo}`, link: '' }));
</script>

<template>
  <IntroSRR @done="introPronta = true" />
  <NavFrame :links="links" :redes="redes" />

  <main>
    <BannerEquipe :pronto="introPronta" />

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
          <div><strong>+9</strong><span>Troféus na competição</span></div>
          <div><strong>15º</strong><span>Lugar Geral no Nacional (2025)</span></div>
          <div><strong>12º</strong><span>Lugar Geral no Nacional (2026)</span></div>
        </div>
        <p>A história da Senna Rain Racing (SRR) nos torneios de STEM Racing começou em 2023, quando participamos pela
          primeira vez de uma competição regional. A experiência marcou o início da nossa jornada, proporcionando
          aprendizados, desafios e os primeiros contatos com o universo da engenharia, gestão e inovação.</p>
        <p>Em 2024, retornamos às pistas com uma equipe mais preparada e determinada. Os resultados expressivos
          conquistados na etapa regional garantiram nossa classificação para o Torneio Nacional, representando um
          importante marco na evolução da equipe.</p>
        <p>Em 2025, alcançamos mais um capítulo dessa trajetória ao participarmos novamente do cenário nacional.
          Conquistamos o prêmio de Pensamento Criativo e alcançamos o 15º lugar na classificação geral, demonstrando
          nosso potencial e ampliando nossa experiência competitiva.</p>
        <p>Em 2026, nossa evolução se refletiu em resultados ainda mais expressivos: conquistamos o 12º lugar geral no
          Torneio Nacional e o reconhecimento de Melhor Projeto Social do Brasil. Essas conquistas representam não apenas
          nosso crescimento técnico e organizacional, mas também o compromisso de utilizar a ciência, a tecnologia e a
          inovação para gerar impacto positivo na sociedade.</p>
        <p>De uma primeira participação marcada pelo aprendizado a conquistas de destaque nacional, cada torneio
          representa um novo passo na construção da nossa história. Seguimos evoluindo, aprendendo e buscando novos
          desafios, com o propósito de levar a Senna Rain Racing cada vez mais longe.</p>
      </div>
      <figure class="torneios__foto">
        <img src="/integrantes/equipe_camp.jpeg" alt="Equipe Senna Rain Racing no Torneio Nacional" loading="lazy" />
      </figure>
    </section>

    <EquipeQueda :pessoas="integrantes" />

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

  <FooterSRR :links="links" />
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

/* centralizada e menor que a largura real da foto (1022px), pra não ampliar e pixelar */
.torneios__foto {
  position: relative;
  width: min(100% - 3rem, 800px);
  margin: 0 auto;
  padding-bottom: 6rem;
}

/* moldura vermelha deslocada, igual à do "Quem somos" */
.torneios__foto::before {
  content: '';
  position: absolute;
  inset: 1.5rem -1.5rem calc(6rem - 1.5rem) 1.5rem;
  border: 2px solid var(--vermelho);
}

.torneios__foto img {
  position: relative;
  width: 100%;
  height: auto; /* foto inteira, sem cortar */
  display: block;
  border-bottom: 3px solid var(--vermelho);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

/* etiqueta vermelha no canto da foto */
.torneios__foto figcaption {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--vermelho);
  color: #fff;
  padding: 0.4rem 0.9rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
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

  .torneios__foto {
    width: calc(100% - 3rem);
  }

  .torneios__foto::before {
    inset: 0.75rem -0.75rem calc(6rem - 0.75rem) 0.75rem;
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
