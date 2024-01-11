const URL_API = "http://localhost:3003"
 
// let o = {
//     "parcial": ["A", "B", "A", "_", "A", "_", "_"],
//     "tentativa": 0,
//     "status": "jogando"
// }
 
// inp_letra btn_enviar btn_iniciar div_saida
 
function mostrar_resposta(json) {
    //montando as letras na tela
    let html = ""
    for (let cx of json.parcial) {
        html +=
            `<div class="col-auto btn btn"
        style="font-size: 3rem">${cx}</div>
        `
    }
    html = `
    <div class="row m-0"><h4>Tentativa: ${json.tentativa}</h4></div>
    <div class="row m-0 justify-content-center gap-2">${html}</div>`
    
    if(json.status == "acertou"){
        html+=`<div class="row m-0 text-center">
            <div class="col" style="font-size: 3rem">
                Parabéns!
            </div>
        </div>`
    }else if(json.status == "fim de jogo"){
        html+=`<div class="row m-0 text-center">
            <div class="col" style="font-size: 3rem">
                Game over!
            </div>
        </div>`
    }

    document.getElementById("div_saida").innerHTML = html
}
 
 
function fetch_post(url, obj_body) {
    let opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj_body)
    }
 
    return fetch(url, opts)
}
 
document.getElementById("btn_iniciar").addEventListener("click",
    async () => {
        let resp = await fetch_post(URL_API + "/iniciar", {})
 
        if (resp.ok) {
            let j = await resp.json()
 
            mostrar_resposta(j)
        }
    })
 
document.getElementById("btn_enviar").addEventListener("click",
    async () => {
        let l = document.getElementById("ipn_letra").value
 
        let resp = await fetch_post(URL_API + "/verificar",
            { letra: l })
 
        if (resp.ok) {
            // let o = {
            //     "parcial": ["A", "B", "A", "_", "A", "_", "_"],
            //     "tentativa": 0,
            //     "status": "jogando"
            // }
 
            let j = await resp.json()
 
            mostrar_resposta(j)
        }
        l = document.getElementById("ipn_letra").value = ""
    })

document.addEventListener("DOMContentLoaded", () => {
    let arr_teclas = "ABCDEFGHIJKLMNOPQRSTUVXYWZÇ".split("")

    let html = ""
    for (let t of arr_teclas) {
        html += `<div class="btn btn-primary col-1" onclick="enviar_tecla('${t}')">${t}</div>`        
    }
    document.getElementById("letras").innerHTML = html
})