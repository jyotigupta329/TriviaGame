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
            a: "script href='xxx.js'",
            b: "script src='xxx.js'",
            c: "script name='xxx.js'",
        },
        correctAnswer: "b"
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
        correctAnswer: "b"
    },
    {
        question: "Is jQuery a library for client scripting or server scripting",
        answers: {
            a: "Server scripting",
            b: "Client scripting"
        },
        correctAnswer: "b"
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
        correctAnswer: "d"
    },
    {
        question: "Which jQuery method is used to set one or more style properties for selected elements?",
        answers: {
            a: "css()",
            b: "html()",
            c: "style()"
        },
        correctAnswer: "c"
    }
]

var correctAnswer = 0;
var inCorrectAnswer = 0;
var unAnswered = 0;
var studentAnswerArr = [];




//Onclick of start button quiz timer starts.

$("#start").on("click", function () {
    displayQuiz();
});

//displayQuiz();

// Onclick event to submit the quiz
$("#submit").on("click", function () {
    correctAnswer = 0;
    inCorrectAnswer = 0;
    unAnswered = 0;
    checkAnswer();
})

// To display the quiz

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

    showButton();
}

// Logs the students answers
function studentAnswer(i, answer) {
    studentAnswerArr[i] = answer;
    console.log(studentAnswerArr);
}

// Compares the original answers to student answer
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
    var scoreDiv = $("<div>");
    var correctAnswerDiv = $("<p>");
    var unAnsweredDiv = $("<p>");
    var inCorrectAnswerDiv = $("<p>");
    correctAnswerDiv.text("Correct Answer : " + correctAnswer);
    inCorrectAnswerDiv.text("Wrong answer : " + inCorrectAnswer)
    unAnsweredDiv.text("Unanswred : " + unAnswered);
    scoreDiv.append(correctAnswerDiv).append(inCorrectAnswerDiv).append(unAnsweredDiv);
    $("#score").html(scoreDiv);


}

function showButton(){
    var submit = $("<button>");
    submit.attr("type", "button");
    submit.attr("data-toggle", "modal");
    submit.attr("data-target", "#exampleModalCenter");
    submit.attr("id", "submit");
    submit.addClass("btn btn-success");
    submit.text("Submit Quiz");
    var btndiv = $("<div>");
    $('#question').append(submit);

//     <button type="button" class="btn btn-success" id="submit" onClick="this.style.visibility= 'hidden'" data-toggle="modal" data-target="#exampleModalCenter">
//     Submit Quiz
// </button>
}

// Code for stopwatch 
//
//

window.onload = function () {
    $("#stop").on("click", stopwatch.stop);
    $("#reset").on("click", stopwatch.reset);
    $("#start").on("click", stopwatch.start);
};


var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our stopwatch object
var stopwatch = {

    time: 30,

    // reset: function () {

    //     stopwatch.time = 0;

    //     // DONE: Change the "display" div to "00:00."
    //     $("#display").text("00:00");
    // },

    start: function () {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },
    stop: function () {

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
    },
    count: function () {

        // DONE: increment time by 1, remember we cant use "this" here.
        stopwatch.time--;

        // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);
        console.log(converted);

        //  Use the variable we just created to show the converted time in the "display" div.
        $("#display").text("   " + converted);

        if (stopwatch.time === 0) {
            stopwatch.stop();
            checkAnswer();
            $('#exampleModalCenter').modal();
        }
    },
    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
};

$(document).on("click", "#submit", function () {
    correctAnswer = 0;
    inCorrectAnswer = 0;
    unAnswered = 0;
    stopwatch.stop();
    checkAnswer();
});

