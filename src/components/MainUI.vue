<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

// CONFIGURAÇÕES GERAIS
const linksOffice = {
  o365: "https://c2rsetup.officeapps.live.com/c2r/download.aspx?ProductreleaseID=O365ProPlusRetail&platform=x64&language=pt-br&version=O16GA",
  o2024: "https://c2rsetup.officeapps.live.com/c2r/download.aspx?ProductreleaseID=ProPlus2024Retail&platform=x64&language=pt-br&version=O16GA",
  o2021: "https://c2rsetup.officeapps.live.com/c2r/download.aspx?ProductreleaseID=Professional2021Retail&platform=x64&language=pt-br&version=O16GA"
};

const logs = ref(['> SISTEMA INICIALIZADO...']);
const terminalContainer = ref(null);
const activeSub = ref(null);
const isDownloading = ref(false);
const downloadProgress = ref(0);
const appVersion = ref('v2.2.7');
const appAuthor = ref('Jonatan V. L. Santos');

const openSub = (id) => activeSub.value = id;
const closeSub = () => activeSub.value = null;

// COMANDOS DE JANELA
const closeApp = () => invoke('close_app');
const minApp = () => invoke('minimize_app');

// MOTOR DE LOGS
const addLog = (msg) => {
  try {
    // 1. TRATAMENTO DE BOOLEANOS (Para Atualizações)
    if (msg === false) {
      msg = "STATUS: SISTEMA ATUALIZADO. NÃO HÁ ATUALIZAÇÕES DISPONÍVEIS.";
    } else if (msg === true) {
      msg = "ALERTA: NOVA ATUALIZAÇÃO DETECTADA! INICIANDO PROTOCOLO...";
    }

    // 2. VALIDAÇÃO DE SEGURANÇA
    // Agora verificamos se é nulo ou indefinido, permitindo que strings e booleanos tratados passem
    if (msg === undefined || msg === null || msg === "") return;

    let finalMsg = "";
    
    // 3. TRATAMENTO DE OBJETOS COMPLEXOS
    if (typeof msg === 'object') {
      if ('update_available' in msg) {
        finalMsg = msg.update_available 
          ? `ALERTA: NOVA VERSÃO [${msg.new_version || '???'}] DISPONÍVEL!` 
          : "STATUS: SISTEMA OPERANDO NA VERSÃO MAIS RECENTE.";
      } else {
        finalMsg = JSON.stringify(msg).replace(/[{}"]/g, '').replace(/:/g, ': ');
      }
    } else {
      finalMsg = String(msg);
    }

    // 4. ENVIO PARA O TERMINAL VISUAL
    logs.value.push(`> ${finalMsg.toUpperCase().trim()}`);
    
    if (logs.value.length > 35) logs.value.shift();
    
    nextTick(() => {
      if (terminalContainer.value) {
        terminalContainer.value.scrollTop = terminalContainer.value.scrollHeight;
      }
    });
  } catch (e) { 
    console.error("Erro log:", e); 
  }
};

const nomesAmigaveis = {
  'set_sonic_pulse': 'SONIC PULSE',
  'ghost_memory_purge': 'GHOST MEMORY',
  'set_ultra_performance': 'ULTRA PERFORMANCE'
};

// MOTOR DE EXECUÇÃO (CORRIGIDO)
const executar = async (cmd, args = null) => {
  if (!cmd) return;
  activeSub.value = null;
  let argTexto = args ? String(args).trim() : "";

  const nomeExibicao = nomesAmigaveis[cmd] || cmd.toUpperCase();
  addLog(`[SISTEMA]: EXECUTANDO ${nomeExibicao}...`);

  try {
    let result;

    if (cmd === 'abrir_no_navegador') {
      result = await invoke(cmd, { url: argTexto });
    } 
    else if (cmd === 'ping_to') {
      argTexto = argTexto.replace(/^ping\s+/i, "");
      result = await invoke(cmd, { alvo: argTexto, infinito: false });
    } 
    else if (cmd === 'download_direto') {
      isDownloading.value = true;
      downloadProgress.value = 0;
      result = await invoke(cmd, { url: argTexto, nomeArquivo: "Setup_Office.exe" });
    }
    // BLOCO DE ATIVAÇÃO
    else if (['ativar_windows', 'ativar_office', 'hwid', 'tsforge', 'office_ohook'].includes(cmd)) {
      const modoFinal = argTexto || cmd;
      result = await invoke('activate_win_realtime', { mode: modoFinal });
    }
    // COMANDOS GENÉRICOS COM OU SEM ARGUMENTOS
    else {
      if (argTexto) {
        result = await invoke(cmd, { mode: argTexto });
      } else {
        result = await invoke(cmd);
      }
    }

    if (result) addLog(result);
  } catch (err) {
    isDownloading.value = false;
    const errorStr = typeof err === 'object' ? JSON.stringify(err) : String(err);
    addLog(`[ERRO]: ${errorStr.toUpperCase()}`);
  }
};

let unlistenLog, unlistenProgress;

onMounted(async () => {
  try {
    const user = await invoke('get_username');
    logs.value = [`> BEM-VINDO(A), ${user.toUpperCase()}.`, `> AGUARDANDO COMANDO...` ];
  } catch (e) {
    logs.value = [`> BEM-VINDO(A), USUÁRIO.`, `> AGUARDANDO COMANDO...`];
  }

  unlistenLog = await listen('ativacao-log', (event) => addLog(event.payload));

  unlistenProgress = await listen('download-progress', (event) => {
    isDownloading.value = true;
    downloadProgress.value = Number(event.payload);
    if (downloadProgress.value >= 100) {
      setTimeout(() => { isDownloading.value = false; downloadProgress.value = 0; }, 4000); 
    }
  });
});

onUnmounted(() => {
  if (unlistenLog) unlistenLog();
  if (unlistenProgress) unlistenProgress();
});
</script>
<template>
  <div class="ui-wrapper" data-tauri-drag-region>
    <div class="window-controls">
      <div class="control-btn" @click="minApp">−</div>
      <div class="control-btn close" @click="closeApp">✕</div>
    </div>

    <header class="header-drag-area" data-tauri-drag-region>
      <div class="header-content-lock">
        <div class="header-title">CORE V-Tools</div>
      </div>
    </header>

    <div class="tiles-grid">
      <div class="tile-card" @click="openSub('licensing')">
        <span class="icon">🛡️</span>
        <span>LICENCIAMENTO SYSTEM</span>
      </div>
      <div class="tile-card" @click="openSub('perf')">
        <span class="icon">⚡</span>
        <span>PERFORMACE SYSTEM</span>
      </div>
      <div class="tile-card" @click="openSub('rede')">
        <span class="icon">🌐</span>
        <span>INFRA. E DIAGNOSTIC</span>
      </div>
      <div class="tile-card" @click="openSub('office')">
        <span class="icon">📥</span>
        <span>DOWNLOADS</span>
      </div>
    </div>

    <Transition name="sub-fade">
      <div v-if="activeSub" class="submenu-overlay">
        <div class="submenu-content">
          <template v-if="activeSub === 'licensing'">
            <div class="sub-header">SELECIONE SUA ATIVAÇÃO</div>
            <button class="opt-btn btn-win" @click="executar('hwid')">
              <img src="../assets/imagens/win11.png" class="btn-icon-img">
              <div class="btn-info">
                <span class="btn-title">ATIVAR WINDOWS (HWID)</span>
                <span class="btn-desc">Ativação Digital Permanente (BIOS)</span>
              </div>
            </button>
            <button class="opt-btn btn-win" @click="executar('tsforge')">
              <img src="../assets/imagens/win11.png" class="btn-icon-img">
              <div class="btn-info">
                <span class="btn-title">ATIVAR WINDOWS (TSFORGE)</span>
                <span class="btn-desc">Injeção de Licença Digital (Alternativo)</span>
              </div>
            </button>
            <button class="opt-btn btn-off" @click="executar('office_ohook')">
              <img src="../assets/imagens/office.png" class="btn-icon-img">
              <div class="btn-info">
                <span class="btn-title">ATIVAR OFFICE (OHOOK)</span>
                <span class="btn-desc">Ativação de Local Nativa (Sem KMS)</span>
              </div>
            </button>
            <button class="opt-btn btn-off" @click="executar('office_tsforge')">
              <img src="../assets/imagens/office.png" class="btn-icon-img">
              <div class="btn-info">
                <span class="btn-title">ATIVAR OFFICE (TSFORGE)</span>
                <span class="btn-desc">Suporte para Versões 2016 a 2024</span>
              </div>
            </button>
            <button class="btn-back" @click="closeSub">VOLTAR</button>
          </template>

          <template v-if="activeSub === 'office'">
            <div class="sub-header">DOWNLOADS OFFICE PACK</div>
            <button class="opt-btn btn-purple-office" @click="executar('download_direto', linksOffice.o365)">
              <img src="../assets/imagens/office365.png" class="btn-icon-img">
              <div class="btn-info">
                <span class="btn-title">OFFICE 365</span>
                <span class="btn-desc">Instalador Oficial Microsoft</span>
              </div>
            </button>
            <button class="opt-btn btn-orange-office" @click="executar('download_direto', linksOffice.o2024)">
              <img src="../assets/imagens/office.png" class="btn-icon-img">
              <div class="btn-info">
                <span class="btn-title">OFFICE 2024</span>
                <span class="btn-desc">Versão LTSC Pro Plus</span>
              </div>
            </button>
            <button class="opt-btn btn-orange-office" @click="executar('download_direto', linksOffice.o2021)">
              <img src="../assets/imagens/office.png" class="btn-icon-img">
              <div class="btn-info">
                <span class="btn-title">OFFICE 2021</span>
                <span class="btn-desc">Versão Professional Retail</span>
              </div>
            </button>
            <button class="btn-back" @click="closeSub">VOLTAR</button>
          </template>

          <template v-if="activeSub === 'perf'">
  <div class="sub-header">⚡ PERFORMANCE DO SISTEMA</div>
  <div class="btn-list-scroll">
    <button class="opt-btn btn-win11" @click="executar('deep_clean')">
      <span class="icon-small">🧹</span>
      <div class="btn-info">
        <span class="btn-title">DEEP CLEAN</span>
        <span class="btn-desc">Limpeza de arquivos temporários</span>
      </div>
    </button>

    <button class="opt-btn btn-win11" @click="executar('boost_kernel')">
      <span class="icon-small">🚀</span>
      <div class="btn-info">
        <span class="btn-title">BOOST KERNEL</span>
        <span class="btn-desc">Otimização de prioridade e GPU</span>
      </div>
    </button>

    <button class="opt-btn btn-win11" @click="executar('optimize_ram')">
      <span class="icon-small">🧠</span>
      <div class="btn-info">
        <span class="btn-title">OTIMIZAR RAM</span>
        <span class="btn-desc">Flush de cache e redução de working set</span>
      </div>
    </button>

    <button class="opt-btn btn-win11" @click="executar('disk_rescue')">
      <span class="icon-small">💿</span>
      <div class="btn-info">
        <span class="btn-title">RESGATE DE DISCO</span>
        <span class="btn-desc">Compacta o OS para ganhar espaço</span>
      </div>
    </button>

    <button class="opt-btn btn-win11" @click="executar('set_ultra_performance')">
      <span class="icon-small">🔋</span>
      <div class="btn-info">
        <span class="btn-title">ULTRA PERFORMANCE</span>
        <span class="btn-desc">Plano de energia oculto</span>
      </div>
    </button>

    <button class="opt-btn btn-win11" @click="executar('set_sonic_pulse', true)">
      <span class="icon-small">⚡</span>
      <div class="btn-info">
        <span class="btn-title">SONIC PULSE</span>
        <span class="btn-desc">Kernel Timer em 0.5ms</span>
      </div>
    </button>

    <button class="opt-btn btn-win11" @click="executar('ghost_memory_purge')">
      <span class="icon-small">🧠</span>
      <div class="btn-info">
        <span class="btn-title">GHOST MEMORY</span>
        <span class="btn-desc">Purge de cache standby</span>
      </div>
    </button>

  </div> <button class="btn-back" @click="closeSub">VOLTAR</button>
</template>

          <template v-if="activeSub === 'rede'">
            <div class="sub-header">🌐 INFRAESTRUTURA & DIAGNÓSTICO</div>
            <div class="ping-container">
              <input type="text" v-model="pingTarget" placeholder="IP OU HOST" class="ping-input" @keyup.enter="executar('ping_to', pingTarget)">
              <button class="opt-btn btn-network" @click="executar('ping_to', pingTarget)">
                <span class="icon-small">📡</span>
                <div class="btn-info">
                  <span class="btn-title">DISPARAR PING</span>
                  <span class="btn-desc">ALVO: {{ pingTarget || 'AGUARDANDO...' }}</span>
                </div>
              </button>
            </div>
            <div class="btn-list-scroll">
              <button class="opt-btn btn-network" @click="executar('network_optimize', 'dns')">
                <span class="icon-small">🔍</span>
                <div class="btn-info"><span class="btn-title">DNS GOOGLE</span></div>
              </button>
              <button class="opt-btn btn-network" @click="executar('network_optimize', 'lag')">
                <span class="icon-small">🎮</span>
                <div class="btn-info"><span class="btn-title">OTIMIZAR LATÊNCIA</span></div>
              </button>
            </div>
            <button class="btn-back" @click="closeSub">VOLTAR</button>
          </template>
        </div>
      </div>
    </Transition>

    <div v-if="isDownloading" class="download-ui-wrapper">
      <div class="progress-text">
        <span>DOWNLOAD EM CURSO</span>
        <span>{{ downloadProgress }}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-thumb" :style="{ width: downloadProgress + '%' }"></div>
      </div>
    </div>

    <div id="terminal-v" ref="terminalContainer">
      <div v-for="(log, index) in logs" :key="index" class="log-line">{{ log }}</div>
    </div>

    <div class="footer-actions">
      <button class="action-btn-mini btn-update" @click="executar('check_update')">
        <span class="mini-icon">🔄</span>
        <span class="mini-text">PROCURAR ATUALIZAÇÃO</span>
      </button>
      <button class="action-btn-mini btn-github" @click="executar('abrir_no_navegador', 'https://github.com/JhonVitor22/Ultimate-V-Tools.')">
        <img src="../assets/imagens/github.png" class="mini-icon-img">
        <span class="mini-text">GITHUB PROJETO</span>
      </button>
    </div>

    <footer class="app-footer">
      <div class="footer-content">
        <div class="author-tag">{{ appAuthor }}</div>
        <div class="version-tag" @click="executar('check_update')">{{ appVersion }}</div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.ui-wrapper { display: flex; flex-direction: column; height: 100vh; position: relative; padding: 0 20px 20px 20px; overflow: hidden; }
.window-controls { position: absolute; top: 0; right: 0; display: flex; z-index: 100000; }
.control-btn { width: 40px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #888; transition: 0.2s; }
.control-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
.close:hover { background: #e81123 !important; }

.header-drag-area { text-align: center; cursor: move; padding: 40px 0 20px 0; width: 100%; position: relative; z-index: 1000; }
.header-content-lock { pointer-events: none; }
.header-title { font-family: 'MontserratBold', sans-serif; font-size: 32px; font-weight: 800; text-transform: uppercase; margin: 0; line-height: 1.1; background: linear-gradient(180deg, #ffffff 0%, #a2d9ff 45%, #71c5ff 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0, 0, 0, 0.25); }
.header-subtitle { font-family: 'Georgia', serif; font-size: 14px; color: #c5a059; margin: -5px 0 0 0; font-style: italic; font-weight: 500; letter-spacing: 1px; }

.tiles-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 10px; width: 100%; position: relative; z-index: 1; }
.tile-card { height: 120px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; gap: 12px; }
.tile-card:hover { border-color: #006deb; transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0, 242, 255, 0.2); }
.icon { font-size: 36px; margin-bottom: 5px; }
.tile-card span { font-size: 12px; font-weight: 800; text-transform: uppercase; color: #FFFFFF !important; letter-spacing: 1.5px; }

.submenu-overlay { position:absolute;inset:0;background:transparent!important;backdrop-filter:blur(20px) saturate(160%)!important;-webkit-backdrop-filter:blur(20px) saturate(160%)!important;z-index:15000;display:flex;align-items:center;justify-content:center;padding:20px;border-radius:12px; }
.submenu-content { width:100%;max-width:400px;height:auto;max-height:90vh;display:flex;flex-direction:column;gap:12px;padding:25px;background:rgba(255, 255, 255, 0.03);border:1px solid rgba(0, 242, 255, 0.15);border-radius:15px;box-shadow:0 20px 50px rgba(0, 0, 0, 0.5);animation:slideUp 0.3s ease-out;overflow-y:auto;scrollbar-width:none; }
.submenu-content::-webkit-scrollbar { display:none; }
.sub-header { color: #ffcc41; font-size: 10px; letter-spacing: 3px; font-weight: bold; margin-bottom: 15px; text-transform: uppercase; }

.opt-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px; display: flex; align-items: center; gap: 15px; cursor: pointer; transition: 0.3s; color: #fff; text-align: left; }

.btn-win:hover { border-color: #00a4ef !important; box-shadow: 0 0 15px rgba(0, 164, 239, 0.3); background: rgba(0, 164, 239, 0.08) !important; }
.btn-win:hover .btn-title { color: #00a4ef !important; }

.btn-off:hover { border-color: #d83b01 !important; box-shadow: 0 0 15px rgba(216, 59, 1, 0.3); background: rgba(216, 59, 1, 0.08) !important; }
.btn-off:hover .btn-title { color: #ff8c00 !important; }

.btn-dl-purple:hover { border-color: #a300ff !important; box-shadow: 0 0 15px rgba(163, 0, 255, 0.3); background: rgba(163, 0, 255, 0.08) !important; }
.btn-dl-purple:hover .btn-title { color: #a300ff !important; }
.btn-dl-cyan:hover { border-color: #00f2ff !important; box-shadow: 0 0 15px rgba(0, 242, 255, 0.3); background: rgba(0, 242, 255, 0.08) !important; }
.btn-dl-cyan:hover .btn-title { color: #00f2ff !important; }

.btn-icon-img { width: 30px; height: 30px; object-fit: contain; }
.btn-title { display: block; font-size: 12px; font-weight: 800; color: #fff !important; }
.btn-desc { font-size: 10px; color: #999; }

.btn-back { margin-top: 15px; background: none; border: 1px solid rgba(255,255,255,0.1); color: #888; cursor: pointer; font-size: 11px; padding: 10px; border-radius: 8px; text-transform: uppercase; transition: 0.3s; }
.btn-back:hover { color: #ccc; border-color: rgba(255,255,255,0.3); }

.btn-purple-office:hover { border-color: #a300ff !important; box-shadow: 0 0 15px rgba(163, 0, 255, 0.4); background: rgba(163, 0, 255, 0.08) !important;}
.btn-purple-office:hover .btn-title {  color: #c487ed !important;}

.btn-orange-office:hover { border-color: #ff8c00 !important; box-shadow: 0 0 15px rgba(255, 140, 0, 0.4); background: rgba(255, 140, 0, 0.08) !important;}
.btn-orange-office:hover .btn-title { color: #ffaa44 !important;}

.btn-win11:hover { border-color: #0078d4 !important; box-shadow: 0 0 15px rgba(0, 120, 212, 0.4); background: rgba(0, 120, 212, 0.1) !important;}
.btn-win11:hover .btn-title { color: #60cdff !important;}

.btn-list-scroll { display: flex; flex-direction: column; gap: 10px; max-height: 350px; overflow-y: auto; padding-right: 5px; scrollbar-width: none;}
.btn-list-scroll::-webkit-scrollbar { display: none; }
.icon-small { font-size: 22px; width: 30px; text-align: center; }

.btn-network:hover { border-color: #0078d4 !important; box-shadow: 0 0 15px rgba(0, 120, 212, 0.4); background: rgba(0, 120, 212, 0.1) !important;}
.btn-network:hover .btn-title { color: #0078d4 !important; text-shadow: 0 0 15px rgba(0, 120, 212, 0.4);transition: 0.3s ease;}

.ping-container { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; padding: 10px; background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px dashed rgba(0, 242, 255, 0.2)}
.ping-input { background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(0, 242, 255, 0.3); border-radius: 5px; padding: 12px; color: #00f2ff; font-family: 'Consolas', monospace; font-size: 13px; outline: none; text-align: center; transition: 0.3s;}
.ping-input:focus { border-color: #00f2ff; box-shadow: 0 0 10px rgba(0, 242, 255, 0.2); background: rgba(0, 242, 255, 0.05);}
.ping-input::placeholder { color: rgba(0, 242, 255, 0.3);}

.footer-actions { display:flex;gap:10px;margin-top:10px;padding:0 5px;justify-content:space-between; }
.action-btn-mini { flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:8px;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;transition:0.3s; }
.action-btn-mini:hover { background:rgba(255,255,255,0.08);transform:translateY(-2px); }
.btn-update:hover { border-color:#00f2ff;box-shadow:0 0 10px rgba(0,242,255,0.2); }
.btn-update:hover .mini-text { color:#00f2ff;text-shadow:0 0 5px rgba(0,242,255,0.5); }
.btn-github:hover { border-color:#fff;box-shadow:0 0 10px rgba(255,255,255,0.1); }
.mini-icon { font-size:14px; }
.mini-icon-img { width:16px;height:16px;object-fit:contain;transition:0.3s; }
.btn-github:hover .mini-icon-img { filter:drop-shadow(0 0 5px #fff);scale:1.1; }
.mini-text { font-size:10px;font-weight:800;color:#888;text-transform:uppercase;letter-spacing:1px;transition:0.3s; }

#terminal-v { font-family:'Consolas',monospace;font-size:11px;background:rgba(10,10,10,0.9)!important;backdrop-filter:blur(15px);padding:15px;border-radius:8px;height:140px;overflow-y:auto;color:#ffffff;border:1px solid rgba(0,242,255,0.2);width:100%;margin-top:15px;scrollbar-width:none;z-index:100;position:relative;box-shadow:0 4px 15px rgba(0,0,0,0.5); } #terminal-v::-webkit-scrollbar { display:none; } .log-line { margin-bottom:2px;text-transform:uppercase;text-shadow:0 0 5px rgba(0,255,238,0.3); }
#terminal-v::-webkit-scrollbar { display: none; }
.log-line { margin-bottom: 2px; text-transform: uppercase; text-shadow: 0 0 5px rgba(0, 255, 238, 0.3); }

.download-ui-wrapper { margin-top: 15px; width: 100%; animation: fadeIn 0.5s ease; }
.progress-text { display: flex; justify-content: space-between; color: #00f2ff; font-family: 'Consolas', monospace; font-size: 10px; margin-bottom: 5px; text-shadow: 0 0 5px rgba(0, 242, 255, 0.5); }
.progress-track { width: 100%; height: 6px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; overflow: hidden; border: 1px solid rgba(0, 242, 255, 0.1); }
.progress-thumb { height: 100%; background: linear-gradient(90deg, #0078d4, #00f2ff); box-shadow: 0 0 10px #00f2ff; transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); }

.app-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25px;
  background: transparent;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  z-index: 10000;
  pointer-events: none;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px;
  font-family: 'Segoe UI', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* NOME: ARCO CELESTE DINÂMICO */
.author-tag {
  background: linear-gradient(
    100deg, 
    #00ff9d, 
    #00bcff, 
    #00ff9d,
    #00bcff,
    #00ff9d, 
    #00bcff, 
    #00ff9d,
    #00bcff,
    #00ff9d, 
    #00bcff, 
    #00ff9d,
    #00bcff
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: arcoCelesteFluido 3s linear infinite;
  filter: drop-shadow(0 0 5px rgba(0, 255, 157, 0.4));
  display: inline-block;
}

/* VERSÃO: DOURADO REAVIVADO */
.version-tag {
  color: #FFD700; /* Ouro Puro */
  font-weight: 700;
  pointer-events: auto;
  cursor: pointer;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
  transition: all 0.3s ease;
}

.version-tag:hover {
  color: #FFF200;
  text-shadow: 0 0 15px rgba(255, 215, 0, 1);
  transform: scale(1.1);
}

@keyframes arcoCelesteFluido {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: -200% center;
  }
}
@keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.sub-fade-enter-active, .sub-fade-leave-active { transition: all 0.3s ease; }
.sub-fade-enter-from, .sub-fade-leave-to { opacity: 0; transform: scale(1.05); }

.version-badge {
  margin-left: 10px;
  padding: 2px 8px;
  background: rgba(0, 242, 255, 0.1);
  border: 1px solid rgba(0, 242, 255, 0.3);
  border-radius: 4px;
  cursor: pointer;
  font-size: 10px;
  transition: 0.2s;
}
.version-badge:hover { background: rgba(0, 242, 255, 0.2); border-color: #00f2ff; color: #fff; }
</style>