<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({ itens: { type: Array, required: true } });

const secao = ref(null);
const cartas = ref([]);
let frame = 0;

// Igual dontboardme: a seção fica presa na tela e cada carta sobe na sua fatia do scroll
function atualizar() {
  frame = 0;
  const { top, height } = secao.value.getBoundingClientRect();
  const total = height - innerHeight;
  const p = total > 0 ? Math.min(Math.max(-top / total, 0), 1) : 1;
  const n = props.itens.length;
  cartas.value.forEach((el, i) => {
    const t = Math.min(Math.max(p * (n + 0.4) - i, 0), 1); // +0.4: sobra scroll com todas na mesa
    el.style.setProperty('--p', 1 - (1 - t) ** 3);
  });
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

const giros = [-4, 3, -2, 4];
const icones = ['fa-flag-checkered', 'fa-screwdriver-wrench', 'fa-lightbulb', 'fa-trophy'];
</script>

<template>
  <section ref="secao" class="missao" id="missao" :style="{ '--n': itens.length }">
    <div class="missao__palco">
      <div class="missao__topo">
        <h2>NOSSA MISSÃO</h2>
        <p>Transformar sonhos em conquistas, acelerando talentos nas pistas e levando nossa paixão pela excelência ao
          cenário competitivo global.</p>
      </div>

      <div class="missao__cartas">
        <article v-for="(item, i) in itens" :key="item.id" ref="cartas" class="carta"
          :style="{ '--giro': giros[i % 4] + 'deg', zIndex: i + 1 }">
          <h3 class="carta__titulo">{{ item.title }}</h3>
          <p class="carta__num">0{{ item.id }}.</p>
          <p class="carta__texto">{{ item.explicacao }}</p>
          <div class="carta__arte" aria-hidden="true">
            <span class="fa-solid" :class="icones[i % 4]"></span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.missao {
  background: var(--fundo-2);
  /* 1 tela presa + ~70% de tela de scroll por carta */
  height: calc(100vh + var(--n) * 70vh);
}

.missao__palco {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  padding: 90px 1.5rem 2rem;
  box-sizing: border-box;
}

.missao__topo {
  max-width: 760px;
  margin: 0 auto;
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.carta {
  --p: 0;
  position: relative;
  min-height: 420px;
  padding: 1.5rem 0 4px;
  background: #f3f3f3;
  color: #3a0a0e;
  border-radius: 4px;
  box-shadow: -3px 4px 14px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform: translateY(calc((1 - var(--p)) * 110vh - var(--lift, 0px))) rotate(calc(var(--p) * var(--giro)));
  transition: transform 0.2s ease-out;
  will-change: transform;
}

.carta:hover {
  --lift: 8px;
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
  min-height: 120px;
  border-radius: 2px;
  background: linear-gradient(135deg, var(--vermelho), var(--vermelho-escuro));
  display: grid;
  place-items: center;
  font-size: 3.5rem;
  color: #f3f3f3;
}

/* Celular: cartas empilhadas no centro, cada uma cai por cima da anterior */
@media (max-width: 900px) {
  .missao__palco {
    gap: 1.5rem;
    padding-top: 100px;
  }

  .missao__cartas {
    grid-template-columns: min(320px, 100%);
    justify-content: center;
  }

  .carta {
    grid-area: 1 / 1;
    min-height: 0;
  }

  .carta__titulo {
    font-size: 2.6rem;
  }

  .carta__num {
    font-size: 3rem;
    margin: 0.75rem 0 0.5rem;
  }

  .carta__arte {
    min-height: 90px;
    font-size: 2.5rem;
  }
}

/* Sem animação: seção normal, cartas já no lugar */
@media (prefers-reduced-motion: reduce) {
  .missao {
    height: auto;
  }

  .missao__palco {
    position: static;
    height: auto;
    padding: 7rem 1.5rem;
  }

  .missao__cartas {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .carta {
    --p: 1;
    grid-area: auto;
    transition: none;
  }
}
</style>
