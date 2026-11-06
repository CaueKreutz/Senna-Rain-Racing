<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { DURACAO_TOTAL, iniciarIntroWebGL } from './intro/introWebGL.js';

const emit = defineEmits(['done']);
const visivel = ref(true);
const palco = ref(null);

let destruir = () => {};
let avisou = false;
let encerrou = false;

function avisar() {
  if (avisou) return;
  avisou = true;
  emit('done');
}

function encerrar() {
  if (encerrou) return;
  encerrou = true;
  avisar();
  document.documentElement.style.overflow = '';
  destruir();
  visivel.value = false;
}

onMounted(async () => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return encerrar();

  document.documentElement.style.overflow = 'hidden';
  // aba em segundo plano pausa a animação; não deixa a página presa na intro
  setTimeout(encerrar, (DURACAO_TOTAL + 2.5) * 1000);

  try {
    const fim = await iniciarIntroWebGL(palco.value, { aoRevelar: avisar, aoTerminar: encerrar });
    if (encerrou) fim();
    else destruir = fim;
  } catch {
    encerrar(); // sem WebGL: pula a intro
  }
});

onUnmounted(encerrar);
</script>

<template>
  <div v-if="visivel" ref="palco" class="intro" aria-hidden="true"></div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 3000;
  /* branco até o primeiro quadro WebGL aparecer */
  background: #fff;
}

.intro:has(canvas) {
  background: transparent;
}

.intro :deep(canvas) {
  display: block;
}
</style>
