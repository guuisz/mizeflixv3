
teste = localStorage.getItem("episodioAtual");

teste.replaceAll("\"","");
console.log(teste);

function geraEpisodio() {
    let query = document.querySelectorAll('.video-container')[0];
    query.innerHTML = `<iframe src= ${teste} allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    query.appendChild(iframe);
}

geraEpisodio();