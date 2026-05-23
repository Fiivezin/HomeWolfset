let logoBase64 = "";

document.getElementById("logoInput").addEventListener("change", function(e){

    const file = e.target.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(event){
            logoBase64 = event.target.result;
        }

        reader.readAsDataURL(file);
    }

});

function atualizarContador(i){

    const textarea = document.getElementById(`observacao${i}`);
    const contador = document.getElementById(`contador${i}`);

    const restante = 146 - textarea.value.length;

    contador.innerText = `${restante} caracteres restantes`;

}

function criarCampos(){

    const quantidade = parseInt(document.getElementById("quantidade").value);

    const editor = document.getElementById("editor");

    editor.innerHTML = "";

    for(let i = 1; i <= quantidade; i++){

        editor.innerHTML += `

        <div class="blocoEtiqueta">

            <h2>Etiqueta ${i}</h2>

            <div class="gridCampos">

                <div>
                    <label>Aparelho</label>
                    <input type="text" id="aparelho${i}">
                </div>

                <div>
                    <label>Senha</label>
                    <input type="text" id="senha${i}">
                </div>

                <div class="observacao">

                    <label>Observação</label>

                    <textarea 
                        id="observacao${i}"
                        maxlength="146"
                        placeholder="Máximo 146 caracteres"
                        oninput="atualizarContador(${i})"
                    ></textarea>

                    <small id="contador${i}" style="margin-top:6px; display:block; color:#666;">
                        146 caracteres restantes
                    </small>

                </div>

            </div>

        </div>

        `;
    }

}

function gerarEtiquetas(){

    const quantidade = parseInt(document.getElementById("quantidade").value);
    const tipo = document.getElementById("tipoImpressao").value;

    const folha = document.getElementById("folha");

    folha.innerHTML = "";

    folha.classList.remove("modoA4");
    folha.classList.remove("modo80");

    if(tipo === "80mm"){
        folha.classList.add("modo80");
    }else{
        folha.classList.add("modoA4");
    }

    const agora = new Date();

    const data = agora.toLocaleDateString('pt-BR');

    const hora = agora.toLocaleTimeString('pt-BR', {
        hour:'2-digit',
        minute:'2-digit'
    });

    for(let i = 1; i <= quantidade; i++){

        const aparelho = document.getElementById(`aparelho${i}`).value;
        const senha = document.getElementById(`senha${i}`).value;
        const observacao = document.getElementById(`observacao${i}`).value;

        folha.innerHTML += `

        <div class="etiqueta ${tipo === '80mm' ? 'etiqueta80' : 'etiquetaA4'}">

            <div class="logo">
                ${
                    logoBase64
                    ? `<img src="${logoBase64}">`
                    : `<div style="height:90px;"></div>`
                }
            </div>

            <div class="item">
                <div class="titulo">Aparelho</div>
                <div class="valor">${aparelho}</div>
            </div>

            <div class="item">
                <div class="titulo">Senha</div>
                <div class="valor">${senha}</div>
            </div>

            <div class="item">
                <div class="titulo">Observação</div>
                <div class="valor obsValor">${observacao}</div>
            </div>

            <div class="item dataHora">
                <div class="titulo">Data e Hora</div>
                <div class="valor">${data} - ${hora}</div>
            </div>

        </div>

        `;
    }

}

criarCampos();