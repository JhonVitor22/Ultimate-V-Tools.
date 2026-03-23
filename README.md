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
  A versão <b>v2.2.6-elite</b> introduz o <b>Remapeamento Estrutural de Interface</b>. Com a nova arquitetura de camadas, eliminamos conflitos de renderização entre o <i>backdrop-filter</i> e os seletores de opções, garantindo que cada pixel do efeito Neon responda com precisão cirúrgica ao input do usuário.
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
      <td><b>Interface Remapeada</b></td>
      <td>Novo Grid de colisão para botões e inputs, otimizando o DOM.</td>
      <td align="center">🎯 Precisão</td>
    </tr>
    <tr>
      <td><b>Kernel Engine</b></td>
      <td>Ajustes dinâmicos via <code>bcdedit</code> e <code>GraphicsDrivers</code>.</td>
      <td align="center">🚀 Low Latency</td>
    </tr>
    <tr>
      <td><b>Drag API v2</b></td>
      <td>Novo comando <code>start_drag</code> via Rust Bridge nativo.</td>
      <td align="center">🖱️ Estabilidade</td>
    </tr>
    <tr>
      <td><b>Visual Core</b></td>
      <td>Efeito <i>Neon Glow Borders</i> com profundidade adaptativa.</td>
      <td align="center">✨ UI Elite</td>
    </tr>
  </tbody>
</table>

<br>

<h2>🛠️ Engenharia de Software</h2>
<ul>
  <li><b>Interface Mapping Logic:</b> A UI foi totalmente remapeada para separar as áreas de arraste (Drag Regions) dos seletores de opções. Isso evita que o clique em um botão de função seja interpretado como um comando de movimento de janela.</li>
  <li><b>Neon Border Clipping:</b> Implementação de <i>Box-Shadow</i> inteligente que respeita os limites dos botões remapeados, evitando artefatos visuais no Terminal.</li>
  <li><b>GPU Scheduler Integration:</b> Ativação de chaves de registro para <i>Hardware Accelerated GPU Scheduling</i> diretamente pelo backend em Rust.</li>
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
  O remapeamento da interface exige o <b>WebView2 Runtime</b> atualizado. A execução como <b>Administrador</b> continua sendo mandatória para as funções de Kernel e Rede.
</blockquote>

<hr>

<div align="center">
  <p><b>Developer:</b> Jhon Vitor | <b>Engine:</b> Tauri v2 + Rust | <b>Status:</b> Stable v2.2.6 🟢</p>
  <p><i>"Engineered with precision. Driven by performance."</i></p>
</div>
