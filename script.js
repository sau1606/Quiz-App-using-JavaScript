const questions = [
    {
        question: "Who develops this Simple Quiz App ?",
        answeers: [
            {text: "Gaurav", correct: false},
            {text: "Saurav", correct: false},
            {text: "Saurabh", correct: true},
            {text: "Tom", correct: false},
        ]
    },
    {
        question: "Which is the largest animal in the world ?",
        answeers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the small country in the world ?",
        answeers: [
            {text: "Vatican City", correct: true},
            {text: "Nepal", correct: false},
            {text: "Bhutan", correct: false},
            {text: "Sri Lanka", correct: false},
        ]
    },
    {
        question: "Which is the largest country in the world ?",
        answeers: [
            {text: "USA", correct: false},
            {text: "Europe", correct: false},
            {text: "Asia", correct: false},
            {text: "Russia", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world ?",
        answeers: [
            {text: "Australia", correct: true},
            {text: "Europe", correct: false},
            {text: "Asia", correct: false},
            {text: "Russia", correct: false},
        ]
    }
];

const quesElement = document.getElementById("question");
const ansBtn = document.getElementById("ans-btn");
const nextBtn = document.getElementById("next-btn");

let crntQuesIdx = 0;
let score = 0;

function startQuiz(){
    crntQuesIdx = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQues();
}
function showQues(){
    resetState();
    let crntQues = questions[crntQuesIdx];
    let quesNo = crntQuesIdx + 1;
    quesElement.innerHTML = quesNo + ". " + crntQues.question;

    crntQues.answeers.forEach((answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtn.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    }));
}

function resetState(){
    nextBtn.style.display = "none";
    while (ansBtn.firstChild){
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    let isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }

    Array.from(ansBtn.children).forEach((button) => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
        
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    quesElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    crntQuesIdx ++;
    if(crntQuesIdx < questions.length){
        showQues();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(crntQuesIdx < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
});

startQuiz();