<script setup>
import { ref } from 'vue';

defineProps({
  links: { type: Array, required: true },
  redes: { type: Array, required: true },
});

const menuAberto = ref(false);
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_';

// Efeito "hacky-text" do kprverse: embaralha as letras e revela da esquerda pra direita
function embaralhar(e) {
  const el = e.currentTarget.querySelector('[data-txt]');
  if (!el || el.dataset.rodando || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const final = el.dataset.txt;
  el.dataset.rodando = '1';
  let passo = 0;
  const id = setInterval(() => {
    el.textContent = [...final]
      .map((c, i) => (c === ' ' || i < passo / 2 ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join('');
    if (++passo > final.length * 2) {
      clearInterval(id);
      el.textContent = final;
      delete el.dataset.rodando;
    }
  }, 30);
}
</script>

<template>
  <header class="frame">
    <div class="frame__borda" aria-hidden="true"></div>

    <div class="frame__trilho">
      <button class="frame__burger" :aria-expanded="menuAberto" aria-controls="menu-cheio"
        @click="menuAberto = !menuAberto">
        <span :class="{ x: menuAberto }"></span>
        <span class="sr-only">Menu</span>
      </button>
      <span class="frame__mira" aria-hidden="true"></span>
      <span class="frame__pontos" aria-hidden="true">:::::</span>
    </div>

    <nav class="frame__topo" aria-label="Principal">
      <ul class="frame__links">
        <li v-for="l in links" :key="l.href">
          <a :href="l.href" @mouseenter="embaralhar" @focus="embaralhar">
            <span :data-txt="l.label.toUpperCase()">{{ l.label.toUpperCase() }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <a class="frame__cta" :href="redes[0].href" target="_blank" rel="noopener" @mouseenter="embaralhar">
      <span data-txt="INSTAGRAM">INSTAGRAM</span>
    </a>

    <div id="menu-cheio" class="menu" :class="{ aberto: menuAberto }" :inert="!menuAberto">
      <ul>
        <li v-for="(l, i) in links" :key="l.href">
          <a :href="l.href" @click="menuAberto = false">
            <small>0{{ i + 1 }}</small>{{ l.label }}
          </a>
        </li>
      </ul>
      <div class="menu__redes">
        <a v-for="r in redes" :key="r.href" :href="r.href" target="_blank" rel="noopener">
          <span class="fa-brands" :class="r.icon" aria-hidden="true"></span> {{ r.label }}
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.frame {
  --gap: 20px;
  --trilho: 66px;
  --topo: 56px;
  --linha: rgba(255, 255, 255, 0.28);
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
  font-family: 'IBM Plex Mono', monospace;
  color: #fff;
}

.frame > *:not(.frame__borda) {
  pointer-events: auto;
}

.frame__borda {
  position: absolute;
  inset: var(--gap);
  border: 1px solid var(--linha);
  border-radius: 6px;
}

.frame__trilho {
  position: absolute;
  top: var(--gap);
  bottom: var(--gap);
  left: var(--gap);
  width: var(--trilho);
  border-right: 1px solid var(--linha);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 1.25rem;
  pointer-events: none;
}

.frame__trilho > * {
  pointer-events: auto;
}

.frame__burger {
  width: 100%;
  height: var(--topo);
  background: none;
  border: 0;
  border-bottom: 1px solid var(--linha);
  cursor: pointer;
  display: grid;
  place-items: center;
}

.frame__burger span:first-child,
.frame__burger span:first-child::after {
  display: block;
  width: 26px;
  height: 1px;
  background: #fff;
  transition: transform 0.3s;
}

.frame__burger span:first-child {
  position: relative;
  transform: translateY(-3px);
}

.frame__burger span:first-child::after {
  content: '';
  position: absolute;
  top: 6px;
  width: 18px;
}

.frame__burger span.x {
  transform: rotate(45deg);
}

.frame__burger span.x::after {
  width: 26px;
  transform: translateY(-6px) rotate(-90deg);
}

.frame__mira {
  width: 38px;
  height: 38px;
  background:
    linear-gradient(#fff, #fff) center / 1px 100% no-repeat,
    linear-gradient(#fff, #fff) center / 100% 1px no-repeat;
  position: relative;
}

.frame__mira::after {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1px solid #fff;
}

.frame__pontos {
  font-size: 10px;
  letter-spacing: 1px;
}

.frame__topo {
  position: absolute;
  top: var(--gap);
  left: calc(var(--gap) + var(--trilho));
  right: var(--gap);
  height: var(--topo);
  border-bottom: 1px solid var(--linha);
  background: rgba(11, 11, 11, 0.45);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.frame__links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
  font-size: 11px;
  font-weight: 500;
}

.frame__links a,
.menu a {
  color: inherit;
  text-decoration: none;
}

.frame__links a:hover,
.frame__links a:focus-visible {
  color: var(--vermelho);
}

.frame__cta {
  position: absolute;
  top: calc(var(--gap) + 1px);
  right: calc(var(--gap) + 1px);
  height: calc(var(--topo) - 2px);
  padding: 0 1.75rem;
  display: flex;
  align-items: center;
  background: #fff;
  color: #000;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  border-radius: 0 5px 0 0;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0 calc(100% - 14px));
  transition: background 0.2s, color 0.2s;
}

.frame__cta:hover,
.frame__cta:focus-visible {
  background: var(--vermelho);
  color: #fff;
}

/* Menu cheio (burger) */
.menu {
  position: fixed;
  top: calc(var(--gap) + var(--topo));
  left: calc(var(--gap) + var(--trilho));
  bottom: var(--gap);
  width: min(460px, calc(100vw - 2 * var(--gap) - var(--trilho)));
  box-sizing: border-box;
  background: rgba(11, 11, 11, 0.94);
  backdrop-filter: blur(12px);
  border-right: 1px solid var(--linha);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.5s cubic-bezier(0.77, 0, 0.18, 1);
}

.menu.aberto {
  clip-path: inset(0 0 0 0);
}

.menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.menu ul a {
  font-family: 'Archivo', sans-serif;
  font-weight: 900;
  font-size: clamp(1.3rem, 6vw, 2.6rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  transition: color 0.2s;
}

.menu ul a:hover,
.menu ul a:focus-visible {
  color: var(--vermelho);
}

.menu small {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 400;
  margin-top: 0.6em;
}

.menu__redes {
  display: flex;
  gap: 1.5rem;
  font-size: 12px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

@media (max-width: 900px) {
  .frame {
    --gap: 10px;
    --trilho: 52px;
  }

  .frame__links {
    display: none;
  }

  .frame__trilho {
    border-right: 0;
  }

  .menu {
    padding: 2rem 1.25rem;
  }

  .frame__burger {
    background: rgba(11, 11, 11, 0.45);
    backdrop-filter: blur(8px);
  }

  .frame__mira,
  .frame__pontos {
    display: none;
  }
}
</style>
