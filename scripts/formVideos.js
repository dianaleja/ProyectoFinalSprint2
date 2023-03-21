import { videosFavoritos } from "../scripts/data.js";

const videos =
    JSON.parse(sessionStorage.getItem("videos")) || videosFavoritos;

const logo = document.querySelector(".header__figure");

logo.addEventListener('click', () => {
    window.location.href = "../index.html";
  });

  const linkActive = document.querySelector(".header__link");
  linkActive.classList.add('active');
  console.log(linkActive.classList);

  //.................................

  
  const form = document.getElementById("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const formChildren = Array.from(form.children);
  
    const arrayInput = formChildren.filter(
      (item) => (item.localName === "input" || item.localName === "select")
    );
  
    const newVideos = {
      name: "",
      image: "",
      video: "",
      autorImage:"",
      seenIn: {
        autor: "",
        category: "",
        visit: "",
      },     
  };
  for (const key in newVideos) {
    if (typeof newVideos[key]=== 'object') {
        for (const propertyName in newVideos[key]) {
            const input =  arrayInput.find(item=> item.id == propertyName)
            newVideos[key][propertyName] = input.value 
      }
    } else {
        const input = arrayInput.find((item) => item.id == key);
        newVideos[key] = input.value; 
    }
  }
  

  console.log(newVideos);
  const validateCampos = validateInputs(newVideos);
    if (validateCampos) {

        newVideos.id = videos.length + 1;

        videos.push(newVideos);

        sessionStorage.setItem("videos", JSON.stringify(videos));

        Swal.fire("Felicitaciones!", "Subiste exitosamente el video", "success");
        
        form.reset();
    }
    console.log(videosFavoritos);
});

const validateInputs = (objetoData) => {
    let camposVacios = "";
    for (const key in objetoData) {

        if (typeof objetoData[key] === "object") {

            for (const propertyName in objetoData[key]) {

                const valueProperty = objetoData[key][propertyName]
                
                camposVacios += !valueProperty ? `${propertyName} ` : "";

          }
        } else {
            const valueProperty = objetoData[key];
            camposVacios += !valueProperty ? `${key} `: "";
      }
    }

    if (camposVacios) {
        Swal.fire("Oops!", `Hay campos vacíos: ${camposVacios}`, "error");
        return false;
    } else {
        return true;
    }
    
}