const btnStart = document.querySelector('.click-start');
const question = document.querySelector('.row-question h1');
const btnAnswer = document.querySelectorAll('.btn');
const playerScore = document.querySelector('.span-score');
const container = document.querySelector('.container')

const btn1 = document.querySelector('.row-btn1')
const btn2 = document.querySelector('.row-btn2')
const btn3 = document.querySelector('.row-btn3')
const btn4 = document.querySelector('.row-btn4')


const rowStart = document.querySelector('.row-start');
const nextQuestion= document.querySelector('.next-question')
nextQuestion.addEventListener('click', changeQuestion);
btnStart.addEventListener('click', startQuestion);


let currentQuestion = -1;
let numHold = 4;
let yourScore = 0;


// This is where the choices get text
function assignLetter(){
    btn1.innerHTML = choices[currentQuestion].choice1;
    btn2.innerHTML = choices[currentQuestion].choice2;
    btn3.innerHTML = choices[currentQuestion].choice3;
    btn4.innerHTML = choices[currentQuestion].choice4;
}

// Answer of user
btnAnswer.forEach(function(choice, index){
    choice.addEventListener('click',function(){
        // console.log(index)
        if(choice.innerHTML === choices[currentQuestion].ans)
        {
            messageCorrect()
            yourScore++;
            playerScore.innerHTML = yourScore;
            btnAnswer.forEach(function(col){
                col.style.background = 'red'
            })
            choice.style.background = 'green'
        }
        else
        {
            messageWrong()
            changeColor(choice)
        }
        others()
    })
})

// Pop up message CORRECT OR WRONG
const message = document.querySelector('.row-message');
const rowAnimation = document.querySelector('.row-animation-answer');

function messageCorrect()
{
    message.innerHTML = 'Correct';
    message.style.color = 'green';
    const popupGif = `
        <img class="column-correct column-anim" src="correct2.gif" alt="correct">
    `
    rowAnimation.innerHTML = popupGif;
}

// Message Wrong
function messageWrong()
{
    message.innerHTML = 'Wrong';
    message.style.color = 'red';
    const popupGif = `
        <img class="column-wrong column-anim" src="sad.gif" alt="wrong">
    `
    rowAnimation.innerHTML = popupGif;
}
// The Start Button

function startQuestion(){
    btnStart.style.transform = 'scale(1,0)'
    btnStart.addEventListener('transitionend', function(){
        rowStart.style.display = 'none';
        container.style.pointerEvents = 'unset'
        changeQuestion();
    })
}

// Changing the question -- Next button
const rowPopupScore = document.querySelector('.row-popup-score')

function changeQuestion()
{
    currentQuestion++;
    if(currentQuestion === choices.length -1)
    {
        nextQuestion.innerText = 'Finish';
    }
    if(currentQuestion === choices.length)
    {
        currentQuestion=choices.length -1;
        finalScore()

    }
    question.innerHTML = choices[currentQuestion].question;
    message.innerHTML = "";
    rowAnimation.innerHTML = "";
    assignLetter();
    resetColor()

}


// Change all color when wrong

function changeColor(btn)
{
    btnAnswer.forEach(function(btn){
        const bb = btn.innerHTML;
        const ansChecker = choices[currentQuestion].ans;
        if(bb.includes(ansChecker)){
            btn.style.backgroundColor = 'green';
        }
        else{
            btn.style.backgroundColor = 'red';
        }
    })
}

// Pointer events none when the user click the answer
function others()
{
    nextQuestion.style.pointerEvents = 'unset';
    nextQuestion.style.backgroundColor = 'rgba(9, 223, 223, 0.9)';

    btnAnswer.forEach(function(btnAll){
        btnAll.style.pointerEvents = 'none';
    })

}

// Back to colors when click next
function resetColor()
{
    nextQuestion.style.pointerEvents = 'none';
    nextQuestion.style.backgroundColor = 'rgba(71, 94, 94, 0.9)';

    btnAnswer.forEach(function(btnAll){
        btnAll.style.pointerEvents = 'unset';
        btnAll.style.background = 'rgb(17, 198, 253)';
    })

}
// Popup Score
function finalScore()
{
    const popUp = `
    <div class="row-final-score">
        <img  class="confetti confetti-1" src="fireworks.gif" alt="confetti">
        <img  class="confetti confetti-2" src="fireworks.gif" alt="confetti">
        <img  class="confetti confetti-3" src="confetti.gif" alt="confetti">
        <img  class="confetti confetti-4" src="confetti.gif" alt="confetti">
        <h1>Your Score is: ${yourScore} / ${choices.length}</h1>
        <button class="column-btn btn-restart">Restart</button>
    </div>
    `
    rowPopupScore.innerHTML = popUp;
}

// Restart button
rowPopupScore.addEventListener('click', function(e){
    const btnRest = e.target
    if(btnRest.classList[1] == 'btn-restart')
    {
        location.reload();
    }
})