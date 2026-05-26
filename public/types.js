const typesContainer =
  document.getElementById('typesContainer');

async function loadTypes() {

  try {

    const response =
      await fetch('/api/types');

    const types = await response.json();

    renderTypes(types);

  } catch (error) {

    console.error('Ошибка загрузки:', error);

  }

}

function renderTypes(types) {

  typesContainer.innerHTML = '';

  types.forEach(type => {

    const section = document.createElement('section');

    section.classList.add('bike-type');

    section.innerHTML = `

      <div class="bike-type-content">

        <div class="bike-text">

          <h2>${type.name}</h2>

          <p>${type.description}</p>

          <a href="models.html?type=${type.id}"
             class="btn">

            Перейти к моделям

          </a>

        </div>

      </div>

    `;

    typesContainer.appendChild(section);

  });

}

loadTypes();