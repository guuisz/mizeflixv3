
teste = localStorage.getItem("volumeAtual");

teste.replaceAll("\"","");
console.log(teste);

function geraEpisodio() {
    let query = document.querySelectorAll('.video-container')[0];
    query.innerHTML = `<iframe src= ${teste} frameborder="0"</iframe>`;
    query.appendChild(iframe);
}

geraEpisodio();