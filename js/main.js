
    const links = document.querySelectorAll(".menu a");
let gamesData = [];
const loading = document.querySelector(".loading");
const mode = document.getElementById("mode");

getGames("mmorpg");

if (localStorage.getItem("theme") != null) {
   const themeData = localStorage.getItem("theme"); 

   if (themeData === "light") {
      mode.classList.replace("fa-sun", "fa-moon"); 
   } else {
      mode.classList.replace("fa-moon", "fa-sun"); 
   }

   document.querySelector("html").setAttribute("data-theme", themeData); 
}

for (let i = 0; i < links.length; i++) {
   links[i].addEventListener("click", function (e) {
      document.querySelector(".menu .active").classList.remove("active");
      links[i].classList.add("active");

      const category = e.target.innerText; 

      console.log(category); 

      getGames(category); 
   });
}



mode.addEventListener("click", function (e) {
   if (mode.classList.contains("fa-sun")) {
      document.querySelector("html").setAttribute("data-theme", "light");
      mode.classList.replace("fa-sun", "fa-moon"); 

      localStorage.setItem("theme", "light");
   } else {
      mode.classList.replace("fa-moon", "fa-sun"); 
      document.querySelector("html").setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
   }
});



async function getGames(categoryName) {
   loading.classList.remove("d-none"); 

   const options = {
      method: "GET",
      headers: {
         "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
         "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
   };

   const apiResponse = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options);
   const data = await apiResponse.json();
   console.log(data); 
   gamesData = data;
   displayData();
   loading.classList.add("d-none"); 
}

function displayData() {
   
   let gamesBox = ``;
   for (let i = 0; i < gamesData.length; i++) {
      let videoPath = gamesData[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm"); /// https://www.freetogame.com/g/540/thumbnail.jpg

      gamesBox += `
      <div class="col">
      <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${gamesData[i].id})" class="card h-100 bg-transparent" role="button" >
         <div class="card-body">

            <figure class="position-relative">
               <img class="card-img-top object-fit-cover " height="200" src="${gamesData[i].thumbnail}" />

             <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
              <source src="${videoPath}">
              </video>

            </figure>

            <figcaption>

               <div class="hstack justify-content-between">
                  <h3 class="h6 small"> ${gamesData[i].title} </h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>

               <p class="card-text small text-center opacity-50">
                  ${gamesData[i].short_description}
               </p>

            </figcaption>
         </div>

         <footer class="card-footer small  justify-content-between">

            <span class="badge badge-color">${gamesData[i].genre}</span>
            <span class="badge badge-color">${gamesData[i].platform}</span>

         </footer>
      </div>
   </div>
      `;
   }

   document.getElementById("gameData").innerHTML = gamesBox;
}

function startVideo(event) {
   const videoEl = event.target.querySelector("video"); 
   videoEl.classList.remove("d-none");
   videoEl.muted = true;
   videoEl.play();
}

function stopVideo(event) {
   const videoEl = event.target.querySelector("video");
   videoEl.classList.add("d-none");
   videoEl.muted = true;
   videoEl.pause();
}






