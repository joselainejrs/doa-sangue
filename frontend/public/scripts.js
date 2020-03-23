// colocando efeito no 1 botão
document
    .querySelector('header button')
    //chamando um evento para um ação
    .addEventListener("click", function () {
        document
            .querySelector('.form')
            // addicionar ou remover uma ação (toggle)
            .classList.toggle('hide')
    })