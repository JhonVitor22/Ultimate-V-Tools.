// 1. Adicione o 'ipcMain' na primeira linha
const { app, BrowserWindow, ipcMain } = require('electron'); 
const path = require('path');

function criarJanela() {
    const mainWindow = new BrowserWindow({
        width: 550,
        height: 650,
        minWidth: 450,
        minHeight: 500,
        show: false,
        transparent: true, 
        frame: false,     
        resizable: true,  
        backgroundColor: '#00000000', 
        icon: path.join(__dirname, 'icon.png'), 
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');

    // 2. ESCUTADOR DE REDIMENSIONAMENTO DINÂMICO
    // Isso fará a janela esticar fisicamente quando você abrir um acordeão
    ipcMain.on('resize-window', (event, newHeight) => {
        const [width] = mainWindow.getSize();
        mainWindow.setSize(width, newHeight, true); // O 'true' ativa a animação suave
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.whenReady().then(() => {
    criarJanela();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) criarJanela();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});