// script.js

const questions = [
    // Example questions
    { 
        question: "What is the capital of France?", 
        options: ["Berlin", "Madrid", "Paris", "Rome"], 
        answer: 2 
    },
    // Add more questions here
];

let selectedQuestions = [];
let userAnswers = [];
let timer;

function startQuiz() {
    // Randomly select 30 questions
    selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 30);
    const quizDiv = document.getElementById('quiz');

    selectedQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        
        q.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.innerHTML = `
                <input type="radio" name="question${index}" value="${i}"> ${option}
            `;
            questionDiv.appendChild(optionElement);
        });

        quizDiv.appendChild(questionDiv);
    });

    // Start the timer
    startTimer(15 * 60, document.getElementById('timer'));
}

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "Time Left: " + minutes + ":" + seconds;

        if (--timer < 0) {
            submitQuiz();
        }
    }, 1000);
}

function submitQuiz() {
    selectedQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            userAnswers.push(parseInt(selectedOption.value));
        } else {
            userAnswers.push(null); // No answer selected
        }
    });

    calculateResult();
}

function calculateResult() {
    let score = 0;

    selectedQuestions.forEach((q, index) => {
        if (userAnswers[index] === q.answer) {
            score++;
        }
    });

    document.getElementById('result').textContent = `Your score is ${score} out of 30`;
}

// Start the quiz when the page loads
window.onload = startQuiz;
