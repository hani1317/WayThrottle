const params = new URLSearchParams(window.location.search);

const motorcycleId = params.get('id');

async function loadMotorcycle() {

  try {

    const response = await fetch(
      `http://localhost:3000/api/motorcycles/${motorcycleId}`
    );

    const bike = await response.json();

    document.getElementById('motorcycleName').textContent =
      bike.name;

    document.getElementById('motorcycleBrand').textContent =
      bike.brand;

    document.getElementById('motorcycleDescription').textContent =
      bike.description;

    document.getElementById('motorcyclePrice').textContent =
      `${Number(bike.price).toLocaleString()} $`;

    document.getElementById('motorcycleImage').src =
      bike.image_url;

    document.getElementById('engineVolume').textContent =
      `${bike.engine_volume} cc`;

    document.getElementById('power').textContent =
      `${bike.power} л.с.`;

    document.getElementById('weight').textContent =
      `${bike.weight} кг`;

    document.getElementById('seatHeight').textContent =
      `${bike.seat_height} мм`;

    document.getElementById('fuelCapacity').textContent =
      `${bike.fuel_capacity} л`;

    document.getElementById('country').textContent =
      bike.country;

    compareBtn.dataset.id = bike.id;

    updateCompareButton(bike.id);



  } catch (error) {

    console.error(error);

  }

}

loadMotorcycle();

/* ========================================
   COMPARE
======================================== */

const compareBtn =
  document.getElementById("compareBtn");

function updateCompareButton(id) {

  let compare =
    JSON.parse(localStorage.getItem("compare")) || [];

  if (compare.includes(String(id))) {

    compareBtn.classList.add("active");

    compareBtn.textContent =
      "В сравнении";

  }

  else {

    compareBtn.classList.remove("active");

    compareBtn.textContent =
      "Сравнить";

  }

}

if (compareBtn) {

  compareBtn.addEventListener("click", () => {

    const motorcycleId =
      compareBtn.dataset.id;

    let compare =
      JSON.parse(localStorage.getItem("compare")) || [];

    if (compare.includes(String(motorcycleId))) {

      compare =
        compare.filter(
          id => id !== String(motorcycleId)
        );

    }

    else {

      compare.push(String(motorcycleId));

    }

    localStorage.setItem(
      "compare",
      JSON.stringify(compare)
    );

    updateCompareButton(motorcycleId);

  });

}