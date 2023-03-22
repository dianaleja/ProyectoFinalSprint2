import { videosFavoritos } from "../scripts/data.js"
const guardarCategoria = JSON.parse(sessionStorage.getItem("category"));

const videos =
    JSON.parse(sessionStorage.getItem("videos")) || videosFavoritos;

const logo = document.querySelector(".header__figure")

logo.addEventListener('click', () => {
    window.location.href = "../index.html";
  });
    



const showViedosInfo = (contenedor, videos) => {
    //crear el elmento figure
    const figure = document.createElement("figure");
       figure.innerHTML = `<iframe class="main__cardVideo" src=${videos.video} alt=${videos.name}</iframe>`;
    contenedor.appendChild(figure);

    const list = document.createElement("ul");
    list.classList.add('main__list');
    for (const key in videos.seenIn) {
        console.log(key, "--->", videos.seenIn[key]);
        const item = document.createElement("li");
        item.innerHTML = `${key}; ${videos.seenIn[key]}`;
        list.appendChild(item);
        }
        contenedor.appendChild(list);

      
    };

const idVideosStg = JSON.parse(sessionStorage.getItem("idVideos")) || 0;
    const idVideos = Number(idVideosStg);
document.addEventListener('DOMContentLoaded', () => {// //capturar información que tenemos guardada en session storage
    
    console.log(idVideos);


    //hacer las busqueda del video al que se le hace click
    const videos = videosFavoritos.find((film) => film.id === idVideos);
    console.log(videos);


    // Actualizar el titulo con el nombre del video
    const title = document.getElementById("title");
    title.innerText = videos.name;

    //capturar el contenredor donde se inserta la informacion del video
    const infoVideosContainer = document.getElementById("information");
    showViedosInfo(infoVideosContainer, videos);
});



//.................videos sugerido................


const mostrarVideosSugeridos = (
    contenedorVideosSugeridos,
    videosList,
    idVideo
  ) => {
    //1. Creamos el contenedor padre de la lista de videos sugeridos
    const sectionVideos = document.createElement("section");
  
    sectionVideos.classList.add("contenedorVideos");
    //Necesitamos el array de video sugeridos: Todos los videos exceptuando el que se está repoduciendo
    const videosSugeridos = videosList.filter((videos) => videos.id != idVideos); 
  
    //Recorremos el array de videosSugeridos
    videosSugeridos.forEach(videos => {
      sectionVideos.innerHTML += `
          
      <article>

          <figure><img src=${videos.image} alt=${videos.name} /></figure>
          
          <section>
            
              <h3 class="cards__name">${videos.name}</h3>
                  <img class="cards__avatar" src=${videos.autorImage} alt=${videos.autor}>
                  <span class="cards__autor>${videos.seenIn.visit}</span>
           
            </section>
        </article>
          `;
    });
    contenedorVideosSugeridos.appendChild(sectionVideos);
  }
  const videosSugeridos = document.getElementById("videos__sugeridos");
document.addEventListener("DOMContentLoaded", () => {
  mostrarVideosSugeridos(videosSugeridos, videosFavoritos);
});