<script setup>
defineProps({ pronto: Boolean });

const palavras = ['SENNA', 'RAIN', 'RACING'];
</script>

<template>
  <section class="banner" id="inicio" :class="{ pronto }">
    <div class="banner__faixa">
      <h1 class="banner__titulo">
        <span v-for="(p, i) in palavras" :key="p" class="banner__palavra" :style="{ transitionDelay: 0.15 * i + 's' }">
          {{ p }}
        </span>
      </h1>
      <p class="banner__texto">
        Senna Rain Racing é uma equipe de estudantes do SESI Joinville competindo na STEM Racing — engenharia, design e
        espírito de escuderia em um carro movido a CO₂.
      </p>
    </div>

    <a href="#sobre" class="banner__scroll">SCROLL <span aria-hidden="true">⌄</span></a>
  </section>
</template>

<style scoped>
/*
  Foto da equipe centralizada (cover). Um degradê escuro embaixo deixa o
  título e o texto legíveis por cima da foto.
*/
.banner {
  position: relative;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  container-type: size;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 35%, rgba(0, 0, 0, 0.9) 100%),
    #100001 url(/integrantes/equipe.jpeg) center / cover no-repeat;
  color: #fff;
}

.banner__faixa {
  position: absolute;
  bottom: 70px;
  left: 86px; /* dentro da moldura da nav */
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-align: center;
}

.banner__titulo {
  margin: 0;
  font-family: 'League Gothic', sans-serif;
  font-weight: normal;
  font-size: min(9cqw, 16cqh);
  line-height: 0.9;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.banner__palavra {
  display: inline-block;
  opacity: 0;
  transform: translateY(40%);
  transition: opacity 0.8s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.banner__palavra + .banner__palavra {
  margin-left: 0.25em;
}

.pronto .banner__palavra {
  opacity: 1;
  transform: none;
}

.banner__texto {
  max-width: 520px;
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.4;
}

.banner__scroll {
  position: absolute;
  right: 60px;
  bottom: 40px;
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  color: inherit;
  text-decoration: none;
}

@media (max-width: 900px) {
  .banner__faixa {
    left: 20px;
    right: 20px;
    bottom: 40px;
  }

  .banner__titulo {
    font-size: 15cqw;
  }

  .banner__texto {
    font-size: 0.78rem;
  }

  .banner__scroll {
    right: 24px;
    bottom: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .banner__palavra {
    transition: none;
  }
}
</style>
