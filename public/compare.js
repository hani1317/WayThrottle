const compareContent =
  document.getElementById("compareContent");

const emptyCompare =
  document.getElementById("emptyCompare");

/* ЗАГРУЗКА */

async function loadCompare() {

  try {

    const compare =
      JSON.parse(localStorage.getItem("compare")) || [];

    /* ПУСТО */

    if (compare.length === 0) {

      emptyCompare.classList.remove("hidden");

      return;

    }

    emptyCompare.classList.add("hidden");

    /* API */

    const response =
      await fetch("http://localhost:3000/api/motorcycles");

    const motorcycles =
      await response.json();

    const typesResponse =
      await fetch("http://localhost:3000/api/types");

    const types =
      await typesResponse.json();

      console.log(motorcycles);

    /* ФИЛЬТР */

    const compareBikes =
      motorcycles.filter(bike =>
        compare.includes(String(bike.id))
      );

      if (compareBikes.length === 0) {

      emptyCompare.classList.remove("hidden");

      compareContent.innerHTML = "";

     return;

    }

    /* TOP */

    let topHTML = `
      <div class="compare-top">
    `;

    compareBikes.forEach(bike => {

      topHTML += `

        <div class="compare-bike">

          <img
            src="${bike.image_url}"
            alt="${bike.name}"
            loading="lazy"
          >

          <h2>
            ${bike.brand}
          </h2>

          <h3>
            ${bike.name}
          </h3>

          <button
            class="remove-compare"
            data-id="${bike.id}"
          >
             Удалить
          </button>

        </div>

      `;

    });

    topHTML += `</div>`;

    /* TABLE */

    const specs = [

      {
        label: "Тип",
        key: "type_id"
      },

      {
        label: "Объем двигателя",
        key: "engine_volume",
        suffix: " cc"
      },

      {
        label: "Мощность",
        key: "power",
        suffix: " л.с."
      },

      {
        label: "Вес",
        key: "weight",
        suffix: " кг"
      },

      {
        label: "Высота сиденья",
        key: "seat_height",
        suffix: " мм"
      },

      {
        label: "Цена",
        key: "price",
        suffix: " $"
      },

      {
        label: "Год",
        key: "year"
      },

      {
        label: "Бак",
        key: "fuel_capacity",
        suffix: " л"
      },

      {
        label: "Страна",
        key: "country"
      }

    ];

    let tableHTML = `
      <div class="compare-table">
    `;

    specs.forEach(spec => {

      tableHTML += `
        <div class="compare-row">
      `;

      tableHTML += `
        <div class="compare-label">
          ${spec.label}
        </div>
      `;

    compareBikes.forEach(bike => {
      let value = bike[spec.key];
      if (spec.key === "type_id") {
        const type = types.find(
          t => t.id === bike.type_id
        );
        
        value = type
         ? type.name
         : "-";
      }

      tableHTML += `
        <div class="compare-value">

          ${value ?? "-"}

          ${spec.suffix || ""}

        </div>
      `;

    });

      tableHTML += `</div>`;

    });

    tableHTML += `</div>`;

    compareContent.innerHTML =
      topHTML + tableHTML;

  }

  catch(error) {

    console.error(error);

  }

}

/* REMOVE */

document.addEventListener("click", (e) => {

  if (
    e.target.classList.contains("remove-compare")
  ) {

    let compare =
      JSON.parse(localStorage.getItem("compare")) || [];

    const id =
      e.target.dataset.id;

    compare =
      compare.filter(item => item !== id);

    localStorage.setItem(
      "compare",
      JSON.stringify(compare)
    );

    location.reload();

  }

});

/* START */

loadCompare();