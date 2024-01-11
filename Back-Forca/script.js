// importando modulo "express"
const express = require('express')
const cors = require("cors")
const api = express()

let lista = ["abacaxi", "banana", "carro", "dinossauro", "elefante", "futebol", "girassol", "hipopótamo", "igreja", "jogador",
    "kiwi", "leão", "macaco", "navio", "ovelha", "palavra", "quadrado", "rato", "sapato", "tigre", "urso", "vassoura", "xadrez",
    "zebra", "alpaca", "borboleta", "cachorro", "dado", "eletricidade", "flor", "gato", "hamster", "indiano", "joaninha",
    "kiwi", "lago", "morango", "navalha", "orangotango", "panda", "quinoa", "raposa", "salsicha", "tartaruga", "urubu", "vampiro",
    "waffle", "xícara", "zeppelin", "anjo", "bala", "caracol", "dente", "eletrônica", "foca", "guitarra", "hamburguer", "impressora",
    "joelho", "lagosta", "morcego", "nariz", "ouro", "papagaio", "queijo", "raio", "sol",
    "tartaruga", "uva", "vela", "xuxu", "zumbi", "abelha", "banana", "cavalo", "dinheiro", "eletricista", "frango", "girafa",
    "hamster", "iglu", "joia", "kiwi", "laranja", "macarrão", "ninja", "ombro", "piano", "quarto", "sol", "tubarão", "urso",
]

// cria o servidor com express
// usar o middleware
api.use(cors())
api.use(express.json())

let palavra_secreta = ""
let array_palavra_secreta = []
let array_palavra_parcial = []
let status = "jogando" // "Jogando", "fim de jogo" ou "acertou"
let tentativas = 0 // 0 - 6

// rota1
api.post('/iniciar', (req, res) => {
    //sortear a palavra secreta
    let num_aleatorio = Math.trunc(Math.random() * lista.length)
    palavra_secreta = lista[num_aleatorio].toUpperCase()
    array_palavra_secreta = palavra_secreta.split("")
    array_palavra_parcial = []

    //construindo o array da palavra parcial
    for (let i = 0; i < array_palavra_secreta.length; i++) {
        array_palavra_parcial.push("_")
    }

    // para resolver quando a palavra secreta tem espaços no meio ex: quebra cabeça
    for (let i = 0; i < array_palavra_secreta.length; i++) {
        if (array_palavra_secreta[i] == " ")
        array_palavra_parcial[i] = " "
    }


    status = "jogando"
    tentativas = 0

    console.log(array_palavra_secreta)
    console.log(array_palavra_parcial)

    //enviar palavra do usuário
    res.json(
        {
            parcial: array_palavra_parcial,
            tentativa: tentativas,
            status: status
        }
    )
})

// rota2
api.post('/verificar', (req, res) => {
    let letra = req.body.letra.toUpperCase()

    //status
    // "Jogando", "fim de jogo" ou "acertou"
    if (status == "jogando"){
        let achou_letra = false

        // verificar se a letra existe na palavra secreta
        for (let i = 0; i < array_palavra_secreta.length; i++) {
            if (array_palavra_secreta[i] == letra) {
                achou_letra = true
                array_palavra_parcial[i] = letra
            }
        }

        // conta erros 
        if (achou_letra == false){
            tentativas++
        }

        // detecta fim de jogo
        if (tentativas >= 6){
            status = "fim de jogo"
        } else if (array_palavra_parcial.join("") ==
        array_palavra_secreta.join("")) {
            status = "acertou"
        }
    }

    // enviar palavra do usuário
    res.json(
        {
            parcial: array_palavra_parcial,
            tentativa: tentativas,
            status: status
        }
    )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
})

// rota3
api.get('/palavra_completa', (req, res) => {
    let palavra = req.body.palavra

    if(palavra_secreta == palavra){
        status = "acertou"
        array_palavra_parcial = array_palavra_secreta
    } else {
        status = "fim de jogo"
        array_palavra_parcial = array_palavra_secreta
    }

    res.json(
        {
            parcial: array_palavra_parcial,
            tentativa: tentativas,
            status: status
        }
    )    
})

// inicia o servidor da porta 3003
const porta = 3003
api.listen(porta, () => {
    console.log(`Rodando em ${porta}`)
})