<script setup>
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
]

const patrocinadores = [
  {
    id: 1,
    logo: 'patrocinadores/patrocinador.png',
    link: '',
  },
  {
    id: 2,
    logo: 'patrocinadores/patrocinador1.png',
    link: '',
  },
  {
    id: 3,
    logo: 'patrocinadores/patrocinador2.png',
    link: '',
  },
  {
    id: 4,
    logo: 'patrocinadores/patrocinador3.png',
    link: '',
  },
  {
    id: 5,
    logo: 'patrocinadores/patrocinador4.png',
    link: '',
  },
  {
    id: 6,
    logo: 'patrocinadores/patrocinador5.png',
    link: '',
  },
  {
    id: 7,
    logo: 'patrocinadores/patrocinador6.png',
    link: '',
  },
  {
    id: 8,
    logo: 'patrocinadores/patrocinador7.png',
    link: '',
  },
  {
    id: 9,
    logo: 'patrocinadores/patrocinador8.png',
    link: '',
  },
  {
    id: 10,
    logo: 'patrocinadores/patrocinador9.png',
    link: '',
  },
  {
    id: 11,
    logo: 'patrocinadores/patrocinador10.png',
    link: '',
  },
  {
    id: 12,
    logo: 'patrocinadores/patrocinador11.png',
    link: '',
  },
];

</script>

<template>
  <header>
    <nav>
      <img src="/public/logo.png" alt="" width="110px" height="62px">
      <ul>
        <li><a href="#sobre">Sobre-nos</a></li>
        <li><a href="#integrantes">Integrantes</a></li>
        <li><a href="#patrocinios">Patrocinadores</a></li>
        <li><a href="#contatos">Contatos</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="banner">
      <h1>SENNA RAIN RACING</h1>
    </section>
    <section class="quem-somos" id="sobre">
      <div class="quem-somos__container">
        <div class="quem-somos__texto">
          <h2>QUEM SOMOS</h2>
          <p>
            Somos a <strong>Senna Rain Racing</strong>, uma equipe formada por seis estudantes do Ensino Médio do SESI
            de Referência Joinville,
            participantes da competição internacional <strong>STEM Racing</strong>, promovida pela Fórmula 1 em parceria
            com a FIRST.
          </p>
          <p>
            Estreamos em 2023 no Regional de Santa Catarina, com uma participação inicial voltada à imersão e
            aprendizado.
            Já na Temporada 24/25, voltamos mais preparados, nos destacamos no Regional e avançamos para a Etapa
            Nacional
            em Brasília (2025), onde conquistamos o prêmio de <strong>Pensamento Criativo</strong>. Atualmente, nos
            dedicamos aos preparativos
            para o Regional da Temporada 25/26.
          </p>
          <p>
            A STEM Racing nos desafia a atuar como uma startup e como uma verdadeira escuderia de Fórmula 1.
            Desenvolvemos
            um carro em miniatura movido por CO₂, além de portfólios de Gestão de Projetos, Engenharia e
            Empreendedorismo,
            e promovemos iniciativas de marketing, impacto social e sustentabilidade — refletindo a inovação,
            versatilidade e
            compromisso da nossa equipe.
          </p>
        </div>

        <div class="quem-somos__imagem">
          <img src="/public/sobreNos.jpeg" alt="Equipe Senna Rain Racing" />
        </div>
      </div>
    </section>

    <section class="torneios">
      <h2>Torneios</h2>
      <p>Nossa trajetória começou no Regional da Temporada 23/24, onde vivenciamos uma experiência repleta de
        aprendizados e descobertas. No ano seguinte, a Senna Rain Racing teve um desempenho de destaque no Regional de
        2024, sendo indicada a 10 prêmios em 12 categorias e conquistando o 3º lugar geral, o que nos garantiu a
        classificação para a Etapa Nacional em Brasília.

        Na Nacional, fomos reconhecidos com o prêmio de Pensamento Criativo, além de vivenciarmos uma rica troca de
        experiências com equipes de todo o Brasil, fortalecendo nosso networking e visão de futuro.

        Agora, seguimos com ainda mais determinação nos preparativos para o Regional da Temporada 25/26, prontos para
        elevar nosso desempenho e alcançar novos horizontes.</p>
      <img src="/public/torneios.png " alt="">
    </section>

    <section class="integrantes" id="integrantes">
      <h2>INTEGRANTES</h2>
      <div class="cardsPessoas">
        <div v-for="pessoa in integrantes" :key="pessoa.id" class="card">
          <img :src="pessoa.foto" :alt="pessoa.name" class="foto" />
          <h3>{{ pessoa.name }}</h3>
          <p class="funcao">{{ pessoa.funcao }}</p>
          <p class="frase">{{ pessoa.frase }}</p>
          <div class="social">
            <a :href="pessoa.insta" target="_blank"><i class="fab fa-instagram"></i></a>
            <a v-if="pessoa.linke" :href="pessoa.linke" target="_blank">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="nossaMisao">
      <h2>Nossa missão</h2>
      <p><b>Transformar sonhos em conquistas, acelerando talentos nas pistas e levando nossa paixão pela excelência ao
          cenário competitivo global.</b></p>
      <div class="cardMisao">
        <div v-for="objeto in missao" :key="objeto.id" class="missoes">
          <p class="number">{{ objeto.id }}</p>
          <h3>{{ objeto.title }}</h3>
          <p class="expli">{{ objeto.explicacao }}</p>
        </div>
      </div>
    </section>

    <section class="patrocinios" id="patrocinios">
      <h2>Nossos patrocinadores</h2>

      <div class="grid-patrocinadores">
        <div v-for="patro in patrocinadores" :key="patro.id" class="patro">
          <img :src="patro.logo" :alt="'Patrocinador ' + patro.id" />
        </div>
      </div>
    </section>
    <section id="contatos"></section>
  </main>

  <footer>
    <section class="footer" id="contatos">
      <div class="div1">
        <div class="img">
          <img src="/public/logo.png" alt="">
        </div>
        <div class="contatos">
          <h4>Contatos</h4>
          <div><span class="fa-solid fa-envelope"></span>
            <p>sennarainracing@gmail.com</p>
          </div>
          <div><span class="fa-brands fa-instagram"></span>
            <p><a href="https://www.instagram.com/senna_rain_racing">@senna_rain_racing</a></p>
          </div>
          <div><span class="fa-brands fa-tiktok"></span>
            <p><a href="https://www.tiktok.com/@senna.rain.racing">senna.rain.racing</a></p>
          </div>
        </div>
        <div class="menu">
          <h4>Menu</h4>
          <p>Home</p>
          <p>Sobre-Nos</p>
          <p>Contato</p>
        </div>
      </div>
      <p id="copy">Copyright &copy; 2025 - Senna Rain Racing
        Todos os direitos reservados
      </p>
    </section>
  </footer>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}

