var triviaQuestions = [{
    question: "How many pounds of lavender flowers does it take to make one 15mL bottle of Lavender essential oil?",
    answerList: ["A. 100", "B. 30", "C. 20", "D. 75"],
    answer: 1
}, {
    question: "Melaleuca (Tea Tree) oil may ___?",
    answerList: ["A. Cleanse and rejuvenate the skin", "B. Promote healthy digestion", "C. Help ease menstrual discomfort", "D. Promote restful sleep"],
    answer: 0
}, {
    question: "What is NOT one of the ways you can use doTERRA essential oils?",
    answerList: ["A. Internally", "B. Topically", "C. Aromatically", "D. This is a trick question."],
    answer: 3
}, {
    question: "Aromatic molecules that interact with the top of the nasal cavity emit signals that are modified by various biological processes before traveling to the _________, the emotional switchboard of the brain.",
    answerList: ["A. Reticular formation", "B. Cerebrum", "C. Limbic system", "D. Brain stem"],
    answer: 3
}, {
    question: "Which oil is best known for its powerful protective qualities against environmental threats? Hint: It is known for being used in DIY cleaning products.",
    answerList: ["A. Lemongrass", "B. Breathe", "C. Slim & Sassy", "D. OnGuard"],
    answer: 3
}, {
    question: "How many cups of peppermint tea equals one drop of peppermint essential oil?",
    answerList: ["A. 28", "B. 50", "C. 3", "D. 80"],
    answer: 0
}, {
    question: "Where is the doTERRA headquarters located?",
    answerList: ["A. Los Angeles, CA", "B. Pleasant Grove, UT", "C. New York City, NY", "D. Miami, FL"],
    answer: 1
}, {
    question: "What is one reason you should use doTERRA oils instead of the other essential oil brands?",
    answerList: ["A. They are CPTG (Certified Pure Theraputic Grade).", "B. They add artificial scents, so they smell better.", "C. They clog your liver with toxins.", "D. They have problematic sourcing strategies."],
    answer: 0
}, {
    question: "Which oil is best known for how it helps with your respiratory system?",
    answerList: ["A. Lavender", "B. Breathe", "C. Oregano", "D. Wild Orange"],
    answer: 1
}, {
    question: "Which of these oils can help relieve headaches?",
    answerList: ["A. Lemon", "B. Melaleuca", "C. Frankincense", "D. Cypress"],
    answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
    correct: "Yay! CORRECT!",
    incorrect: "Awh sorry, that's incorrect.",
    endTime: "Out of time!",
    finished: "Game over! Awesome Job!"
}

$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;


    $('#currentQuestion').html("Question #" + (currentQuestion + 1) + " of " + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({ 'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();

    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;

    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty();
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
        $('#gif').html('<img src = "assets/images/' + gifArray[currentQuestion] + '.gif" width = "300px">');
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        $('#gif').html('<img src = "assets/images/incorrectanswer.gif" width = "300px">');
    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 7000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 7000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}