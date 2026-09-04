const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        correct: 0,
        category: "technology",
        difficulty: "easy"
    },

    {
        question: "Which language is used to style web pages?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        correct: 1,
        category: "technology",
        difficulty: "easy"
    },

    {
        question: "Which language is mainly used to make web pages interactive?",
        answers: [
            "CSS",
            "HTML",
            "JavaScript",
            "SQL"
        ],
        correct: 2,
        category: "technology",
        difficulty: "medium"
    },

    {
        question: "What is the largest planet in our Solar System?",
        answers: [
            "Earth",
            "Mars",
            "Jupiter",
            "Venus"
        ],
        correct: 2,
        category: "science",
        difficulty: "easy"
    },

    {
        question: "What gas do plants mainly absorb from the atmosphere?",
        answers: [
            "Oxygen",
            "Carbon Dioxide",
            "Nitrogen",
            "Hydrogen"
        ],
        correct: 1,
        category: "science",
        difficulty: "easy"
    },

    {
        question: "What is the chemical symbol for water?",
        answers: [
            "CO2",
            "O2",
            "H2O",
            "NaCl"
        ],
        correct: 2,
        category: "science",
        difficulty: "easy"
    },

    {
        question: "Which is the largest ocean on Earth?",
        answers: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Arctic Ocean",
            "Pacific Ocean"
        ],
        correct: 3,
        category: "general",
        difficulty: "medium"
    },

    {
        question: "How many continents are there?",
        answers: [
            "5",
            "6",
            "7",
            "8"
        ],
        correct: 2,
        category: "general",
        difficulty: "easy"
    },

    {
        question: "Which device is used to measure temperature?",
        answers: [
            "Barometer",
            "Thermometer",
            "Speedometer",
            "Hygrometer"
        ],
        correct: 1,
        category: "science",
        difficulty: "medium"
    },

    {
        question: "Which technology is used to structure the content of a webpage?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "Git"
        ],
        correct: 0,
        category: "technology",
        difficulty: "hard"
    }
];


// HTML elements

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const categorySelect = document.getElementById("category");
const difficultySelect = document.getElementById("difficulty");

const questionNumber = document.getElementById("questionNumber");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");

const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");

const finalScore = document.getElementById("finalScore");
const totalQuestions = document.getElementById("totalQuestions");
const resultMessage = document.getElementById("resultMessage");


// Quiz variables

let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = false;
let timer;
let timeLeft = 15;


// Shuffle array

function shuffle(array) {

    return array.sort(function() {
        return Math.random() - 0.5;
    });

}


// Start quiz

startBtn.addEventListener("click", function() {

    const selectedCategory = categorySelect.value;
    const selectedDifficulty = difficultySelect.value;

    quizQuestions = questions.filter(function(question) {

        const categoryMatch =
            selectedCategory === "all" ||
            question.category === selectedCategory;

        const difficultyMatch =
            selectedDifficulty === "all" ||
            question.difficulty === selectedDifficulty;

        return categoryMatch && difficultyMatch;
    });


    if (quizQuestions.length === 0) {

        alert("No questions found for these settings.");

        return;
    }


    // Randomize questions

    quizQuestions = shuffle([...quizQuestions]);


    currentQuestion = 0;
    score = 0;


    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");


    showQuestion();
});


// Show question

function showQuestion() {

    clearInterval(timer);

    selectedAnswer = false;

    nextBtn.disabled = true;

    const current = quizQuestions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    questionElement.textContent = current.question;

    progressBar.style.width =
        `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;


    answersElement.innerHTML = "";


    current.answers.forEach(function(answer, index) {

        const button = document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.addEventListener("click", function() {
            selectAnswer(index, button);
        });

        answersElement.appendChild(button);
    });


    startTimer();
}


// Select answer

function selectAnswer(selectedIndex, selectedButton) {

    if (selectedAnswer) {
        return;
    }

    selectedAnswer = true;

    const current = quizQuestions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer-btn");


    buttons.forEach(function(button) {
        button.disabled = true;
    });


    if (selectedIndex === current.correct) {

        selectedButton.classList.add("correct");

        score++;

    } else {

        selectedButton.classList.add("wrong");

        buttons[current.correct].classList.add("correct");
    }


    clearInterval(timer);

    nextBtn.disabled = false;
}


// Timer

function startTimer() {

    timeLeft = 15;

    timerElement.textContent = `${timeLeft}s`;


    timer = setInterval(function() {

        timeLeft--;

        timerElement.textContent = `${timeLeft}s`;


        if (timeLeft <= 0) {

            clearInterval(timer);

            if (!selectedAnswer) {

                selectedAnswer = true;

                const current = quizQuestions[currentQuestion];

                const buttons =
                    document.querySelectorAll(".answer-btn");

                buttons.forEach(function(button) {
                    button.disabled = true;
                });

                buttons[current.correct].classList.add("correct");

                nextBtn.disabled = false;
            }
        }

    }, 1000);
}


// Next question

nextBtn.addEventListener("click", function() {

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {

        showQuestion();

    } else {

        showResult();
    }
});


// Show result

function showResult() {

    clearInterval(timer);

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScore.textContent = score;
    totalQuestions.textContent = quizQuestions.length;


    const percentage =
        (score / quizQuestions.length) * 100;


    if (percentage === 100) {

        resultMessage.textContent =
            "Excellent! You got every question correct! 🏆";

    } else if (percentage >= 70) {

        resultMessage.textContent =
            "Great job! You have a strong score! 🎉";

    } else if (percentage >= 50) {

        resultMessage.textContent =
            "Good effort! Keep practicing! 👍";

    } else {

        resultMessage.textContent =
            "Keep learning and try again! 💪";
    }
}


// Restart quiz

restartBtn.addEventListener("click", function() {

    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

});