🛠️ Ultimate V-Tools — Release V2.2.4

Esta versão marca a transição do software para uma arquitetura híbrida de alta performance, focando em estabilidade para ambientes de rede e otimização estética.

**💎 Principais Atualizações:**

Identidade Visual Reestruturada: Integração de novos ativos gráficos (App.ico) com acabamento metálico, alinhados à estética de precisão técnica.

Arquitetura Híbrida (Electron + Rust): Implementação do core em Rust (uvt-core) para execução de tarefas de baixo nível com máxima eficiência e baixo consumo de memória.

Segurança de Instância: Implementação de Single Instance Lock no processo principal, impedindo múltiplas execuções simultâneas e garantindo a integridade dos processos de rede.

Interface Estabilizada: Correção do "bug de encolhimento" da janela com dimensões fixas de 500x650px e efeitos de transição fade-in na inicialização.

⚙️ Mudanças Técnicas:

IPC Bridge: Refatoração da comunicação entre o processo de renderização e o sistema via ipcMain e ipcRenderer.

Gestão de Dependências: Otimização do package.json para builds portáteis e exclusão de binários pesados do repositório via .gitignore estratégico.

Compatibilidade: Preparado para ambientes Windows com suporte a execução em segundo plano e controles de janela customizados.
---

🛠️ Tecnologias Utilizadas
Core Engine: Rust (High-Performance & Memory Safety)

Runtime UI: Electron.js (Chromium + Node.js)

Interface: HTML5 / CSS3 (Modern Flexbox & Glassmorphism)

Fonts: Montserrat Bold & Killing Harmonic (Elite Typography)

Arquitetura: Híbrida (Native Binaries + Web-based View)

Build System: electron-builder (Portable & Code Signed)

---

## 📦 Como Utilizar

1. **Privilégios:** O software exige execução como **Administrador**.
2. **Portabilidade:** Execute o `.exe`. Não requer instalação.
3. **Monitoramento:** Utilize o terminal azul para validar o sucesso de cada script injetado no Windows.



---

## 📜 Licença e Créditos

Desenvolvido por **Jonatan Vitor**.
*Foco em precisão estética, lógica superior e eficiência de hardware.*
