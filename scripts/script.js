import { videosFavoritos } from "./data.js";

console.log(videosFavoritos)

const videos =
    JSON.parse(sessionStorage.getItem("videos")) || videosFavoritos;
//mostrar los videos de data del array en las cards
const containerCards = document.querySelector(".main_cards");
console.log(containerCards);//Capturamos en el contenedor donde pintamos las card

//Funcion para pintar los videos dentro de cada elemenyo contenedor
const printVideos = (container, videos) => {
    // limpiar o vaciar el contenedor
    container.innerHTML = "";
    videos.forEach(videos => {
        container.innerHTML += `
        <article class="cards">
            <figure class="cards__figure">
                <img class="cards__image" data-card='cards'name=${videos.id} src=${videos.image} alt=${videos.name}> 
            </figure>
            <section class="info">
                <figure>        
                    <img class="cards__avatar"data-card='cards'src=${videos.autorImage} alt=${videos.autor}>
                </figure>
                    <h3 class="cards__name" data-card='cards'name=${videos.id}>${videos.name}</h3>
            </section>
            <div class="card__div">  
                    <p class="cards__autor">${videos.seenIn.autor}</p>
            </div>
            <div class="card__div">  
            <p class="cards__autor">${videos.seenIn.visit}</p>
            </div>
        </article>  
        `;

    });
};

//escuchar al evento DOMContenLoad (cuando se recarga la pagina)con un callback
//que imprimen videos
document.addEventListener("DOMContentLoaded", () => {
    printVideos(containerCards, videos);

});

//Escuchar el evento clic sobre las cards
document.addEventListener("click", (event) => {
    // if (event.target.classList.contains('cards__image')) {
    //     console.log("Hice click aquí");
    //     console.log(event.target);
    //     const dataCardAttribute = event.target.getAttribute('data-card');
    //     console.log(dataCardAttribute);
    // }
    const dataCardAttribute = event.target.getAttribute("data-card");
    if (dataCardAttribute === "cards") {
        // console.log('Quiero ir a la página de detalles del video');
        const id = event.target.getAttribute("name");
        sessionStorage.setItem("idVideos", JSON.stringify(id));
        window.location.href = "./pages/details.html";
    }
});


// ...........//Botones para filtrar videos...........

const categories = ["all"];

videos.forEach((item) => {
    if (!categories.includes(item.seenIn.category)) {
        categories.push(item.seenIn.category);
    }
});
// console.log(categories)

categories.forEach((item) => {
    const botonFiltrado = document.getElementsByName(item)[0];

    botonFiltrado.addEventListener('click', () => {
        const filmesFiltrados =
            item === "all"
                ? videos
                : videos.filter((element) => element.seenIn.category === item);
        printVideos(containerCards, filmesFiltrados);
    });
});


// //.............Buscar videos...............
const filterByName = (termSearch,videosList) => {
    const videosFiltrados = videosList.filter((cortos) => 
    cortos.name.toLowerCase().includes(termSearch.toLowerCase())
    );
    
    const result = videosFiltrados.length 
    ? videosFiltrados 
    : videosList;

    const messageResult = videosFiltrados.length
        ? false
        : "No existe el video";

    return {
        resultSearch: result,
        messageSearch: messageResult,
    };
};

const formSearch = document.querySelector(".search-bar");

formSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(formSearch.children);

    const formChildren = Array.from(formSearch.children);

    const inputSearch = formChildren.find((item) => item.localName === "input");

    console.log(inputSearch.value);

    const searchTerm = inputSearch.value;

    if (searchTerm) {

        const searchResult = filterByName(searchTerm, videos);

        console.log(searchResult);

        printVideos(containerCards, searchResult.resultSearch);

        if (searchResult.messageSearch) {

            Swal.fire("Oops!", searchResult.messageSearch, "error");
        }
    } else {

        Swal.fire("Oops!", "No ingresaste un video", "error");
    }
});

