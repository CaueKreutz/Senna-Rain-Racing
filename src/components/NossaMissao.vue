<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

defineProps({ itens: { type: Array, required: true } });

const secao = ref(null);
const visivel = ref(false);
let obs;

// Cartas sobem e se espalham quando a seção entra na tela
onMounted(() => {
  obs = new IntersectionObserver(([e]) => e.isIntersecting && (visivel.value = true), { threshold: 0.25 });
  obs.observe(secao.value);
});
onUnmounted(() => obs?.disconnect());

const giros = [-4, 3, -2, 4];
const icones = ['fa-flag-checkered', 'fa-screwdriver-wrench', 'fa-lightbulb', 'fa-trophy'];
</script>

<template>
  <section ref="secao" class="missao" :class="{ visivel }" id="missao">
    <div class="missao__topo">
      <h2>NOSSA MISSÃO</h2>
      <p>Transformar sonhos em conquistas, acelerando talentos nas pistas e levando nossa paixão pela excelência ao
        cenário competitivo global.</p>
    </div>

    <div class="missao__cartas">
      <article v-for="(item, i) in itens" :key="item.id" class="carta"
        :style="{ '--giro': giros[i % 4] + 'deg', transitionDelay: 0.12 * i + 's' }">
        <div class="carta__aba">
          <svg viewBox="0 0 82 27" aria-hidden="true">
            <path
              d="M4.68 19.27c1.74 0 3.16-1.41 3.16-3.16V6.32A6.32 6.32 0 0 1 14.15 0h53.28a6.32 6.32 0 0 1 6.32 6.32v9.79c0 1.75 1.41 3.16 3.16 3.16H82v3.68c0 1.74-1.41 3.16-3.16 3.16H3.16A3.16 3.16 0 0 1 0 22.95v-3.68z" />
          </svg>
          <span>missão</span>
        </div>
        <h3 class="carta__titulo">{{ item.title }}</h3>
        <p class="carta__num">0{{ item.id }}.</p>
        <p class="carta__texto">{{ item.explicacao }}</p>
        <div class="carta__arte" aria-hidden="true">
          <span class="fa-solid" :class="icones[i % 4]"></span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.missao {
  background: var(--fundo-2);
  padding: 7rem 1.5rem;
  overflow: hidden;
}

.missao__topo {
  max-width: 760px;
  margin: 0 auto 4rem;
  text-align: center;
}

.missao__topo h2 {
  font-size: clamp(3rem, 9vw, 6rem);
  line-height: 0.9;
  margin: 0 0 1rem;
  color: var(--vermelho);
}

.missao__topo p {
  margin: 0;
  color: var(--texto-2);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.missao__cartas {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem 1.5rem;
}

.carta {
  position: relative;
  min-height: 460px;
  padding: 1.5rem 0 4px;
  background: #f3f3f3;
  color: #3a0a0e;
  border-radius: 4px;
  box-shadow: -3px 4px 14px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0;
  transform: translateY(120px) rotate(0deg);
  transition: opacity 0.6s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.visivel .carta {
  opacity: 1;
  transform: rotate(var(--giro));
}

.visivel .carta:hover {
  transform: rotate(0deg) translateY(-8px);
  transition-delay: 0s !important;
}

.carta__aba {
  position: absolute;
  top: -26px;
  left: 50%;
  width: 82px;
  height: 27px;
  transform: translateX(-50%);
}

.carta__aba svg {
  width: 100%;
  height: 100%;
  fill: #f3f3f3;
}

.carta__aba span {
  position: absolute;
  inset: 9px 0 0;
  font-size: 10px;
  text-transform: uppercase;
  color: var(--vermelho);
}

.carta__titulo,
.carta__num {
  font-family: 'League Gothic', sans-serif;
  font-weight: normal;
  font-size: 3.2rem;
  line-height: 0.85;
  text-transform: uppercase;
  color: var(--vermelho-escuro);
  margin: 0 1rem;
  letter-spacing: 0;
}

.carta__num {
  font-size: 4rem;
  margin: 1.25rem 0 0.75rem;
}

.carta__texto {
  font-size: 0.72rem;
  line-height: 1.35;
  text-transform: uppercase;
  margin: 0 1.25rem 1.25rem;
}

.carta__arte {
  margin: auto 4px 0;
  align-self: stretch;
  min-height: 140px;
  border-radius: 2px;
  background: linear-gradient(135deg, var(--vermelho), var(--vermelho-escuro));
  display: grid;
  place-items: center;
  font-size: 3.5rem;
  color: #f3f3f3;
}

@media (prefers-reduced-motion: reduce) {
  .carta {
    transition: none;
  }
}
</style>
