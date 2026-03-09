const { spawn } = require('child_process');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { shell } = require('electron');

function downloadFile(urlStr, dest, onComplete, onError) {
    const client = urlStr.startsWith('https') ? https : http;
    
    client.get(urlStr, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
            return downloadFile(response.headers.location, dest, onComplete, onError);
        }

        if (response.statusCode !== 200) {
            return onError(`Erro servidor: ${response.statusCode}`);
        }

        const fileStream = fs.createWriteStream(dest);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
            fileStream.close(() => {
                onComplete();
            });
        });

        fileStream.on('error', (err) => {
            fs.unlink(dest, () => {}); 
            onError(err.message);
        });

    }).on('error', (err) => {
        onError(err.message);
    });
}

const comandos = {
    hwInfo: `
        $OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8;
        
        # 1. Hardware
        $cpu = (Get-CimInstance Win32_Processor).Name;
        $ram = [math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory / 1GB);
        $gpu = (Get-CimInstance Win32_VideoController).Name;
        
        # 2. Windows Fix
        $winInfo = Get-ItemProperty "HKLM:/SOFTWARE/Microsoft/Windows NT/CurrentVersion";
        $winVer = $winInfo.ProductName;
        if ($winInfo.DisplayVersion) { $winVer += " ($($winInfo.DisplayVersion))" }
        if ([int]$winInfo.CurrentBuild -ge 22000) { $winVer = $winVer -replace "Windows 10", "Windows 11" }
        
        $winStatus = if ((Get-CimInstance SoftwareLicensingProduct -Filter "Name like 'Windows%'" | Where-Object {$_.PartialProductKey}).LicenseStatus -eq 1) {"Ativado"} else {"Nao Ativado"}

        # 3. Varredura Office
        $offPath = "Nao Detectado"; $offStatus = "N/A";
        $paths = @(
            "C:/Program Files/Microsoft Office/Office16/OSPP.VBS",
            "C:/Program Files (x86)/Microsoft Office/Office16/OSPP.VBS",
            "C:/Program Files/Microsoft Office/root/Office16/OSPP.VBS"
        )

        foreach ($p in $paths) {
            if (Test-Path $p) {
                $offPath = "Instalado (M365/Retail)";
                $check = cscript //nologo $p /dstatus | Out-String;
                $offStatus = if ($check -match "LICENSE STATUS: --- LICENSED ---") { "Ativado" } else { "Nao Ativado/Assinatura" };
                break;
            }
        }

        Write-Output "--- DIAGNOSTICO DE ELITE ---";
        Write-Output "PROCESSADOR : $cpu";
        Write-Output "MEMORIA RAM : $ram GB";
        Write-Output "PLACA VIDEO : $gpu";
        Write-Output "-----------------------------";
        Write-Output "SISTEMA     : $winVer";
        Write-Output "LICENCA WIN : $winStatus";
        Write-Output "-----------------------------";
        Write-Output "OFFICE      : $offPath";
        Write-Output "STATUS OFF  : $offStatus";
    `, // A VÍRGULA QUE FALTAVA ESTÁ AQUI
    activateWin: `
        $url = "https://get.activated.win"; $s = irm $url;
        powershell.exe -NoProfile -WindowStyle Hidden -Command "& ([scriptblock]::Create('$s')) /HWID" | Out-Null;
        Write-Output "[OK] Ativacao Windows Concluida.";
    `,
    activateOff: `
        $url = "https://get.activated.win"; $s = irm $url;
        powershell.exe -NoProfile -WindowStyle Hidden -Command "& ([scriptblock]::Create('$s')) /Ohook" | Out-Null;
        Write-Output "[OK] Ativacao Office Concluida.";
    `,
    reduceLag: `netsh int tcp set global autotuninglevel=disabled; Write-Output "Rede Otimizada.";`,
    deepClean: `Remove-Item -Path "$env:TEMP/*" -Recurse -Force -ErrorAction SilentlyContinue; Write-Output "Limpeza Concluida.";`,
    dnsGoogle: `netsh interface ip set dns name="Ethernet" static 8.8.8.8; Write-Output "DNS Google Ativo.";`,
    changeToPro: `changepk.exe /ProductKey VK7JG-NPHTM-C97JM-9MPGT-3V66T;`
};

const urlsOffice = {
    downOff365: { url: "https://c2rsetup.officeapps.live.com/c2r/download.aspx?ProductreleaseID=O365ProPlusRetail&platform=x64&language=pt-br&version=O1GA", file: "Setup_Office365.exe" },
    downOff2024: { url: "https://c2rsetup.officeapps.live.com/c2r/download.aspx?ProductreleaseID=ProPlus2024Retail&platform=x64&language=pt-br&version=O16GA", file: "Setup_Office2024.exe" },
    downOff2021: { url: "https://c2rsetup.officeapps.live.com/c2r/download.aspx?ProductreleaseID=ProPlus2021Retail&platform=x64&language=pt-br&version=O16GA", file: "Setup_Office2021.exe" }
};

function run(commandKey, onLog, onProgress, onFinish) {
    if (urlsOffice[commandKey]) {
        const info = urlsOffice[commandKey];
        const destPath = path.join(os.homedir(), 'Downloads', info.file);
        onLog(`[REDE] Baixando instalador: ${info.file}...`);
        downloadFile(info.url, destPath, 
            () => {
                onFinish(`[SUCESSO] Instalador salvo em: Downloads\\${info.file}`);
                shell.showItemInFolder(destPath);
            }, 
            (e) => onFinish(`[ERRO] ${e}`)
        );
        return;
    }

    const script = comandos[commandKey];
    if (!script) return onFinish("[ERRO] Comando nao localizado.");

    const child = spawn('powershell.exe', [
        '-NoProfile', '-WindowStyle', 'Hidden', '-ExecutionPolicy', 'Bypass', '-Command', script
    ], { shell: false, windowsHide: true });

    child.stdout.on('data', (data) => {
        const out = data.toString().trim();
        if (out) onLog(out);
    });

    child.on('close', () => onFinish(`Protocolo finalizado.`));
    if (child.stdin) child.stdin.end();
}

module.exports = { run };