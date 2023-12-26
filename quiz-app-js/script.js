const questions = [
    {
        question: 'Which is the largest animal in the world?',
        answers: [
            {text: 'Shark', correct: false},
            {text: 'Blue whale', correct: true},
            {text: 'Elephant', correct: false},
            {text: 'Giraffe', correct: false}
        ]
    },
    {
        question: 'What is the capital of France?',
        answers: [
            {text: 'Berlin', correct: false},
            {text: 'Madrid', correct: false},
            {text: 'Paris', correct: true},
            {text: 'Rome', correct: false}
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            {text: 'Venus', correct: false},
            {text: 'Jupiter', correct: false},
            {text: 'Mars', correct: true},
            {text: 'Saturn', correct: false}
        ]
    },
    {
        question: 'Who wrote the play "Romeo and Juliet"?',
        answers: [
            {text: 'William Shakespeare', correct: true},
            {text: 'Charles Dickens', correct: false},
            {text: 'Jane Austen', correct: false},
            {text: 'Mark Twain', correct: false}
        ]
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: [
            {text: 'Mars', correct: false},
            {text: 'Jupiter', correct: true},
            {text: 'Earth', correct: false},
            {text: 'Saturn', correct: false}
        ]
    },
    {
        question: 'Which country is known as the Land of the Rising Sun?',
        answers: [
            {text: 'China', correct: false},
            {text: 'South Korea', correct: false},
            {text: 'Japan', correct: true},
            {text: 'Vietnam', correct: false}
        ]
    },
    {
        question: 'Who painted the Mona Lisa?',
        answers: [
            {text: 'Vincent van Gogh', correct: false},
            {text: 'Pablo Picasso', correct: false},
            {text: 'Leonardo da Vinci', correct: true},
            {text: 'Michelangelo', correct: false}
        ]
    },
    {
        question: 'Which element has the chemical symbol "H"?',
        answers: [
            {text: 'Helium', correct: false},
            {text: 'Hydrogen', correct: true},
            {text: 'Hafnium', correct: false},
            {text: 'Holmium', correct: false}
        ]
    },
    {
        question: 'What is the capital of Australia?',
        answers: [
            {text: 'Melbourne', correct: false},
            {text: 'Sydney', correct: false},
            {text: 'Canberra', correct: true},
            {text: 'Brisbane', correct: false}
        ]
    },
    {
        question: 'Which is the longest river in the world?',
        answers: [
            {text: 'Amazon', correct: true},
            {text: 'Nile', correct: false},
            {text: 'Mississippi', correct: false},
            {text: 'Yangtze', correct: false}
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

const resetState = () => {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

const selectAnswer = (event) => {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
};

const showQuestion = () => {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex;
    questionElement.innerHTML = `${questionNumber + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
};

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
};

const showScore = () => {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
};

const handleNextButton = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();