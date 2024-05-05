let currentQuestion = 0;
let score = 0;
let timeinterval;
                    //this is my first categery java script code here.
const questions = [
    {                 // this is my 1st categery questions...
        question: "Question 1: Which HTML element is used to define the main content of a web page?",
        answers: ["main", "<content>", "<body>", "<section>"],
        correctAnswer: "main"
    },
    {
        question: "Question 2: Which tag is used to define a hyperlink in HTML?",
        answers: ["<a>", "<link>", "<href>", "<hyperlink>"],
        correctAnswer: "<a>"
    },
    {
        question: "Question 3: What does the attribute href stand for in the <a> tag?",
        answers: [
            "Hyper Reference",
            "Hyperlink Reference",
            "Hypertext Reference",
            "Hyperlink File"],

        correctAnswer: "Hypertext Reference"
    },
    {
        question: "Question 4: Which tag is used to create a line break in HTML?",
        answers: ["<br>", "<lb>", "<break>", "<newline>"],
        correctAnswer: "<br>"
    },
    {
        question: "Question 5: What does the HTML <img> tag do?",
        answers: [
            "Embeds an image into the document",
            "Creates a link to another webpage",
            "Defines a paragraph of text",
            "Inserts a video into the document"],

        correctAnswer: "Embeds an image into the document"
    },
    {
        question: "Question 6: What does the HTML <input> tag do?",
        answers: [
            "Defines a checkbox",
            "Embeds an audio file",
            "Creates a text input field",
            "Defines a hyperlink"],

        correctAnswer: "Creates a text input field"
    },
    {
        question: "Question 7: Which tag is used to create a table in HTML?",
        answers: [
            "<table>",
            "<tr>",
            "<td>",
            "<th>"],

        correctAnswer: "<table>"
    },
    {
        question: "Question 8: What does the HTML <title> tag define?",
        answers: [
            "The title of the webpage",
            "A paragraph of text", 
            "A hyperlink", 
            "An image"],
        correctAnswer: "The title of the webpage"
    },
    {
        question: "Question 9: Which tag is used to make text bold in HTML?",
        answers: ["<bold>", "<b>", "<strong>", "<em>"],
        correctAnswer: "<b>"
    },
    {
        question: "Question 10: What is the correct HTML tag for inserting a line break within a paragraph?",
        answers: [" <br>", "<lb>", "<break>", "<newline>"],
        correctAnswer: " <br>"
    }
];
      // this 1st categery script code here...
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
