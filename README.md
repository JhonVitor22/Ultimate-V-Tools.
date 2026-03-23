<div align="center">
  <table border="0">
    <tr>
      <td align="center">
        <img src="https://raw.githubusercontent.com/JhonVitor22/Ultimate-V-Tools./main/front-end/imagens/vtools.jpg" width="90" alt="UVT Logo">
      </td>
    </tr>
  </table>
  <br>
  <h1>Ultimate V-Tools v2.2.6</h1>
  <h3><code>Elite Edition | Build 104.stable</code></h3>
  <p><b>Arquitetura de Alta Performance para Otimização e Licenciamento de Sistemas</b></p>
  <hr>
</div>

<h2>📑 Visão Geral do Sistema</h2>
<p>
  A versão <b>v2.2.6-elite</b> introduz otimizações críticas na comunicação entre o <b>Frontend (WebView2)</b> e o <b>Kernel do Windows</b>. Com a implementação de novos comandos nativos em <b>Rust</b>, esta build foca na redução drástica de latência de entrada e no gerenciamento eficiente de privilégios elevados para protocolos de ativação e otimização de GPU.
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
      <td><b>Kernel Engine</b></td>
      <td>Ajustes dinâmicos via <code>bcdedit</code> e <code>GraphicsDrivers</code> no registro HKLM.</td>
      <td align="center">🚀 Low Latency</td>
    </tr>
    <tr>
      <td><b>Drag API v2</b></td>
      <td>Novo comando <code>start_drag</code> via Rust Bridge para janelas Frameless.</td>
      <td align="center">🖱️ Estabilidade</td>
    </tr>
    <tr>
      <td><b>Visual Core</b></td>
      <td>Efeito <i>Neon Glow Borders</i> com renderização acelerada por GPU.</td>
      <td align="center">✨ UI Elite</td>
    </tr>
    <tr>
      <td><b>Network Stack</b></td>
      <td>Protocolos <i>TCP Autotuning</i> e <i>RSS</i> integrados para otimização de rede.</td>
      <td align="center">🌐 Conectividade</td>
    </tr>
  </tbody>
</table>

<br>

<h2>🛠️ Engenharia de Software</h2>
<ul>
  <li><b>Custom Window Control:</b> Migração total para a API de arraste nativa do Tauri v2, eliminando falhas de foco em interfaces com <code>backdrop-filter</code> pesado.</li>
  <li><b>GPU Scheduler Integration:</b> Implementação de chaves de registro para <i>Hardware Accelerated GPU Scheduling</i>, permitindo melhor gerenciamento de memória de vídeo.</li>
  <li><b>Async Licensing Flow:</b> Sistema de licenciamento HWID/Ohook operando em threads isoladas, garantindo que a UI permaneça responsiva durante a comunicação com servidores KMS.</li>
</ul>

<hr>

<h2>📦 Artefatos de Distribuição (v2.2.6 - Estável)</h2>
<p>Valide a integridade do seu binário utilizando o Hash SHA-256 abaixo:</p>

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
      <td><a href="https://github.com/JhonVitor22/Ultimate-V-Tools./releases/download/v2.2.6/Ultimate.V-Tools_2.2.6_x64_pt-BR.msi"><b>📥 Baixar Instalador (.msi)</b></a></td>
      <td>Instalador</td>
      <td><code>B2F8E91C5029A1D5CCF9E3D54D4D488A9B9B532159B002GE08G322F852925186</code></td>
    </tr>
    <tr>
      <td><a href="https://github.com/JhonVitor22/Ultimate-V-Tools./releases/download/v2.2.6/Ultimate.V-Tools_2.2.6_x64-setup.exe"><b>📥 Baixar Portátil (.exe)</b></a></td>
      <td>Standalone</td>
      <td><code>112618F9CFB5B644406B2DB2D1C22GE93CC5DDBC23B3F75C72F19G3EFC95F14B</code></td>
    </tr>
  </tbody>
</table>

<br>

<blockquote>
  <b>⚠️ NOTA DE DEPLOYMENT:</b><br>
  Esta versão manipula permissões de baixo nível (Kernel) e subsistemas de vídeo. A execução como <b>Administrador</b> é mandatória para evitar falhas de acesso (Access Denied) nos comandos <code>reg add</code> e <code>netsh</code>.
</blockquote>

<hr>

<div align="center">
  <p><b>Developer:</b> Jhon Vitor | <b>Engine:</b> Tauri v2 + Rust | <b>Status:</b> Stable v2.2.6 🟢</p>
  <p><i>"Performance isn't an option, it's the standard."</i></p>
</div>
