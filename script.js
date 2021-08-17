window.onload = () => {

let config = {
    "headers": {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
    },
    "method": "GET",
    "mode": 'cors',
    
}


fetch("http://localhost:3000/livros",config)
    .then((response)=>{
        return response.json();
    }).then((json)=>{
        let htmlLivros = "";
        for (const livro of json) {
            htmlLivros += `
            <div class="card">
                <div class="card-header" id="livro-${livro.id}">
                    <h2 class="mb-0">
                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                            data-target="#collapse-${livro.id}" aria-expanded="false"
                            aria-controls="collapse-${livro.id}">
                            ${livro.titulo}
                        </button>
                    </h2>
                </div>
                <div id="collapse-${livro.id}" class="collapse" aria-labelledby="livro-${livro.id}"
                    data-parent="#accordionLivros">
                    <div class="card-body">
                        <!-- INFO LIVRO -->
                        <p>Autor: ${livro.autor}</p>
                        <p>Ano de Lançamento: ${livro.ano_lancamento}</p>
                        <p>Quantidade de paginas: ${livro.quantidade_paginas}</p>
                    </div>
                </div>
            </div>`     
        }

        console.log(htmlLivros);
        let accordionLivros = document.querySelector('#accordionLivros');
        accordionLivros.innerHTML = htmlLivros
    }).catch((errors)=>{
        console.log(errors)
    })
    
    
    let btnSubmit= document.querySelector('#cadastrarLivro button');

    btnSubmit.onclick = (evento) =>{
        evento.preventDefault();

        let titulo=document.querySelector('input#titulo').value;
        let autor=document.querySelector('input#autor').value;
        let quantidade_paginas=document.querySelector('input#quantidade_paginas').value;
        let ano_lancamento=document.querySelector('input#ano_lancamento').value;
        let estoque=document.querySelector('input#estoque').value;

    
        fetch('http://localhost:3000/livros/criar', {
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "method": "POST",
                "body": JSON.stringify({
                    "titulo": titulo,
                    "quantidade_paginas": quantidade_paginas,
                    "autor": autor,
                    "ano_lancamento": ano_lancamento,
                    "estoque": estoque
                })
            }).then((response) => response.json())
            .then((data) => alert('Livro cadastrado com sucesso'))
            .catch((erros) => alert('Ops, tente mais tarde'))
        
    }
}