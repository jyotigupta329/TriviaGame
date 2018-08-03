var triviaGame = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: {
            a: "script",
            b: "js",
            c: "javascript",
        },
        correctAnswer: "a"
    },
    {
        question: " Where is the correct place to insert a JavaScript?",
        answers: {
            a: "head section",
            b: "body section",
            c: "Both",
        },
        correctAnswer: "b"
    },
    {
        question: "What is the correct syntax for referring to an external script called xxx.js",
        answers: {
            a: "script src='xxx.js'",
            b: "script href='xxx.js'",
            c: "script name='xxx.js'",
        },
        correctAnswer: "a"
    }, {
        question: " jQuery uses CSS selectors to select elements?",
        answers: {
            a: "false",
            b: "true",
        },
        correctAnswer: "a"
    },
    {
        question: "Which sign does jQuery use as a shortcut for jQuery?",
        answers: {
            a: "the ? Sign",
            b: "the $ sign",
            c: "the % sign",
        },
        correctAnswer: "a"
    },
    {
        question: "Is jQuery a library for client scripting or server scripting",
        answers: {
            a: "Server scripting",
            b: "Client scripting"
        },
        correctAnswer: "a"
    },
    {
        question: "Is it possible to use jQuery together with AJAX?",
        answers: {
            a: "yes",
            b: "no"
        },
        correctAnswer: "a"
    },
    {
        question: "The jQuery html() method works for both HTML and XML documents",
        answers: {
            a: "false",
            b: "true"
        },
        correctAnswer: "a"
    },
    {
        question: " Which jQuery method is used to hide selected elements?",
        answers: {
            a: "visible(false)",
            b: "hide()",
            c: " hidden()",
            d: " display(none)",
        },
        correctAnswer: "a"
    },
    {
        question: "Which jQuery method is used to set one or more style properties for selected elements?",
        answers: {
            a: "css()",
            b: "html()",
            c: "style()"
        },
        correctAnswer: "a"
    }
]

var correctAnswer = 0;
var inCorrectAnswer = 0;
var unAnswered = 0;
var studentAnswerArr = [];

displayQuiz();

$("#submit").on("click", function () {
    correctAnswer = 0;
    inCorrectAnswer = 0;
    unAnswered = 0;
    checkAnswer();
})

$(document).ready(function () {


});



function studentAnswer(i, answer) {
    //console.log(i + answer);
    studentAnswerArr[i] = answer;
    console.log(studentAnswerArr);
}




function checkAnswer() {
    for (var i = 1; i <= triviaGame.length; i++) {
        if (!studentAnswerArr[i]) {
            unAnswered++;
        }
        if (triviaGame[i - 1].correctAnswer === studentAnswerArr[i]) {
            correctAnswer++;
        } else if (studentAnswerArr[i] && triviaGame[i - 1].correctAnswer !== studentAnswerArr[i]) {
            inCorrectAnswer++;
        }
    }

    console.log("unAnswered : " + unAnswered);
    console.log("inCorrectAnswer : " + inCorrectAnswer);
    console.log("correctAnswer : " + correctAnswer);
}

function displayQuiz() {
    var question = $('#question').attr('id');
    for (var i = 1; i <= triviaGame.length; i++) {
        var ansRadio = '';
        var answers = triviaGame[i - 1].answers;
        for (var answer in answers) {
            if (answers.hasOwnProperty(answer)) {
                ansRadio += ' <input type="radio" name="question' + i + '"onclick="studentAnswer(' + i + ',this.value)" value="' + answer + '">   ' + answers[answer] + ' </input> ';
            }
        }
        var childDiv = '<div id="question' + i + '">' + i + ". " + triviaGame[i - 1].question + '<br>' +
            ansRadio +
            '<br>' + '<br>' +
            '</div>';
        var newQuestionDiv = $("<div>");
        newQuestionDiv.html(childDiv);
        $('#question').append(newQuestionDiv);

    }
}




