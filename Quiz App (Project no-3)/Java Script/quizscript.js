let currentQuestion = 0;
let score = 0;
let timeinterval;

const questions = [
    {                   // this is my 3rd categery questions here...
        question:" Question 1: What is the correct way to declare a variable in JavaScript?",
        answers: [
            "var x = 10;", 
            "variable x = 10;", 
            "x = 10;", 
            "let x = 10;"],

        correctAnswer: "let x = 10;"
    },
    {
        question: "Question 2: Which of the following is NOT a valid JavaScript data type?",
        answers: ["Boolean", "String", "Float", "Array"],
        correctAnswer: "Float"
    },
    {
        question: "Question 3:What does the === operator do in JavaScript?",
        answers: [
            "Assigns a value to a variable", 
            "Checks for equality without type conversion", 
            "Converts the type of the variable", 
            "None of the above"],

        correctAnswer: "Checks for equality without type conversion"
    },
    {
        question: "Question 4: Which built-in method is used to join elements of an array into a string?",
        answers: [
            "concat()", 
            " join()", 
            "push()", 
            "toString()"],

        correctAnswer: " join()"
    },
    {
        question: "Question 5: What is the correct way to write an IF statement in JavaScript?",
        answers: [
            "if (x == 5) { }", 
            " if x == 5 then { }", 
            " if x = 5 { }", 
            "if x = 5 then { }"],

        correctAnswer: "if (x == 5) { }"
    },
    {
        question: "Question 6: Which function is used to print text in the browser console in JavaScript?",
        answers: [
            "console.log()", 
            "print()", 
            "log()", 
            "document.write()"],

        correctAnswer: "console.log()"
    },
    {
        question: "Question 7: What does the typeof operator return when used with a function?",
        answers: ["function", "object", "undefined", "string"],
        correctAnswer: "function"
    },
    {
        question: "Question 8: How do you define a function in JavaScript?",
        answers: [
            "function myFunction() { }", 
            "myFunction = function() { }", 
            "define myFunction() { }", 
            "myFunction() { }"],

        correctAnswer: "function myFunction() { }"
    },
    {
        question: "Question 9: What will the following code output: console.log (2 + 2)?",
        answers: ["4", "22", "22", "NaN"],
        correctAnswer: "4"
    },
    {
        question: "Question 10: What method is used to remove the last element from an array and return that element?",
        answers: [
            "pop()", 
            " shift()", 
            "slice()", 
            "removeLast()"],

        correctAnswer: "pop()"
    }
];
            // this is my 3rd categery script code here...
function checkAnswer(btn) {
    const selectedAnswer = btn.textContent;
    const correctAnswer = questions[currentQuestion].correctAnswer;
    const answerButtons = document.querySelectorAll('.btn');

    if (selectedAnswer === correctAnswer) {
        score++;
        document.querySelector('.score').textContent = score;
        btn.style.backgroundColor = 'green';
    } else {
        for (let i = 0; i < answerButtons.length; i++) {
            if (answerButtons[i].textContent === correctAnswer) {
                answerButtons[i].style.backgroundColor = 'green';
            }
        }
        btn.style.backgroundColor = 'red';
    }

    // Disable buttons after an answer is selected
    answerButtons.forEach(button => {
        button.disabled = true;
    });
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        const questionElement = document.getElementById('question');
        questionElement.textContent = `${questions[currentQuestion].question}`;
        const answerButtons = document.querySelectorAll('.btn');
        for (let i = 0; i < answerButtons.length; i++) {
            answerButtons[i].textContent = questions[currentQuestion].answers[i];
            answerButtons[i].style.backgroundColor = '';
            answerButtons[i].disabled = false;
        }
        // Update the progress
        updateProgress();
        // Reset the timer
        clearInterval(timeinterval);
        startTimer(10);
    } else {
        // Construct the result URL with query parameters
        const totalTime = 10 * (currentQuestion + 1); // Assuming each question takes 10 seconds
        const totalQuestions = questions.length;
        const attemptedQuestions = currentQuestion + 1;
        const passFail = score >= totalQuestions / 2 ? 'Pass' : 'Fail';
        const correctAnswers = score;
        const wrongAnswers = totalQuestions - score;
        const percentage = ((score / totalQuestions) * 100).toFixed(2) + '%';
        const resultUrl = `quizresult.html?totalTime=${totalTime}&totalQuestions=${totalQuestions}&attemptedQuestions=${attemptedQuestions}&passFail=${passFail}&correctAnswers=${correctAnswers}&wrongAnswers=${wrongAnswers}&percentage=${percentage}`;
        // Redirect to the result page
        window.location.href = resultUrl;
    }
}
function updateProgress() {
    const progressElement = document.getElementById('progress');
    progressElement.textContent = `${currentQuestion + 1}/${questions.length}`;
}

function startTimer(duration) {
    let timeleft = duration;
    const timer = document.getElementById('timer');
    timer.textContent = `${timeleft}`;
    timeleft--;
    timeinterval = setInterval(function() {
        if (timeleft > 0) {
            timer.textContent = `${timeleft}`;
            timeleft--;
        } else {
            clearInterval(timeinterval);
            timer.innerHTML = `Time's up`;
            nextQuestion();
        }
    }, 1000);
}

updateProgress();
startTimer(10);
