<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({ pessoas: { type: Array, required: true } });

const secao = ref(null);
const cartoes = ref([]);
const atual = ref(1);
let frame = 0;

// Mistura protip (título preso) + sleep-well (cartão sobe em "V", para no centro e sai por cima)
function atualizar() {
  frame = 0;
  const { top, height } = secao.value.getBoundingClientRect();
  const total = height - innerHeight;
  const p = total > 0 ? Math.min(Math.max(-top / total, 0), 1) : 0;
  const n = props.pessoas.length;
  for (let i = 0; i < n; i++) {
    const u = Math.min(Math.max((p * (n - 1) - i) / 1.4 + 0.5, 0), 1); // /1.4: o próximo já sobe enquanto o anterior sai
    const s = 1 - 2 * u; // 1 = embaixo, 0 = centro, -1 = em cima
    const y = s * Math.abs(s); // anda devagar perto do centro
    const o = Math.min(Math.max(1.8 - Math.abs(s) * 2, 0), 1);
    const el = cartoes.value[i];
    el.style.setProperty('--y', y);
    el.style.setProperty('--x', Math.abs(y) * (i % 2 ? -1 : 1));
    el.style.setProperty('--o', o);
    el.inert = o < 0.5; // links de quem está fora não recebem tab nem clique
  }
  atual.value = Math.round(p * (n - 1)) + 1;
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
    <div class="equipe__palco">
      <div class="equipe__topo">
        <p class="equipe__tag">Equipe</p>
        <h2>INTEGRANTES</h2>
        <p class="equipe__contador" aria-hidden="true">{{ dois(atual) }} / {{ dois(pessoas.length) }}</p>
      </div>

      <article v-for="pessoa in pessoas" :key="pessoa.id" ref="cartoes" class="pessoa">
        <img class="pessoa__foto" :src="pessoa.foto" :alt="pessoa.name" loading="lazy" />
        <div class="pessoa__info">
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
  /* 1 tela presa + ~80% de tela de scroll por pessoa */
  height: calc(100vh + (var(--n) - 1) * 80vh);
}

.equipe__palco {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  box-sizing: border-box;
  padding: 110px max(1.5rem, calc((100% - 1200px) / 2)) 2.5rem;
  display: grid;
  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
  grid-template-areas: 'topo cartao';
  column-gap: 3rem;
}

/* Título grande preso (protip "usługi") */
.equipe__topo {
  grid-area: topo;
}

.equipe__tag {
  color: var(--vermelho);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0 0 0.75rem;
}

.equipe__topo h2 {
  font-family: 'League Gothic', sans-serif;
  font-weight: normal;
  font-size: clamp(3.5rem, 6vw, 6.5rem);
  line-height: 0.85;
  letter-spacing: 0;
  margin: 0;
}

.equipe__contador {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.85rem;
  color: var(--texto-2);
  margin: 1rem 0 0;
}

/* Cartão (foto + dados) que sobe em V (sleep-well) */
.pessoa {
  --y: 1;
  --x: 1;
  --o: 0;
  grid-area: cartao;
  place-self: center;
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  transform: translate(calc(var(--x) * 12vw), calc(var(--y) * 105vh)) rotate(calc(var(--x) * 8deg));
  will-change: transform;
}

.pessoa__foto {
  height: min(62vh, 560px);
  aspect-ratio: 2 / 3;
  object-fit: cover;
  object-position: top;
  display: block;
  flex-shrink: 0;
  border-bottom: 3px solid var(--vermelho);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  background: var(--fundo-2);
}

.pessoa__info {
  width: 18rem;
  padding-bottom: 0.5rem;
  opacity: var(--o);
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
  font-size: clamp(2.2rem, 3.5vw, 3.2rem);
  line-height: 0.95;
  letter-spacing: 0;
  margin: 0.25rem 0 0.75rem;
}

.pessoa__frase {
  color: var(--texto-2);
  font-size: 0.85rem;
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

/* Celular: título em cima, cartão com foto e dados embaixo dela */
@media (max-width: 900px) {
  .equipe__palco {
    padding: 90px 1.25rem 1.25rem;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    grid-template-areas: 'topo' 'cartao';
    text-align: center;
  }

  .equipe__topo h2 {
    font-size: clamp(3rem, 15vw, 4.5rem);
  }

  .equipe__contador {
    margin-top: 0.5rem;
  }

  .pessoa {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    transform: translate(calc(var(--x) * 25vw), calc(var(--y) * 105vh)) rotate(calc(var(--x) * 8deg));
  }

  .pessoa__foto {
    height: min(40vh, 360px);
  }

  .pessoa__info {
    width: min(22rem, 100%);
    padding: 0;
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

  .equipe__palco {
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

  .equipe__topo {
    grid-column: 1 / -1;
  }

  .equipe__contador {
    display: none;
  }

  .pessoa {
    grid-area: auto;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    transform: none;
    background: var(--fundo-2);
  }

  .pessoa__foto {
    width: 100%;
    height: auto;
    box-shadow: none;
  }

  .pessoa__info {
    width: auto;
    padding: 1.5rem;
    opacity: 1;
  }

  .pessoa__social {
    justify-content: flex-start;
  }
}
</style>
