// Array of questions, each with a set of answers and the index of the correct answer
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "Happy Texting Made Lively",
      "Hotdog Tacos & Marshmallows",
      "High Tea Magic Love",
    ],
    correctAnswer: 0,
  },
  {
    question: "True or False: CSS stands for Cascading Style Sheets.",
    answers: [true, false],
    correctAnswer: 0,
  },
  {
    question: "What is the main purpose of JavaScript in web development?",
    answers: [
      "Adding interactivity and dynamic behavior",
      "Styling web pages",
      "Storing and managing data",
      "Building server-side applications",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which of the following is NOT a valid HTML tag?",
    answers: ["&lt;p&gt;", "&lt;div&gt;", "&lt;br&gt;", "&lt;line&gt;"],
    correctAnswer: 3,
  },
  {
    question: "What is the difference between GET and POST HTTP methods?",
    answers: [
      "GET is for retrieving data, POST is for sending data",
      "GET has a size limit, POST does not",
      "GET is encrypted, POST is not",
      "GET is faster, POST is more secure",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is the DOM in web development?",
    answers: [
      "Document Object Model",
      "Data Obfuscation Module",
      "Database Object Management",
      "Dynamic Operation Manager",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "What is a common way to handle user logins and sessions in web apps?",
    answers: [
      "Cookies",
      "Local Storage",
      "Server-side sessions",
      "All of the above",
    ],
    correctAnswer: 3,
  },
  {
    question: "What is responsive web design (RWD)?",
    answers: [
      "Designing websites that adapt to different screen sizes",
      "Using specific fonts for mobile devices",
      "Creating separate websites for different devices",
      "Focusing on performance for mobile users",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "What is the purpose of using a web framework like React or Angular?",
    answers: [
      "Simplify common development tasks",
      "Improve performance and scalability",
      "Structure and organize code",
      "All of the above",
    ],
    correctAnswer: 3,
  },
  {
    question:
      "What is the difference between client-side and server-side web development?",
    answers: [
      "Client-side runs in the browser, server-side runs on the server",
      "Client-side handles data, server-side handles logic",
      "Client-side is user-facing, server-side is invisible",
      "All of the above",
    ],
    correctAnswer: 0,
  },
];

let currentQuestion = 0; // Index of the current question being displayed
let score = 0; // The user's current score

// Function to display the current question and options
function displayQuestion() {
  const questionContainer = document.getElementById("question"); // Get the container for the question
  questionContainer.innerHTML = ""; // Clear any previous question

  const question = questions[currentQuestion]; // Get the current question
  questionContainer.innerHTML += `<h2>${question.question}</h2>`; // Add the question text to the container

  // Add each answer option to the container
  for (let i = 0; i < question.answers.length; i++) {
    questionContainer.innerHTML += `
    <div class="answer"><label class="answer-container">
        <input type="radio" name="answer" value="${i}">
        <svg viewBox="0 0 64 64" height="2em" width="2em">
            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
        </svg>
        <p class="answer-text">${question.answers[i]}</p>
    </label></div>
`;
  }
}

// Function to handle answer selection and next question
const nextButton = document.getElementById("next-question"); // Get the button for going to the next question
nextButton.addEventListener("click", () => {
  // Add an event listener for when the button is clicked
  const selectedAnswer = document.querySelector('input[name="answer"]:checked'); // Get the selected answer
  if (!selectedAnswer) {
    // If no answer was selected, show an alert and stop the function
    alert("Please select an answer!");
    return;
  }

  const answerIndex = parseInt(selectedAnswer.value); // Get the index of the selected answer
  // If the selected answer is correct, increase the score
  if (answerIndex === questions[currentQuestion].correctAnswer) {
    score++;
  }

  currentQuestion++; // Move to the next question

  // If there are no more questions, show the result
  if (currentQuestion === questions.length) {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `<h2>Your score: ${score}/${questions.length}</h2>`;
    nextButton.disabled = true; // Disable the button
    nextButton.classList.add("hidden"); // Hide the button
  } else {
    displayQuestion(); // Otherwise, display the next question
    updateProgressBar(currentQuestion + 1, questions.length); // Update the progress bar
  }
});

// Display the first question
displayQuestion();

// Mute button
document.getElementById("mute-button").addEventListener("click", function (e) {
  var audio = document.getElementById("bg-music");

  if (audio.muted) {
    audio.muted = false;
    document
      .getElementById("mute-button-icon")
      .classList.remove("fa-volume-mute");
    document.getElementById("mute-button-icon").classList.add("fa-volume-up");
  } else {
    audio.muted = true;
    document
      .getElementById("mute-button-icon")
      .classList.remove("fa-volume-up");
    document.getElementById("mute-button-icon").classList.add("fa-volume-mute");
  }
});

function updateProgressBar(currentQuestion, totalQuestions) {
  // Calculate the width of the progress line as a percentage
  var progress = (currentQuestion / totalQuestions) * 100;

  // Update the width of the progress line
  document.getElementById("progress-line").style.width = progress + "%";

  // Update the current question text
  document.getElementById("current-question").textContent =
    "Question: " + currentQuestion + " / " + totalQuestions;
}
