/**
 * ARQUIVO: index.js
 * VERSÃO: Front-End Identity Edition
 * DIRETOR: Indivíduo / Mestre
 */

const Executor = require('./executor');
const os = require('os');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Configurações Estéticas (ANSI)
const azul = "\x1b[38;5;26m"; 
const ciano = "\x1b[36m";
const verde = "\x1b[32m";
const amarelo = "\x1b[33m";
const bold = "\x1b[1m";
const reset = "\x1b[0m";

// Lógica de Identidade e Saudação
const nomeUsuario = os.userInfo().username.toUpperCase();
const hora = new Date().getHours();
const saudacao = (hora >= 5 && hora < 12) ? "BOM DIA" : 
                 (hora >= 12 && hora < 18) ? "BOA TARDE" : "BOA NOITE";

function desenharMoldura(linhas) {
    const largura = 62;
    const superior = `╔${"═".repeat(largura)}╗`;
    const inferior = `╚${"═".repeat(largura)}╝`;
    
    console.log(`${azul}${bold}${superior}${reset}`);
    linhas.forEach(linha => {
        const textoLimpo = linha.replace(/\x1b\[[0-9;]*m/g, '');
        const espacos = largura - textoLimpo.length;
        console.log(`${azul}${bold}║${reset} ${linha}${" ".repeat(espacos - 1)}${azul}${bold}║${reset}`);
    });
    console.log(`${azul}${bold}${inferior}${reset}`);
}

function mostrarMenuPrincipal() {
    console.clear();
    desenharMoldura([
        ` ${verde}●${reset} ${bold}ULTIMATE V-TOOLS - NEXT GEN${reset}`,
        ` ${verde}●${reset} ${saudacao}, ${nomeUsuario}!`,
        ` `,
        `  ${ciano}1.${reset} DIAGNÓSTICO DE HARDWARE (XEON/RX)`,
        `  ${ciano}2.${reset} OTIMIZAÇÃO DE REDE (DNS/LAG)`,
        `  ${ciano}3.${reset} LICENCIAMENTO & ATIVADORES`,
        `  ${ciano}4.${reset} LIMPEZA DE SISTEMA (SÃO PAULO MOD)`,
        ` `,
        `  ${amarelo}0. ENCERRAR CONEXÃO${reset}`
    ]);
    
    rl.question(`\n ${azul}${bold}» AGUARDANDO ORDEM:${reset} `, (op) => {
        switch(op) {
            case '1': verHardware(); break;
            case '2': menuRede(); break;
            case '3': menuAtivadores(); break;
            case '4': rodarComandoUI('deepClean', "LIMPEZA PROFUNDA"); break;
            case '0': 
                console.log(`\n ${azul}Encerrando... Ordem e Respeito.${reset}`);
                process.exit(); 
                break;
            default: mostrarMenuPrincipal();
        }
    });
}

function menuAtivadores() {
    console.clear();
    desenharMoldura([
        `          ${bold}CENTRAL DE LICENCIAMENTO${reset}`,
        ` `,
        `  ${verde}[W]${reset} Ativar Windows (HWID)`,
        `  ${verde}[O]${reset} Ativar Office (Ohook)`,
        `  ${amarelo}[P]${reset} Mudar Versão para PRO`,
        ` `,
        `  ${azul}[0] VOLTAR AO MENU${reset}`
    ]);

    rl.question(`\n ${azul}${bold}» SELECIONE A FERRAMENTA:${reset} `, (op) => {
        const escolha = op.toUpperCase();
        if (escolha === 'W') rodarComandoUI('activateWin', "ATIVADOR WINDOWS");
        else if (escolha === 'O') rodarComandoUI('activateOff', "ATIVADOR OFFICE");
        else if (escolha === 'P') rodarComandoUI('changeToPro', "UPGRADE PRO");
        else mostrarMenuPrincipal();
    });
}

function menuRede() {
    console.clear();
    desenharMoldura([
        `          ${bold}OTIMIZAÇÃO DE REDE (UNINOVE)${reset}`,
        ` `,
        `  ${ciano}[1]${reset} DNS Google & Flush DNS`,
        `  ${ciano}[2]${reset} Redução de Input Lag (TcpNoDelay)`,
        ` `,
        `  ${azul}[0] VOLTAR AO MENU${reset}`
    ]);

    rl.question(`\n ${azul}${bold}» ESCOLHA O MÓDULO:${reset} `, (op) => {
        if (op === '1') rodarComandoUI('dnsGoogle', "OTIMIZAÇÃO DNS");
        else if (op === '2') rodarComandoUI('reduceLag', "OTIMIZAÇÃO LAG");
        else mostrarMenuPrincipal();
    });
}

function rodarComandoUI(key, titulo) {
    console.clear();
    desenharMoldura([`          ${bold}EXECUTANDO: ${titulo}${reset}`]);
    console.log(`\n ${amarelo}» LOG EM TEMPO REAL:${reset}\n`);
    
    Executor.run(key, (dados) => {
        // Se for hardware, processamos as linhas
        if (key === 'hwInfo') {
            const linhas = dados.split('\n').map(l => l.trim()).filter(l => l !== '');
            linhas.forEach(linha => {
                const valor = linha.split('=')[1] || linha;
                if (linha.toLowerCase().includes('name')) console.log(` ${ciano}[HARDWARE]:${reset} ${valor}`);
                else if (linha.toLowerCase().includes('totalphysicalmemory')) {
                    const ramGB = Math.round(parseInt(valor) / (1024 * 1024 * 1024));
                    console.log(` ${verde}[RAM]:${reset} ${ramGB} GB Instalados`);
                }
            });
        }
        console.log(`\n ${verde}» OPERAÇÃO CONCLUÍDA.${reset}`);
        pausar();
    });
}

function verHardware() {
    rodarComandoUI('hwInfo', "DIAGNÓSTICO DE HARDWARE");
}

function pausar() {
    console.log(`\n${azul}──────────────────────────────────────────────────────────────${reset}`);
    rl.question(` ${azul}${bold}Pressione [Enter] para retornar...${reset}`, () => mostrarMenuPrincipal());
}

// Inicialização Final
mostrarMenuPrincipal();