
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');
const inputAmigo = document.getElementById('amigo');
let amigos = [];

function adicionarAmigo() {
    const nomeAmigo = inputAmigo.value.trim(); // Remove espaços em branco extras

    if (nomeAmigo !== "") { // Impede adicionar nomes vazios
        amigos.push(nomeAmigo);
        const novoItemLista = document.createElement('li');
        novoItemLista.textContent = nomeAmigo;
        listaAmigos.appendChild(novoItemLista);
        inputAmigo.value = ""; // Limpa o input após adicionar
    } else {
        alert("Por favor, digite um nome."); // Alerta se o nome for vazio
    }
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("É necessário pelo menos dois participantes para o sorteio.");
        return; // Sai da função se não houver participantes suficientes
    }

    // Embaralha o array de amigos (Fisher-Yates shuffle)
    for (let i = amigos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigos[i], amigos[j]] = [amigos[j], amigos[i]];
    }

    resultado.innerHTML = ""; // Limpa resultados anteriores
    const resultados = [];

    // Cria os pares de amigo secreto (evitando que a pessoa tire ela mesma)
    for (let i = 0; i < amigos.length; i++) {
        let sorteado;
        if (i === amigos.length - 1) { // Último participante
            sorteado = amigos[0]; // Sorteia o primeiro
        } else {
            sorteado = amigos[i + 1];
        }
        resultados.push({ pessoa: amigos[i], sorteado: sorteado });
    }

    // Exibe os resultados na tela
    resultados.forEach(par => {
        const novoItemResultado = document.createElement('li');
        novoItemResultado.textContent = `${par.pessoa} tirou: ${par.sorteado}`;
        resultado.appendChild(novoItemResultado);
    });
}


// Evento para adicionar amigo com Enter
inputAmigo.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // 13 é o código da tecla Enter
        adicionarAmigo();
    }
});