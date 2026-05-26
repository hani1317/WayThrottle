fetch('http://localhost:3000/motorcycles')
  .then(res => res.json())
  .then(data => {

    console.log(data);

  });

/* =========================================
   HEADER
========================================= */

const header = document.querySelector('.header');

if (header) {

  let lastScroll = 0;

  window.addEventListener('scroll', () => {

    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {

      header.classList.add('header-hidden');

    } else {

      header.classList.remove('header-hidden');

    }

    lastScroll = currentScroll;

  });

}

/* =========================================
   LANGUAGE SWITCH
========================================= */

const langSwitch = document.querySelector('.lang-switch');

if (langSwitch) {

  langSwitch.addEventListener('click', () => {

    console.log('Переключение языка');

  });

}

/* =========================================
   TYPES PAGE SLIDER
========================================= */

const typeSlider = document.querySelector('.bike-type .slides');

if (typeSlider) {

  const slides = document.querySelectorAll('.bike-type .slide');

  const nextBtn = document.querySelector('.bike-type .right-arrow');

  const prevBtn = document.querySelector('.bike-type .left-arrow');

  let currentSlide = 0;

  function updateTypeSlider() {

    typeSlider.style.transform =
      `translateX(-${currentSlide * 100}%)`;

  }

  nextBtn.addEventListener('click', () => {

    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    updateTypeSlider();

  });

  prevBtn.addEventListener('click', () => {

    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    updateTypeSlider();

  });

}

/* =========================================
   MODELS PAGE SEARCH
========================================= */

const searchInput = document.querySelector('.search-input');

if (searchInput) {

  searchInput.addEventListener('input', () => {

    const value =
      searchInput.value.toLowerCase();

    const cards =
      document.querySelectorAll('.motorcycle-card');

    cards.forEach(card => {

      const title =
        card.querySelector('h2')
        .textContent
        .toLowerCase();

      card.style.display =
        title.includes(value)
        ? 'flex'
        : 'none';

    });

  });

}

/* =========================================
   SAFETY PAGE SLIDER
========================================= */

const safetySlider = document.querySelector('.equipment-section .slides');

if (safetySlider) {

  const groups =
    document.querySelectorAll('.slide-group');

  const leftArrow =
    document.querySelector('.equipment-section .left-arrow');

  const rightArrow =
    document.querySelector('.equipment-section .right-arrow');

  let currentGroup = 0;

  function updateSafetySlider() {

    safetySlider.style.transform =
      `translateX(-${currentGroup * 100}%)`;

  }

  function nextSlide() {

    currentGroup++;

    if (currentGroup >= groups.length) {
      currentGroup = 0;
    }

    updateSafetySlider();

  }

  function prevSlide() {

    currentGroup--;

    if (currentGroup < 0) {
      currentGroup = groups.length - 1;
    }

    updateSafetySlider();

  }

  rightArrow.addEventListener('click', nextSlide);

  leftArrow.addEventListener('click', prevSlide);

  setInterval(nextSlide, 5000);

}

/* =========================================
   GUIDE PAGE FAQ
========================================= */

const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {

  faqItems.forEach(item => {

    const question =
      item.querySelector('.faq-question');

    const button =
      item.querySelector('.faq-btn');

    question.addEventListener('click', () => {

      item.classList.toggle('active');

      button.classList.toggle('active');

    });

  });

}

/* =========================================
   TEST PAGE
========================================= */

const questions = [
  {
    question: "Где вы планируете ездить чаще всего?",
    answers: [
      { text: "В городе", type: "naked" },
      { text: "Трасса / шоссе", type: "sport" },
      { text: "Бездорожье", type: "enduro" },
      { text: "Путешествия", type: "touring" }
    ]
  },

  {
    question: "Какой у вас опыт вождения?",
    answers: [
      { text: "Новичок", type: "naked" },
      { text: "Средний", type: "sport" },
      { text: "Опытный", type: "sport" }
    ]
  },

  {
    question: "Что для вас важнее?",
    answers: [
      { text: "Скорость", type: "sport" },
      { text: "Комфорт", type: "touring" },
      { text: "Проходимость", type: "enduro" },
      { text: "Универсальность", type: "naked" }
    ]
  }
];

let currentQuestion = 0;
let answersHistory = [];

const savedState = sessionStorage.getItem("quizState");

if (savedState) {

  const parsedState = JSON.parse(savedState);

  currentQuestion = parsedState.currentQuestion;
  answersHistory = parsedState.answersHistory;

}

