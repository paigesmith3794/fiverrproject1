var triviaQuestions = [{
    question: "Liam will have access to text to speech software to assist in reading the twenty-words of his spelling list every week. Is this an example of accommodation or modification?",
    answerList: ["A. Accommodation", "B. Modification"],
    answer: 0
}, {
    question: "Mary is creating a slideshow to investigate the impact of the travel industry on natural environments and human communities. Which of the following is an example of an accommodation?",
    answerList: ["A. By the end of the semester Mary will demonstrate a basic understanding of the concepts of what is the natural environment.", "B. Mary may choose to submit her slideshow via google docs, create a photo journal or present her slideshow to the class."],
    answer: 1
}, {
    question: "In drama, Melanie will be provided a copy of the class notes. She will also receive extra time to complete in class written assignments. This is an example of an accommodation. True or False?",
    answerList: ["A. True", "B. False"],
    answer: 0
}, {
    question: "Alyssa will try to learn ten words of the weekly spelling list while the expectation of the class is to learn a twenty-word spelling list every week. This is an example of a modification. True or False?",
    answerList: ["A. False", "B. True"],
    answer: 1
}, {
    question: "Dylan is fifth-grade student with a severe math disability. Which of the following is the best example of curriculum modification for Dylan?",
    answerList: ["A. Dylan will try to learn addition and subtraction while the rest of the class is to learn fractions and decimals. ", "B. Dylan will have assistance from a scribe and be provided with extra time for assignments."],
    answer: 0
}, {
    question: "Karen is currently in grade 9 science. Pick from the following the best example of curriculum modification for Karen.",
    answerList: ["A. Karen will have access to the lesson and text book via her tablet. She will be able to choose her own format for submission of her ISU her choices may include oral submission, slideshow or video.", "B. By the end of the year, Karen will be able to relate science to the environment; develop the basic skills, strategies, and habits of mind required for scientific inquiry; and demonstrate an improved understanding of some of the basic concepts of science."],
    answer: 1
}, {
    question: "Tashi is currently enrolled in Grade 9 business class. The following is an example of an accommodation.",
    answerList: ["A. In business, by the end of the semester, Tashi will demonstrate understanding of some understanding of finance. Tashi will also apply this knowledge towards a project creating a business plan.", "B. Tashi is encouraged to use a visual display for her business plan. She will have access to the IWB and resource room for extra help."],
    answer: 1
}, {
    question: "Maddie is currently in grade 6 mathematics. The following is an example of a form of accommodation.",
    answerList: ["A. In mathematics, by the end of the year, Maddie will be able to select and apply a variety of problem–solving strategies related to the Grade 4, 5, and 6 curriculum expectations in all strands.", "B. Maddie will have use of a digital calculator during class and for her assignments."],
    answer: 1
}, {
    question: "In drama, by the end of the semester, Bella will demonstrate improvement in her understanding of drama and further develop their performance, creative, and communication skills. This is an example of an accommodation. True or False?",
    answerList: ["A. True", "B. False"],
    answer: 1
}, {
    question: "Is the following an example of modification or accommodation? Susan will try to learn one color and shape monthly while the expectations of the class is to learn color and shape weekly.",
    answerList: ["A. This is an example of a modification.", "B. This is an example of an accommodation."],
    answer: 0
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
    seconds = 45;
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
        setTimeout(scoreboard, 6000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 6000);
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