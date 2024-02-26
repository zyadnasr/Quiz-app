// questions Array
let questions = [{question: "What is the capital of Australia?",answers: [{ text: "Shark", correct: false},{ text: "Egypt", correct: false},{ text: "Elephant", correct: false},{ text: "Canberra", correct: true},]},{question: "What is the capital of Australia?",answers: [{ text: "Shark", correct: false},{ text: "Egypt", correct: false},{ text: "Elephant", correct: false},{ text: "Canberra", correct: true},]},{question: "What is the capital of Australia?",answers: [{ text: "Shark", correct: false},{ text: "Egypt", correct: false},{ text: "Elephant", correct: false},{ text: "Canberra", correct: true},]},{question: "What is the capital of Australia?",answers: [{ text: "Shark", correct: false},{ text: "Egypt", correct: false},{ text: "Elephant", correct: false},{ text: "Canberra", correct: true},]},];



const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;
    //  answers
    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", (e)=>{
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            if(isCorrect) {
                selectedBtn.classList.add("correct");
                score++;
            }else {
                selectedBtn.classList.add("wrong");
            }
            // disable all the buttons after one click
            Array.from(answerButton.children).forEach(button => {
                if(button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
            nextButton.style.display = "block";
        })
    });
}
function resetState(){
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

// get next question 
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
        function handleNextButton() {
            currentQuestionIndex++;
            if(currentQuestionIndex < questions.length){
                showQuestion();
            }else{
                showScore();
            }
        }
    }else {
        startQuiz();
    }
});
// show score
function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} Out Of ${questions.length}!`;
    nextButton.innerHTML = "Start Over!";
    nextButton.style.display = "block";
}

startQuiz();