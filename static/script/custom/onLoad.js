// study mode - all 100 questions cycled
// quiz mode - 10 questions graded
//  missed questions cataloged for study

/* refactor roadmap

    json data w/ question index
    question object referenced by index only
    array of indices manipulated for access, not objects

    index array: 
            indices[] = [0, 1, 2, 3, 4... 100]
    shuffle indices:
            for i 0 to 100{
                n = rand(i,100)*100;
                indices[i] = n;
            }


IN STUDY MODE
    study mode iterates through all 100 questions as standard flashcards for self-study
    no scoreboard. includes reset study queue option        
            pop random q from index array
            display, reveal
            repeat until exhausted
            reset
IN QUIZ MODE
    quiz mode gets an array of 10 random questions as flashcards for self-scored study
    incorrect answers are added to a study queue, scoreboard visible
            get array of 10 q 
            score correct/incorrect
            pass/fail?
            add incorrect qs to study queue


/*-----------------------------------
Global Variables
-----------------------------------*/
var seen,
Study = new Study(),
Quiz = new Quiz();
/*-----------------------------------
Functions
-----------------------------------*/

function initAll(){
    // show study mode controls
    $('.study-mode-control').collapse('show');

    // initialize objects
    Study.resetIdx();
    Quiz.resetIdx();
    Quiz.resetWrong();
    runStudy();
};

function runStudy(){
    presentQuestion(Study.getItem());
    Study.setProgress();
};

function runQuiz(){
    quizQuestionButtons();
    Quiz.resetQuiz();
    presentQuestion(Quiz.getItem());
    Quiz.checkProgress();
};

function presentQuestion(item){
    txt = item["question"];
    pId= '#text-node';
    imgId = '#img-box';
    seen = false;

    $(pId+ ' p').remove();
    $(imgId).css("background-image", "");
    $(imgId).css("height", "0px");
    $(imgId).css("margin", "none");
    $(pId).append('<p>' + txt + '</p>');
    playAudio(item["q_audio"]);
};
function presentAnswer(item){
    txt = item["answer"];
    pId = '#text-node';
    imgId = '#img-box';

    $(pId + ' p').remove();
    $(pId).append('<p>' + txt + '</p>');
    $(imgId).css("background-image", "url("+item["image"]+")");
    $(imgId).css("height", "500px");
    $(imgId).css("margin", "1em auto 1em auto");
    playAudio(item["a_audio"]);
};

function incorrectModeButton(){
    if(!Quiz.wrong.length){
        $("#incorrect").attr("Disabled", true);
    } else {
        $("#incorrect").removeAttr("Disabled");
    }
};

function studyButtons(){
    $('#next-btn').removeAttr("disabled");
    $('#repeat-btn').removeAttr("disabled");
    $('#answer-btn').removeAttr("disabled");
    $('#reset-btn').removeAttr("disabled");
};
function quizQuestionButtons(){
    $('#next-btn').attr("disabled", true);
    $('.correct-btn').attr("disabled", true);
    $('.wrong-btn').attr("disabled", true);
    $('#repeat-btn').removeAttr("disabled");
    $('#answer-btn').removeAttr("disabled");
};
function quizAnswerButtons(){
    $('.correct-btn').removeAttr("disabled");
    $('.wrong-btn').removeAttr("disabled");
}
function quizHasAnsweredButtons(){
    $('#next-btn').removeAttr("disabled");
    $('.correct-btn').attr("disabled", true);
    $('.wrong-btn').attr("disabled", true);
    $('#repeat-btn').attr("disabled", true);
    $('#answer-btn').attr("disabled", true);
}

/*------------
Audio Handling
------------*/

function playAudio(a){
    $.stopSound();
        setTimeout(function() {
            $.playSound(a);
        }, 300);
    $.stopSound();
}

/*----------
On Page Load
----------*/

$(document).ready(function(){

    initAll();

    $('#next-btn').click(function() {
        event.stopPropagation();
        setTimeout(function() {
            if(!Study.getState()){
                if(Quiz.graded){
                    runQuiz();
                } else {
                    quizQuestionButtons();
                    presentQuestion(Quiz.getItem());
                }
            } else {
                studyButtons();
                presentQuestion(Study.getItem());
                Study.setProgress();
            }
        }, 250);
    });
    $('#repeat-btn').click(function() {
        event.stopPropagation();
        if(!Study.getState()){
            quizQuestionButtons();
            presentQuestion(Quiz.getCurrItem());
        } else {
            studyButtons();
            presentQuestion(Study.getCurrItem());
        }

    });
    $('#answer-btn').click(function() {
        event.stopPropagation();
        if(!Study.getState()){
            quizAnswerButtons();
            presentAnswer(Quiz.getCurrItem());
        } else {
            presentAnswer(Study.getCurrItem());
        }
    });

    // App Mode Change handling
    $('#app-mode').change(function(){
        if($("#study").is(":checked")) {
            $('.quiz-control-block').collapse('hide');
            $('.study-mode-control').collapse('show');
            studyButtons();
            Study.setState(true);
            runStudy();
        }
        else if($("#quiz").is(":checked")){
            $('.quiz-control-block').collapse('show');
            $('.study-mode-control').collapse('hide');
            quizQuestionButtons();
            Study.setState(false);
            runQuiz();
        }
    });

    // Study Mode Change Handling
    $('#study-mode').change(function(){
        if($("#all").is(":checked")) {
            console.log(Study.getAll());
        }
        else if($("#incorrect").is(":checked")){
            console.log(Study.getAll());
        }
    });

    // Quiz mode controls
    $('.correct-btn').click(function() {
        event.stopPropagation();
        quizHasAnsweredButtons();
        Quiz.plusCorrect();
        Quiz.checkProgress();
    });
    $('.wrong-btn').click(function() {
        event.stopPropagation();
        quizHasAnsweredButtons();
        Quiz.plusWrong();
        Quiz.checkProgress();
    });
    $('#reset-btn').click(function() {
        event.stopPropagation();
        studyButtons();
        initAll();
    });
});


/**------------------------
 * Audio Module "playSound"
 * ------------------------
 * @author Alexander Manzyuk <admsev@gmail.com>
 * Copyright (c) 2012 Alexander Manzyuk 
 * Released under MIT License.
 * https://github.com/admsev/jquery-play-sound
 * Usage: $.playSound('http://example.org/sound')
 * $.playSound('http://example.org/sound.wav')
 * $.playSound('/attachments/sounds/1234.wav')
 * $.playSound('/attachments/sounds/1234.mp3')
 * $.stopSound();
**/