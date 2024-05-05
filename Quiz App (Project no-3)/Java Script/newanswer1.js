let currentQuestion = 0;
let score = 0;
let timeinterval;

const questions = [   // this is my 2nd categery questions...
    {
        question: "Question 1: Which CSS property is used to change the text color of an element?",
        answers: ["text-color", "color", "text-style", "font-color"],
        correctAnswer: "color"
    },
    {
        question: "Question 2: How can you include CSS in your HTML document?",
        answers: [
            "Using the <style> element within the <head> section",
            "Using the <link> element within the <body> section",
            "Using the <css> element within the <head> section",
            "Using the <script> element within the <head> section"],

        correctAnswer: "Using the <style> element within the <head> section"
    },
    {
        question: "Question 3: Which CSS property is used to set the background color of an element?",
        answers: [
            "bgcolor",
            "background-color",
            "color",
            "background"],

        correctAnswer: "background-color"
    },
    {
        question: "Question 4: What does CSS stand for?",
        answers: [
            "Creative Style Sheets", 
            "Cascading Style Sheets", 
            "Centralized Style Sheets", 
            "Computerized Style Sheets"],

        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "Question 5: How do you select all paragraphs on a page using CSS?",
        answers: [
            "p", 
            "paragraph", 
            "#paragraph", 
            ".paragraph"],

        correctAnswer: "p"
    },
    {
        question: "Question 6: How do you select an element with the class name example in CSS?",
        answers: [
            ".example", 
            "#example", 
            "<example>", 
            "example"],

        correctAnswer: ".example"
    },
    {
        question: "Question 7: Which CSS property is used to control the spacing between lines of text?",
        answers: [
            "spacing", 
            "line-height", 
            "line-spacing", 
            "text-spacing"],

        correctAnswer: "line-height"
    },
    {
        question: "Question 8: Which CSS property is used to make text bold?",
        answers: [
            "font-style", 
            "bold", 
            "text-style", 
            "font-weight"],

        correctAnswer: "font-weight"
    },
    {
        question: "Question 9: What is the default value of the position property in CSS?",
        answers: [
            "relative", 
            "fixed", 
            "static", 
            "absolute"],

        correctAnswer: "static"
    },
    {
        question: "Question 10: What is the purpose of the CSS float property?",
        answers: [
            " It specifies how an element should blend with its background.", 
            "It makes the element move in a circular path.", 
            "It positions an element to the left or right of its container.", 
            "It changes the transparency of an element."],

        correctAnswer: "It positions an element to the left or right of its container."
    }
];
             // this 2nd categery script code here...

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
