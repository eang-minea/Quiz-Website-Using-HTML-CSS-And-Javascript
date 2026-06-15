// =========================
// QUIZ ARENA 3D - SCRIPT.JS
// =========================

const questions = [

{
  question:"What does HTML stand for?",
  answer:"Hyper Text Markup Language",
  options:[
    "Hyper Text Markup Language",
    "Home Tool Markup Language",
    "High Transfer Mark Language",
    "Hyperlinks Text Mark Language"
  ]
},

{
  question:"CSS is used for?",
  answer:"Styling",
  options:[
    "Database",
    "Styling",
    "Logic",
    "Hardware"
  ]
},

{
  question:"JavaScript is a?",
  answer:"Programming language",
  options:[
    "Programming language",
    "Database",
    "OS",
    "Design tool"
  ]
},

{
  question:"Which runs in browser?",
  answer:"JavaScript",
  options:[
    "C++",
    "Python",
    "JavaScript",
    "Java"
  ]
},

{
  question:"React is?",
  answer:"Frontend library",
  options:[
    "Backend",
    "Frontend library",
    "Database",
    "OS"
  ]
},

{
  question:"Which HTML tag creates a hyperlink?",
  answer:"<a>",
  options:[
    "<a>",
    "<link>",
    "<href>",
    "<url>"
  ]
},

{
  question:"What does CSS stand for?",
  answer:"Cascading Style Sheets",
  options:[
    "Creative Style System",
    "Computer Style Sheets",
    "Cascading Style Sheets",
    "Colorful Style Sheets"
  ]
},

{
  question:"Which CSS property changes text color?",
  answer:"color",
  options:[
    "font-color",
    "text-color",
    "color",
    "background-color"
  ]
},

{
  question:"Which JavaScript function displays a popup?",
  answer:"alert()",
  options:[
    "message()",
    "show()",
    "popup()",
    "alert()"
  ]
},

{
  question:"Which company created React?",
  answer:"Facebook",
  options:[
    "Google",
    "Microsoft",
    "Facebook",
    "Apple"
  ]
}

];

// =========================
// ELEMENTS
// =========================

const menu =
document.querySelector(".menu");

const quiz =
document.querySelector(".quiz");

const result =
document.querySelector(".result");

const playBtn =
document.querySelector(".play");

const restartBtn =
document.querySelector(".restart");

const nextBtn =
document.querySelector(".next");

const questionEl =
document.querySelector(".question");

const optionsEl =
document.querySelector(".options");

const scoreEl =
document.querySelector(".score");

const progressText =
document.querySelector(".progress-text");

const progressBar =
document.querySelector(".progress-bar");

const percentEl =
document.querySelector(".percent");

const messageEl =
document.querySelector(".message");

// =========================
// STATE
// =========================

let currentQuestion = 0;
let score = 0;

// =========================
// START GAME
// =========================

playBtn.onclick = startGame;
restartBtn.onclick = startGame;

function startGame(){

  currentQuestion = 0;
  score = 0;

  scoreEl.textContent = "⭐ 0";

  shuffleQuestions();

  menu.classList.remove("active");
  result.classList.remove("active");

  quiz.classList.add("active");

  loadQuestion();
}

// =========================
// SHUFFLE
// =========================

function shuffleQuestions(){

  questions.sort(
    () => Math.random() - 0.5
  );
}

// =========================
// LOAD QUESTION
// =========================

function loadQuestion(){

  nextBtn.disabled = true;

  const q =
  questions[currentQuestion];

  questionEl.textContent =
  q.question;

  progressText.textContent =
  `${currentQuestion + 1} / ${questions.length}`;

  progressBar.style.width =
  `${((currentQuestion+1)/questions.length)*100}%`;

  optionsEl.innerHTML = "";

  q.options.forEach(option => {

    const div =
    document.createElement("div");

    div.className = "option";

    div.textContent = option;

    div.onclick = () =>
    selectAnswer(div, option);

    optionsEl.appendChild(div);

  });
}

// =========================
// ANSWER
// =========================

function selectAnswer(
  element,
  selected
){

  const q =
  questions[currentQuestion];

  document
  .querySelectorAll(".option")
  .forEach(option => {

    option.style.pointerEvents =
    "none";

  });

  nextBtn.disabled = false;

  if(selected === q.answer){

    element.classList.add(
      "correct"
    );

    score++;

  }else{

    element.classList.add(
      "wrong"
    );

    document
    .querySelectorAll(".option")
    .forEach(option => {

      if(
        option.textContent ===
        q.answer
      ){
        option.classList.add(
          "correct"
        );
      }

    });

  }

  scoreEl.textContent =
  `⭐ ${score}`;
}

// =========================
// NEXT
// =========================

nextBtn.onclick = () => {

  currentQuestion++;

  if(
    currentQuestion <
    questions.length
  ){

    loadQuestion();

  }else{

    showResult();

  }

};

// =========================
// RESULT
// =========================

function showResult(){

  quiz.classList.remove(
    "active"
  );

  result.classList.add(
    "active"
  );

  const percent =
  Math.round(
    (score/questions.length)
    *100
  );

  animateCircle(percent);

  let message = "";

  if(percent === 100){

    message =
    "🏆 Legendary! Perfect Score";

  }else if(percent >= 80){

    message =
    "🔥 Excellent Work";

  }else if(percent >= 60){

    message =
    "✨ Great Job";

  }else if(percent >= 40){

    message =
    "👍 Good Try";

  }else{

    message =
    "💪 Keep Practicing";
  }

  messageEl.innerHTML =
  `
  ${message}
  <br><br>
  Score:
  ${score}/${questions.length}
  `;

  if(percent >= 80){

    setTimeout(() => {

      launchFireworks();

    },500);

  }

}

// =========================
// CIRCLE ANIMATION
// =========================

function animateCircle(target){

  let current = 0;

  const timer =
  setInterval(() => {

    current++;

    percentEl.textContent =
    current + "%";

    const deg =
    current * 3.6;

    document
    .querySelector(".circle")
    .style.background =
    `conic-gradient(
      #7c3aed 0deg,
      #06b6d4 ${deg/2}deg,
      #ec4899 ${deg}deg,
      rgba(255,255,255,.08) ${deg}deg
    )`;

    if(current >= target){

      clearInterval(timer);

    }

  },15);

}

// =========================
// FIREWORKS
// =========================

function launchFireworks(){

  const container =
  document.getElementById(
    "fireworks"
  );

  for(
    let i=0;
    i<180;
    i++
  ){

    const particle =
    document.createElement(
      "div"
    );

    particle.className =
    "firework";

    particle.style.left =
    Math.random() *
    window.innerWidth +
    "px";

    particle.style.top =
    Math.random() *
    window.innerHeight +
    "px";

    particle.style.background =
    `hsl(
      ${Math.random()*360},
      100%,
      60%
    )`;

    particle.style.setProperty(
      "--x",
      `${
        (Math.random()-0.5)
        *500
      }px`
    );

    particle.style.setProperty(
      "--y",
      `${
        (Math.random()-0.5)
        *500
      }px`
    );

    container.appendChild(
      particle
    );

    setTimeout(() => {

      particle.remove();

    },1000);

  }

}