a {
  color: white;
  text-decoration: none;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #0000005d;
  z-index: 1000;

  & nav {
    display: flex;
    justify-content: space-between;

    & ul {
      list-style: none;
      display: flex;

      & a {
        margin: 0 2vw 0 0;
      }

    }
  }
}

.banner {
  background-image: url(/public/banner.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  & h1 {
    font-size: 7rem;
  }
}

.quem-somos {
  background-color: #0d0d0d;
  color: #f5f5f5;
  padding: 60px 0;
  display: flex;
  justify-content: center;
}

.quem-somos__container {
  display: flex;
  align-items: center;
  max-width: 1700px;
  gap: 40px;
  flex-wrap: wrap;
}

.quem-somos__texto {
  flex: 1 1 300px;
}

.quem-somos__texto h2 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #fff;
}

.quem-somos__texto p {
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #ddd;
}

.quem-somos__imagem {
  flex: 1 1;
  display: flex;
  justify-content: center;
}

.quem-somos__imagem img {
  max-width: 110%;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

/* Responsivo */
@media (max-width: 768px) {
  .quem-somos__container {
    flex-direction: column;
    text-align: center;
  }

  .quem-somos__imagem {
    margin-top: 20px;
  }

  .quem-somos__texto {
    flex: unset;
  }
}


.torneios {
  text-align: center;
  margin: 0 7vw;

  & img {
    margin-top: 20px;
    width: 1150px;
    height: 167px;
  }
}



.integrantes {
  padding: 2rem;
  text-align: center;
  color: white;

  & h2 {
    font-size: 3rem;
  }

  & .cardsPessoas {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    & .card {
      background: radial-gradient(circle, #720000 0%, #320000 100%);
      background-color: #720000;
      background-image: repeating-radial-gradient(circle at 0 0, transparent 0, #7200004d 10px), repeating-linear-gradient(#320000, #320000);
      padding: 1.5rem;
      border-radius: 1rem;
      color: white;
      text-align: center;

      /* Layout interno flexível para posicionar os ícones no final */
      display: flex;
      flex-direction: column;

      & .foto {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        object-fit: cover;
        margin: 0 auto 1rem auto;
        background-position: start;
      }

      & h3 {
        margin-bottom: 0.5rem;
      }

      & .funcao {
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      & .frase {
        font-size: 0.9rem;
        margin: 1rem 0;
        flex-grow: 1;
      }

      & .social {
        margin-top: auto;
        padding-top: 0.5rem;

        & a {
          margin: 0 0.5rem;
          font-size: 1.4rem;
          color: white;
        }
      }
    }

    & .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 25px rgba(255, 0, 0, 0.3);
    }
  }
}

.nossaMisao {
  text-align: center;

  & .cardMisao {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    & .missoes {
      background-color: #1E1E1E;
      box-shadow: 0 0 25px black;
      width: calc(33.333% - 2rem);
      min-width: 200px;
      max-width: 320px;
      padding: 1rem 1.5rem;
      border-radius: 1rem;
      text-align: center;
      flex: 1 1 calc(33.333% - 2rem);

      & p {
        font-family: 'Poppins';
      }

      & .number {
        text-align: center;
        font-family: 'League Gothic', 'Poppins';
        font-size: 2.2rem;
        background-color: #8b0013;
        border-radius: 100%;
        margin: 10px 43%;
      }

      & h3 {
        margin: 15px 0;
        font-size: 1.8rem;
      }

      & .expli {
        padding: 0 2vw;
        font-size: 1rem;
      }
    }
  }
}

.patrocinios {
  text-align: center;
}



footer .footer {
  width: 100%;
  background-color: #3b3b3b;
  margin: 0;
  padding: 0;

  & p,
  a {
    color: #ACACAC;
  }

  & p {
    margin: 0 0 10px 0;
  }

  & p#copy {
    text-align: center;
    padding: 0 41%;
  }

  & .div1 {
    display: flex;

    & .img {
      padding: 2vw 3vw;

      & img {
        width: 200px;
        height: 113px;
      }
    }

    & h4 {
      letter-spacing: 2px;
      font-family: 'Poppins';
      font-weight: normal;
      border-bottom: 1px solid white;
      display: inline-block;
      padding-bottom: 2px;
    }

    & .contatos {
      margin: 0 40px 0 20px;

      & span {
        font-size: 1.3rem
      }

      & div {
        display: flex;
        align-items: center;
        padding: -10px;

        & span {
          color: #ACACAC;
          margin: 0 7px 5px 0;
        }
      }
    }

    & p:hover {
      color: #e2e1e1;
    }

    & a:hover {
      text-decoration: underline;
      color: #e2e1e1;
      cursor: pointer;
    }
  }
}


.patrocinios {
  text-align: center;
  color: white;
  padding: 60px 1rem;
}

.patrocinios h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Container da grade */
.grid-patrocinadores {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  row-gap: 1vw;
  column-gap: 3vw;
  max-width: 1400px;
  margin: 0 auto;
  align-items: center;
  justify-items: center;
}

/* Blocos individuais */
.patro {
  background-color: #6e0010;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  max-width: 430px;
  width: 100%;
  height: 150px;
}

/* Imagem da logo */
.patro img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0.9);
  transition: transform 0.3s ease, filter 0.3s ease;
}

/* Efeito hover */
.patro:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
}

.patro:hover img {
  filter: brightness(1.1);
  transform: scale(1.07);
}
</style>