const startScreen = document.getElementById("startScreen");
const quizSection = document.getElementById("quizSection");
const resultSection = document.getElementById("resultSection");

const startBtn = document.getElementById("startBtn");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answersContainer");
const questionCounter = document.getElementById("questionCounter");
const backBtn = document.getElementById("backBtn");

const resultType = document.getElementById("resultType");
const resultDescription = document.getElementById("resultDescription");
const resultBikes = document.getElementById("resultBikes");

function saveQuizState() {

  sessionStorage.setItem(
    "quizState",

    JSON.stringify({
      currentQuestion,
      answersHistory
    })
  );

}

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  quizSection.classList.remove("hidden");

  showQuestion();
});

function showQuestion() {

  const question = questions[currentQuestion];

  questionCounter.innerText =
    `${currentQuestion + 1}/${questions.length}`;

  questionText.innerText = question.question;

  answersContainer.innerHTML = "";

  question.answers.forEach(answer => {

    const button = document.createElement("button");

    button.classList.add("answer-btn");

    button.innerText = answer.text;

    button.addEventListener("click", () => {

      answersHistory[currentQuestion] = answer.type;

      currentQuestion++;

      saveQuizState();

      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
      }

    });

    answersContainer.appendChild(button);

  });

}

backBtn.addEventListener("click", () => {

  if (currentQuestion > 0) {
    currentQuestion--;
    saveQuizState();
    showQuestion();
  }

});

function showResult() {

  sessionStorage.setItem("quizCompleted", "true");
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  let counts = {
    sport: 0,
    naked: 0,
    touring: 0,
    enduro: 0
  };

  answersHistory.forEach(type => {
    counts[type]++;
  });

  let finalType = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  const results = {

    sport: {
      title: "Спортбайк",
      description:
        "Вам подходят динамичные и мощные мотоциклы для скорости и активной езды.",

      bikes: [
        {
          name: "Yamaha R6",
          image: "images/r6.jpg",
          desc: "Легендарный спортбайк"
        },

        {
          name: "Kawasaki Ninja 650",
          image: "images/ninja650.jpg",
          desc: "Универсальный спортбайк"
        }
      ]
    },

    naked: {
      title: "Нейкед",
      description:
        "Вы предпочитаете универсальные мотоциклы для города и повседневной езды.",

      bikes: [
        {
          name: "Yamaha MT-07",
          image: "images/mt07.jpg",
          desc: "Идеальный городской нейкед"
        },

        {
          name: "Honda CB650R",
          image: "images/cb650r.jpg",
          desc: "Стиль и комфорт"
        }
      ]
    },

    touring: {
      title: "Туристический",
      description:
        "Вам подойдут комфортные модели для дальних поездок.",

      bikes: [
        {
          name: "BMW GS 1250",
          image: "images/gs.jpg",
          desc: "Для дальних путешествий"
        }
      ]
    },

    enduro: {
      title: "Эндуро",
      description:
        "Вы предпочитаете бездорожье и активную езду вне асфальта.",

      bikes: [
        {
          name: "KTM EXC 300",
          image: "images/ktm.jpg",
          desc: "Настоящий эндуро"
        }
      ]
    }

  };

  const result = results[finalType];

  resultType.innerText = result.title;
  resultDescription.innerText = result.description;

  resultBikes.innerHTML = "";

  result.bikes.forEach(bike => {

    const bikeCard = document.createElement("div");

    bikeCard.classList.add("bike-card");

    bikeCard.innerHTML = `
      <img src="${bike.image}" alt="${bike.name}">

      <div class="bike-info">

        <h4>${bike.name}</h4>

        <p>${bike.desc}</p>

        <div class="bike-actions">

          <button>♡ Избранное</button>

          <button> ⚖ Сравнить</button>

          <a href="bike.html">Открыть</a>

        </div>

      </div>
    `;

    resultBikes.appendChild(bikeCard);

  });

}

document.getElementById("restartBtn").addEventListener("click", () => {

  sessionStorage.removeItem("quizState");
  sessionStorage.removeItem("quizCompleted");

  currentQuestion = 0;
  answersHistory = [];

  resultSection.classList.add("hidden");
  quizSection.classList.add("hidden");

  startScreen.classList.remove("hidden");

});

const quizCompleted =
  sessionStorage.getItem("quizCompleted");

if (quizCompleted === "true") {

  startScreen.classList.add("hidden");
  quizSection.classList.add("hidden");

  showResult();

} else if (answersHistory.length > 0) {

  startScreen.classList.add("hidden");
  quizSection.classList.remove("hidden");

  showQuestion();

}


