<script setup>
defineProps(['status']);
</script>

<template>
  <div id="splash-screen" data-tauri-drag-region>
    <h1 class="splash-title">CORE V-Tools</h1>
    <p class="splash-welcome">{{ status }}</p>
    <div class="loader"></div>
  </div>
</template>

<style scoped>
:host, html, body { background: transparent !important; background-color: transparent !important; margin: 0; padding: 0; overflow: hidden; border: none !important; }

#splash-screen { 
  position: fixed;
  inset: 0; 
  background: transparent !important; 
  background-color: transparent !important;
  backdrop-filter: none !important; 
  -webkit-backdrop-filter: none !important; 
  z-index: 9999; 
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  border: none !important; 
  outline: none !important;
  box-shadow: none !important; 
}

.splash-title { 
  font-family: 'Montserrat', sans-serif; font-size: 36px; text-transform: uppercase; font-weight: 800; 
  background: linear-gradient(180deg, #fff 0%, #0078D4 100%); 
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; 
  clip-path: inset(0 100% 0 0); animation: revelarEsquerda 2.5s linear forwards; 
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.4)); /* Sombra suave para destacar no wallpaper */
}

.splash-edition { 
  font-family: 'serif'; font-size: 20px; margin-top: 5px; letter-spacing: 3px; font-weight: bold; 
  background: linear-gradient(90deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C); 
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; 
  opacity: 0; clip-path: inset(0 50% 0 50%); animation: revelarCentro 1.8s forwards 3s; 
  filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));
}

.splash-welcome { 
  font-size: 15px; margin-top: 15px; opacity: 0; animation: bloomFinal 1.2s forwards 4.8s; 
  color: #fff; text-shadow: 0 0 10px rgba(0,242,255,0.4), 0 2px 4px rgba(0,0,0,0.8); 
  text-transform: uppercase; font-weight: bold; letter-spacing: 1px; 
}

.loader { 
  border: 3px solid rgba(255,255,255,0.1); border-top: 3px solid #00f2ff; border-radius: 50%; 
  width: 28px; height: 28px; margin-top: 25px; opacity: 0; 
  animation: spin 1s linear infinite, bloomFinal 1.5s forwards 5.2s; 
}

@keyframes revelarEsquerda { to { clip-path: inset(0 0% 0 0); } }
@keyframes revelarCentro { 0% { opacity: 0; clip-path: inset(0 50% 0 50%); } 100% { opacity: 1; clip-path: inset(0 0% 0 0); } }
@keyframes bloomFinal { to { opacity: 1; } }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>