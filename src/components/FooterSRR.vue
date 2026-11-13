<script setup>
defineProps({
  links: { type: Array, required: true },
});
</script>

<template>
  <footer class="rodape" id="contatos">
    <div class="rodape__card">
      <div class="rodape__marca">
        <p class="rodape__wordmark" aria-label="Senna Rain Racing">SRR</p>
        <p class="rodape__lema">Senna Rain Racing · STEM Racing · SESI Joinville</p>
      </div>

      <div class="rodape__colunas">
        <div>
          <h4>Menu</h4>
          <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
        </div>
        <div>
          <h4>Contato</h4>
          <a href="mailto:sennarainracing@gmail.com">
            <span class="fa-solid fa-envelope" aria-hidden="true"></span>sennarainracing@gmail.com
          </a>
          <a href="https://www.instagram.com/senna_rain_racing" target="_blank" rel="noopener">
            <span class="fa-brands fa-instagram" aria-hidden="true"></span>@senna_rain_racing
          </a>
          <a href="https://www.tiktok.com/@senna.rain.racing" target="_blank" rel="noopener">
            <span class="fa-brands fa-tiktok" aria-hidden="true"></span>@senna.rain.racing
          </a>
        </div>
      </div>

      <div class="rodape__base">
        <span>&copy; {{ new Date().getFullYear() }} Senna Rain Racing. Todos os direitos reservados.</span>
        <a href="#inicio">Voltar ao topo ↑</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.rodape {
  padding: 4rem 4rem 2rem;
  background: linear-gradient(180deg, var(--fundo) 0%, var(--vermelho-escuro) 55%, var(--vermelho) 100%);
}

.rodape__card {
  background: #0b0d0e;
  border-radius: 16px;
  padding: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 2.5rem;
  color: var(--texto-2);
  font-size: 0.85rem;
}

.rodape__wordmark {
  margin: 0;
  font-family: 'League Gothic', sans-serif;
  font-weight: normal;
  font-size: clamp(6rem, 16vw, 13rem);
  line-height: 0.8;
  letter-spacing: 0.01em;
  color: #9a9a9a;
}

.rodape__lema {
  margin: 1rem 0 0;
  font-size: 0.8rem;
}

.rodape__colunas {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.rodape__colunas > div {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
}

.rodape h4 {
  margin: 0 0 0.25rem;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0;
  color: var(--texto);
}

.rodape a {
  color: inherit;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: color 0.2s;
}

.rodape a:hover,
.rodape a:focus-visible {
  color: var(--texto);
}

.rodape a span {
  width: 1.1em;
  margin-right: 0.6rem;
  text-align: center;
}

.rodape__base {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid #222;
  padding-top: 1.5rem;
  font-size: 0.78rem;
}

@media (max-width: 900px) {
  .rodape {
    padding: 2rem 1rem 1rem;
  }

  .rodape__card {
    grid-template-columns: 1fr;
    padding: 1.75rem;
  }

  .rodape__colunas {
    grid-template-columns: 1fr;
  }
}
</style>
