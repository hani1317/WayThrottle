const favoritesList =
  document.getElementById("favoritesList");

const emptyFavorites =
  document.getElementById("emptyFavorites");

/* ЗАГРУЗКА ИЗБРАННОГО */

async function loadFavorites() {

  try {

    /* ID ИЗ localStorage */

    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    /* ПУСТО */

    if (favorites.length === 0) {

      emptyFavorites.classList.remove("hidden");

      return;

    }

    emptyFavorites.classList.add("hidden");

    /* ПОЛУЧАЕМ МОТОЦИКЛЫ ИЗ БД */

    const response =
      await fetch("/api/motorcycles");

    const motorcycles =
      await response.json();

    /* ФИЛЬТРУЕМ */

    const favoriteMotorcycles =
      motorcycles.filter(bike =>
        favorites.includes(String(bike.id))
      );

    /* ВЫВОД */

    favoriteMotorcycles.forEach(bike => {

      favoritesList.innerHTML += `

        <div class="favorite-card">

          <div class="favorite-image">

            <a href="motorcycle.html?id=${bike.id}">
              <img
                src="${bike.image_url}"
                alt="${bike.name}"
              >
            </a>

          </div>

          <div class="favorite-info">

            <h2>
              ${bike.brand} ${bike.name}
            </h2>

            <p>
              ${bike.description}
            </p>

            <div class="favorite-specs">

              <span>
                ${bike.engine_volume} cc
              </span>

              <span>
                ${bike.power} л.с.
              </span>

              <span>
                ${bike.weight} кг
              </span>

            </div>

            <div class="favorite-actions">

              <a
                href="motorcycle.html?id=${bike.id}"
                class="btn"
              >
                Открыть
              </a>

              <button
                class="remove-favorite"
                data-id="${bike.id}"
              >
                Удалить
              </button>

            </div>

          </div>

        </div>

      `;

    });

  } catch (error) {

    console.error(error);

  }

}

/* УДАЛЕНИЕ */

document.addEventListener("click", (e) => {

  if (
    e.target.classList.contains("remove-favorite")
  ) {

    let favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const id =
      e.target.dataset.id;

    favorites =
      favorites.filter(item => item !== id);

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

    location.reload();

  }

});

/* ЗАПУСК */

loadFavorites();