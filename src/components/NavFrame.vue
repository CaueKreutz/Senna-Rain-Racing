<script setup>
defineProps({
  links: { type: Array, required: true },
  redes: { type: Array, required: true },
});

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
      <span class="frame__burger" aria-hidden="true"><span></span></span>
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
  font-family: 'Poppins', sans-serif;
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
  z-index: 1; /* linha por cima da barra do topo */
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
  display: grid;
  place-items: center;
}

.frame__burger span:first-child,
.frame__burger span:first-child::after {
  display: block;
  width: 26px;
  height: 1px;
  background: #fff;
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
  font-size: 13px;
  font-weight: 500;
}

.frame__links a {
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
  padding: 0 1.1rem;
  display: flex;
  align-items: center;
  background: #fff;
  color: #000;
  font-weight: 600;
  font-size: 12px;
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
