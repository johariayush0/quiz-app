let currentQuestion = 0;
let score = 0;
let timeinterval;

const questions = [
    {                   // this is my 4th categery questions here...
        question: "Question 1: What does the term AI stand for?",
        answers: [
            "Automated Intelligence", 
            "Automated Inference", 
            "Artificial Intelligence", 
            "Algorithmic Inference"],

        correctAnswer: "Artificial Intelligence"
    },
    {
        question: "Question 2: Which of the following is considered a subfield of AI?",
        answers: [
            "Cybersecurity", 
            "Neuroscience", 
            "Machine Learning", 
            "Structural Engineering"],

        correctAnswer: "Machine Learning"
    },
    {
        question: "Question 3: Which AI technique is used to teach computers how to perform tasks by learning from data, without being explicitly programmed?",
        answers: [
            "Genetic Algorithms", 
            "Expert Systems", 
            "Reinforcement Learning", 
            "Machine Learning"],

        correctAnswer: "Machine Learning"
    },
    {
        question: "Question 4: Which type of AI system can analyze and interpret complex data, such as images or natural language?",
        answers: [
            "Narrow AI", 
            "General AI", 
            "Strong AI", 
            "Weak AI"],

        correctAnswer: "Narrow AI"
    },
    {
        question: "Question 5: Which programming language is commonly used for implementing AI algorithms and models?",
        answers: [
            "Java", 
            "C++", 
            "Python", 
            "Ruby"],

        correctAnswer: "Python"
    },
    {
        question: "Question 6: What is the primary goal of AI ethics?",
        answers: [
            "To limit the capabilities of AI systems", 
            "To ensure that AI systems align with human values and ethics", 
            "To promote the development of superintelligent AI", 
            "To make AI systems completely autonomous"],

        correctAnswer: "To ensure that AI systems align with human values and ethics"
    },
    {
        question: "Question 7: Which AI subset focuses on imitating human decision-making?",
        answers: [
            "Machine Learning", 
            "Reinforcement Learning", 
            "Expert Systems", 
            "Genetic Algorithms"],

        correctAnswer: "Expert Systems"
    },
    {
        question: "Question 8: What type of AI is Siri or Alexa?",
        answers: [
            "Narrow AI", 
            "General AI", 
            "Super AI", 
            "Strong AI"],

        correctAnswer: "Narrow AI"
    },
    {
        question: "Question 9: What does AGI stand for in AI discussions?",
        answers: [
            "Advanced General Intelligence", 
            "Artificial General Intelligence", 
            "Adaptive Group Integration", 
            "Algorithmic Governance Initiative"],

        correctAnswer: "Artificial General Intelligence"
    },
    {
        question: "Question 10: Which test evaluates a machine's ability to exhibit human-like intelligence?",
        answers: [
            "Watson Test", 
            " Turning Test", 
            "AlphaGo Test", 
            "DeepMind Challenge"],

        correctAnswer: " Turning Test"
    }
];
             //this is my 4th categery java script code here...

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
