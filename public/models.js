//* =========================================
//   MODELS PAGE
//* =========================================

const motorcycleList = document.getElementById('motorcycleList');

if (motorcycleList) {

  loadMotorcycles();

}

async function loadMotorcycles() {

  try {

    const response = await fetch('/api/motorcycles');

    const motorcycles = await response.json();

    motorcycleList.innerHTML = '';

    motorcycles.forEach(bike => {

      motorcycleList.innerHTML += `
      
        <div class="motorcycle-card">

          <div class="motorcycle-image">

            <button class="favorite-btn" data-id="${bike.id}">
              ♡
            </button>

            <a href="motorcycle.html?id=${bike.id}">
              <img src="${bike.image_url}" alt="${bike.name}">
            </a>

          </div>

          <div class="motorcycle-info">

            <h2>
              <a href="motorcycle.html?id=${bike.id}" class="motorcycle-link">
                 ${bike.name}
              </a>
            </h2>

            <p>
              ${bike.description}
            </p>

            <div class="specs">

              <span>${bike.engine_volume} cc</span>
              <span>${bike.power} л.с.</span>
              <span>${bike.weight} кг</span>

            </div>

          </div>

        </div>

      `;

    });

  } catch (error) {

    console.error('Ошибка загрузки мотоциклов:', error);

  }


  initFavoriteButtons();

}

/* FAVORITES */

let favorites =
  JSON.parse(localStorage.getItem("favorites")) || [];

/* АКТИВАЦИЯ КНОПОК */

function initFavoriteButtons() {

  const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

  favoriteButtons.forEach(button => {

    const id = button.dataset.id;

    /* ЕСЛИ УЖЕ В ИЗБРАННОМ */

    if (favorites.includes(id)) {

      button.classList.add("active");
      button.innerHTML = "♥";

    }

    /* КЛИК */

    button.addEventListener("click", () => {

      if (favorites.includes(id)) {

        favorites =
          favorites.filter(item => item !== id);

        button.classList.remove("active");
        button.innerHTML = "♡";

      } else {

        favorites.push(String(id));

        button.classList.add("active");
        button.innerHTML = "♥";

      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

    });

  });


  



}