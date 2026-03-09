/**
 * MÓDULO: Commands Master (Ultimate V-tools JS)
 * DIRETOR: Indivíduo / Mestre
 * FUNÇÃO: Hardware, Rede, Ativadores e Upgrade de Versão
 */

const COMMANDS = {
    // HARDWARE: Ajustado para máxima compatibilidade com Xeon E5 2650 v4
    hwInfo: "wmic cpu get name /value; wmic path win32_VideoController get name /value; wmic computersystem get totalphysicalmemory /value",

    // REDE: Foco em Redes de Computadores (UNINOVE)
    dnsGoogle: "Set-DnsClientServerAddress -InterfaceAlias (Get-NetAdapter | Where-Object Status -eq 'Up').InterfaceAlias -ServerAddresses ('8.8.8.8','8.8.4.4'); ipconfig /flushdns",
    reduceLag: "reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces' /v TcpAckFrequency /t REG_DWORD /d 1 /f; reg add 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces' /v TCPNoDelay /t REG_DWORD /d 1 /f",

    // SISTEMA: Limpeza Profunda (Rotina 12h SP)
    deepClean: "Remove-Item -Path $env:TEMP\\* -Recurse -Force -ErrorAction SilentlyContinue; Write-Host 'Limpeza Concluída!'",

    // ATIVAÇÃO (A Função Principal): HWID e Ohook
    activateWin: "& ([scriptblock]::Create((irm https://get.activated.win))) /hwid",
    activateOff: "& ([scriptblock]::Create((irm https://get.activated.win))) /ohook",

    // UPGRADE: Home para Pro (Usando a chave de gatilho que você tinha no Python)
    changeToPro: "changepk.exe /ProductKey VK7JG-NPHTM-C97JM-9MPGT-3V66T",

    // DOWNLOADS: Office Pack Oficial (Via BITS para não travar o Xeon)
    dlOffice365: "Start-BitsTransfer -Source 'https://officecdn.microsoft.com/pr/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/pt-br/O365ProPlusRetail.img' -Destination \"$env:USERPROFILE\\Downloads\\Office365_PTBR.img\"",
    dlOffice2024: "Start-BitsTransfer -Source 'https://officecdn.microsoft.com/pr/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/pt-br/ProPlus2024Retail.img' -Destination \"$env:USERPROFILE\\Downloads\\Office2024_PTBR.img\""
};

module.exports = COMMANDS;
