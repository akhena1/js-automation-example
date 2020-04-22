/* 
    site alvo: https://www.situacao-cadastral.com/
    Objetivo: tirar um print do resultado da consulta.
*/

// biblioteca necessária para a automatização dentro do chrome
const puppeteer = require('puppeteer')

//cpf a ser consultado 
let cpfConsultado = '410.623.918-37' // o CPF foi gerado neste link https://www.4devs.com.br/gerador_de_cpf

const consultaCpf = async (cpf) => {
    // o parametro 'headless' vem true por default. Ele diz se... 
    // ...a automatização deve aparecer na interface gráfica ou não.
    const browser = await puppeteer.launch({
        headless: false
    });

    // abre uma página no navegador
    const page = await browser.newPage();

    // navega até o site alvo
    await page.goto('https://www.situacao-cadastral.com/')

    // aguarda um elemento da DOM ser carregado antes de executar...
    //... os próximos comandos
    await page.waitFor('input[name="doc"]')

    // digita no elemento selecionado, o primeiro parametro é o elemento...
    // ... o segundo o valor que deve ser escrito, o terceiro define o tempo...
    // ... de delay entre cada tecla digitada
    await page.type('input[name="doc"]', cpf, {delay: 185}) 

    // Pressiona a tecla especificada no paramêtro.
    await page.keyboard.press('Enter')

    // Aguarda a página carregar antes de tirar a screenshot
    // O atributo 'path' diz onde a foto vai ser salva e seu nome
    await page.waitFor('div[id=resultado]')
    await page.screenshot({path: `./src/img/consultaCPF-${cpf}.png`})

    // fecha a página e o navegador
    await page.close()
    await browser.close()
}
consultaCpf(cpfConsultado)
