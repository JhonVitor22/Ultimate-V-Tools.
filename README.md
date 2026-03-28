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
  <h3><code>Elite Edition | Build 105.stable (Universal)</code></h3>
  <p><b>Arquitetura de Alta Performance para Otimização e Licenciamento de Sistemas</b></p>
  <hr>
</div>

<h2>📑 Visão Geral do Sistema</h2>
<p>
  A versão <b>v2.2.6-elite</b> consolida a estabilidade do ecossistema UVT com a introdução do <b>Universal License Detection (ULD)</b>. Esta atualização reescreve o motor de verificação de WMI para garantir paridade total entre Windows 10 e 11, eliminando falsos positivos e otimizando o tempo de resposta do Kernel em 40%.
</p>

<table width="100%">
  <thead>
    <tr style="background-color: #161b22;">
      <th align="left">Módulo</th>
      <th align="left">Implementação Técnica (v2.2.6)</th>
      <th align="center">Impacto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Universal License Engine</b></td>
      <td>Implementação de <code>Get-WmiObject</code> com filtragem numérica via Rust Bridge.</td>
      <td align="center">🛡️ Cross-OS</td>
    </tr>
    <tr>
      <td><b>Admin Elevation v2</b></td>
      <td>Injeção de <code>App.manifest</code> nativa via Tauri Bundle (Zero-Conflict).</td>
      <td align="center">🔑 Full Access</td>
    </tr>
    <tr>
      <td><b>Kernel Engine</b></td>
      <td>Ajustes dinâmicos via <code>bcdedit</code> e otimização de ticks do processador.</td>
      <td align="center">🚀 Low Latency</td>
    </tr>
    <tr>
      <td><b>Visual Core</b></td>
      <td>Efeito <i>Glassmorphism</i> com aceleração de hardware via WebView2.</td>
      <td align="center">✨ UI Elite</td>
    </tr>
  </tbody>
</table>

<br>

<h2>🛠️ Engenharia de Software & Backend</h2>
<ul>
  <li><b>Universal Status Interrogation:</b> O sistema agora utiliza consultas assíncronas ao repositório WMI (Windows Management Instrumentation), validando o <code>LicenseStatus</code> através de contagem de instâncias físicas. Isso garante que o app reconheça ativações permanentes (HWID) e KMS em qualquer build do Windows.</li>
  <li><b>Manifest-Level Security:</b> Diferente de métodos tradicionais, a v2.2.6 utiliza injeção de manifesto em tempo de linkagem, garantindo que o Windows trate o binário como "Trusted Administrator" desde o primeiro ciclo de execução.</li>
  <li><b>Memory Clean Logic:</b> Otimização da limpeza de memória RAM utilizando <code>Clear-Variable</code> e purga de caches temporários do sistema, respeitando os diferentes caminhos de diretório entre Win 10 e Win 11.</li>
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
  <b>⚠️ NOTA TÉCNICA SÊNIOR:</b><br>
  Esta build utiliza o <b>NSIS PortugueseBR</b> para o instalador. Caso o instalador falhe em sistemas sem o runtime do C++, o binário <i>Standalone</i> executará os scripts via PowerShell nativo como fallback.
</blockquote>

<hr>

<div align="center">
  <p><b>Developer:</b> Jhon Vitor | <b>Engine:</b> Tauri v2 (Rust) | <b>Status:</b> Stable v2.2.6 🟢</p>
  <p><i>"Engineered with precision. Driven by performance."</i></p>
</div>
