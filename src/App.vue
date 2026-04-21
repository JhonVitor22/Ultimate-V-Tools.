<script setup>
import { ref, onMounted } from 'vue';
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import Splash from './components/Splash.vue';
import MainUI from './components/MainUI.vue';

const isLoaded = ref(false);
const username = ref("Carregando...");

onMounted(async () => { 
  // 1. DISPARO PARALELO: Não trava o cronômetro do Splash
  invoke('get_username')
    .then(name => {
      username.value = `Bem-vindo, ${name}`;
    })
    .catch(() => {
      username.value = "Bem-vindo, USUÁRIO";
    });

  // 2. ESCUTA DE EVENTOS (Background)
  listen('ativacao-log', (event) => {
    console.log("Sinal recebido:", event.payload);
  });

  // 3. CRONÔMETRO DE SEGURANÇA: Garante a entrada no sistema
  setTimeout(() => {
    console.log("[SISTEMA]: Transição para MainUI iniciada.");
    isLoaded.value = true;
  }, 6500);
});
</script>

<template>
  <div class="app-container">
    <transition name="fade" mode="out-in">
      <Splash v-if="!isLoaded" :username="username" />
      <MainUI v-else />
    </transition>
  </div>
</template>

<style>
.app-container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: transparent;
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap');

:root {
    --btn-bg: rgba(255, 255, 255, 0.05);
    --azul-win: #0078D4;
    --opt-cyan: #00f2ff;
    --text-main: #e0e0e0;
}

* { 
    -webkit-user-select: none; 
    user-select: none; 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0;
}

body { 
    background: transparent !important; 
    overflow: hidden; 
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-viewport { 
    width: 100vw; 
    height: 100vh; 
    position: relative;
    background: rgba(0, 0, 0, 0.01) !important;
    cursor: grab;
}

.app-viewport:active {
cursor: grabbing;
}

#main-ui {
    width: 100vw; 
    height: 100vh; 
    display: flex; 
    flex-direction: column;
    position: relative;
    background: linear-gradient(135deg, rgba(15, 15, 18, 0.9) 0%, rgba(10, 10, 12, 0.85) 100%); 
    backdrop-filter: blur(40px) saturate(180%); 
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.08); 
    border-radius: 12px;
    padding: 25px 30px;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05), 0 15px 35px rgba(0,0,0,0.8);
    z-index: 10;
    overflow: hidden;
  }

.core-header {
    cursor: grab;
    -webkit-app-region: drag;
}

.core-header:active {
    cursor: grabbing;
}

button, input, .opt-btn, #terminal-v, .btn-info, img, .btn-icon-img {
    cursor: pointer;
    pointer-events: auto;
}

.fade-leave-active { transition: opacity 1.2s ease; }
.fade-leave-to { opacity: 0; }
.main-fade-enter-active { transition: opacity 1.5s ease; }
.main-fade-enter-from { opacity: 0; }
</style>