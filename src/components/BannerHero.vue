<script setup>
defineProps({ pronto: Boolean });

const palavras = [
  { sub: '01S', txt: 'SENNA.', cls: 'p1' },
  { sub: '02R', txt: 'RAIN.', cls: 'p2' },
  { sub: '03R', txt: 'RACING.', cls: 'p3' },
];
</script>

<template>
  <section class="banner" id="inicio" :class="{ pronto }">
    <p class="banner__texto">
      Senna Rain Racing é uma equipe de estudantes do SESI Joinville competindo na STEM Racing — engenharia, design e
      espírito de escuderia em um carro movido a CO₂.
    </p>

    <h1 class="banner__titulo">
      <span v-for="(p, i) in palavras" :key="p.txt" class="banner__palavra" :class="p.cls"
        :style="{ transitionDelay: 0.15 * i + 's' }">
        <small>{{ p.sub }}</small>{{ p.txt }}
      </span>
    </h1>

    <a href="#sobre" class="banner__scroll">SCROLL <span aria-hidden="true">⌄</span></a>
  </section>
</template>

<style scoped>
.banner {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(11, 11, 11, 0.6) 0%, transparent 22%),
    linear-gradient(0deg, rgba(11, 11, 11, 0.85) 0%, transparent 45%),
    linear-gradient(90deg, rgba(110, 0, 16, 0.55), transparent 60%),
    url(/banner.jpg) center 30% / cover no-repeat;
  color: #fff;
}

.banner__texto {
  position: absolute;
  top: 110px;
  left: 120px;
  max-width: 270px;
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.4;
}

.banner__titulo {
  position: absolute;
  inset: auto 40px 60px 120px;
  margin: 0;
  display: grid;
  font-family: 'Archivo', sans-serif;
  font-weight: 900;
  font-size: clamp(3.5rem, 11vw, 10rem);
  line-height: 0.82;
  letter-spacing: -0.05em;
}

.banner__palavra {
  position: relative;
  width: max-content;
  opacity: 0;
  transform: translateY(40%);
  transition: opacity 0.8s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.pronto .banner__palavra {
  opacity: 1;
  transform: none;
}

.p1 {
  margin-left: 28%;
}

.p2 {
  margin-left: 40%;
}

.banner__palavra small {
  position: absolute;
  top: -0.6rem;
  left: -2.5rem;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 0;
}

.banner__scroll {
  position: absolute;
  right: 60px;
  bottom: 40px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: inherit;
  text-decoration: none;
}

@media (max-width: 900px) {
  .banner__texto {
    top: 90px;
    left: 80px;
    right: 24px;
  }

  .banner__titulo {
    inset: auto 20px 70px 70px;
  }

  .p1,
  .p2 {
    margin-left: 0;
  }

  .banner__palavra small {
    left: 0;
    top: -1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .banner__palavra {
    transition: none;
  }
}
</style>
