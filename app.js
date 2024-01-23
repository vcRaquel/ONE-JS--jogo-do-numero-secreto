//associada à função de gerar um número aleatório
let listaDeNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
//associada à função de verificar chute
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //referente ao recurso da linha 7 do HTML (o que vai ser lido, voz, velocidade)
    // a voz é escolhida na documentação
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`);
}
exibirMensagemInicial();

// Trabalhando com o botão chutar (no HTML linha 27 "verificarChute()") função que tem que ser homônima
function verificarChute(){
    let chute = document.querySelector("input").value;
    
    if(chute == numeroSecreto){
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemNaTela = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagemNaTela);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela("p", `O número secreto é menor que ${chute}`);
        }else{
            exibirTextoNaTela("p", `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

//gerando número aleatório
function gerarNumeroAleatorio(){
    let numeroescolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeElementosLista = listaDeNumerosSorteados.length;

    if(quantidadeElementosLista == numeroMaximo){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroescolhido)){
        return gerarNumeroAleatorio();
    }else{
        //adicionar o item na lista em JS usa push e não add
        listaDeNumerosSorteados.push(numeroescolhido);
        return numeroescolhido;
    }
} 

//limpando o campo do input depois do chute 
function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;    
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
