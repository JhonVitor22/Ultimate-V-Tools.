<div align="center">
  <table border="0">
    <tr>
      <td align="center">
        <img src="https://raw.githubusercontent.com/JhonVitor22/Ultimate-V-Tools./main/imagens/vtools.png" width="90" alt="UVT Logo">
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/JhonVitor22/Ultimate-V-Tools./main/imagens/abertura_vtools.webp" width="600" alt="Ultimate V-Tools Elite Edition Opening Animation">
      </td>
    </tr>
  </table>
  <br>
  <h1>Ultimate V-Tools v2.2.5</h1>
  <h3><code>Elite Edition | Build 102.stable</code></h3>
  <p><b>Arquitetura de Alta Performance para Otimização e Licenciamento de Sistemas</b></p>
  <hr>
</div>

<h2>📑 Visão Geral do Sistema</h2>
<p>
  A versão <b>v2.2.5-elite</b> é o resultado de um refactoring profundo focado em <b>segurança de memória</b> e <b>I/O assíncrono</b>. Utilizando o runtime do <b>Tauri v2</b> e o poder do <b>Rust</b>, esta build elimina gargalos de processamento em threads de UI, garantindo uma execução estável de protocolos críticos de sistema.
</p>

<table width="100%">
  <thead>
    <tr style="background-color: #161b22;">
      <th align="left">Módulo</th>
      <th align="left">Implementação Técnica</th>
      <th align="center">Impacto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Backend (Rust)</b></td>
      <td>Integração de módulos <code>tokio</code> para gerenciamento de streams de download.</td>
      <td align="center">🚀 Performance</td>
    </tr>
    <tr>
      <td><b>Security</b></td>
      <td>Framework de <i>Capabilities</i> com whitelist de argumentos para binários externos.</td>
      <td align="center">🛡️ Segurança</td>
    </tr>
    <tr>
      <td><b>UX/UI</b></td>
      <td>Interface <i>Frameless</i> com aceleração de hardware via CSS e <code>backdrop-filter</code>.</td>
      <td align="center">💎 Estética</td>
    </tr>
    <tr>
      <td><b>i18n</b></td>
      <td>Deteção de <i>locale</i> em nível de Kernel para adaptação dinâmica de strings.</td>
      <td align="center">🌍 Global</td>
    </tr>
  </tbody>
</table>

<br>

<h2>🛠️ Engenharia de Software</h2>
<ul>
  <li><b>Memory-Safe Downloader:</b> O motor de aquisição de pacotes Office utiliza o crate <code>reqwest</code>, operando fora do loop de eventos principal para evitar <i>freezing</i>.</li>
  <li><b>Window Management API:</b> Implementação de arraste de janela via <code>start_dragging</code> nativo, otimizando o processamento de eventos do mouse em janelas sem bordas.</li>
  <li><b>Terminal Real-time Logging:</b> Sistema de eventos <code>emit/listen</code> para monitoramento de processos <i>slmgr</i> e <i>bcdedit</i> com feedback instantâneo ao usuário.</li>
</ul>

<hr>

<h2>📦 Artefatos de Distribuição (Com Checksum Real)</h2>
<p>Selecione a versão desejada e valide a integridade via Checksum SHA-256 (Hash Seguro):</p>

<table>
  <thead>
    <tr style="background-color: #161b22;">
      <th align="left">🚀 Download Direto</th>
      <th align="left">Tipo</th>
      <th align="left">Hash SHA-256 (Checksum)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/JhonVitor22/Ultimate-V-Tools./releases/download/v2.2.5/Ultimate.V-Tools_2.2.5_x64_pt-BR.msi"><b>📥 Baixar Instalador (.msi)</b></a></td>
      <td>Instalador</td>
      <td><code>A0E7D80A4918F0C4FFE8D2C43C3C377F8A8A421048A991FD97F211E741814075</code></td>
    </tr>
    <tr>
      <td><a href="https://github.com/JhonVitor22/Ultimate-V-Tools./releases/download/v2.2.5/Ultimate.V-Tools_2.2.5_x64-setup.exe"><b>📥 Baixar Portátil (.exe)</b></a></td>
      <td>Standalone</td>
      <td><code>001507E8BEA4A533395A1CA1C0B11FD82BB4CCAC12A2E64B61E08F2DEC84E03A</code></td>
    </tr>
  </tbody>
</table>

<br>

<blockquote>
  <b>⚠️ NOTA DE DEPLOYMENT:</b><br>
  Este software manipula registos protegidos do Windows (HKEY_LOCAL_MACHINE) e variáveis de inicialização do Kernel. A execução com <b>Privilégios Elevados (Administrator)</b> é mandatória para a integridade dos protocolos.
</blockquote>

<hr>

<div align="center">
  <p><b>Developer:</b> Jhon Vitor | <b>Engine:</b> Tauri + Rust | <b>Status:</b> Stable Build 🟢</p>
  <p><i>"Engineered for the next 5 summers."</i></p>
</div>
