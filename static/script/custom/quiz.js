// quiz.js
// idx object for quiz mode

function Quiz(){
    this.idx        =   [];
    this.currIdx    =   0;       // idx of current question
    this.questions  =   [];      // set of 10 quiz questions
    this.wrong      =   [];      // a collection of incorrect answers
    this.correct    =   0;       // correct answer count
    this.graded     =   false;

    this.initIdx = function(){
        for(i=0; i<100; i++){
            this.idx.push(i);
        }
    };

    this.shuffleIdx = function(){
        var curr = this.idx.length,
            temp, 
            rand;
        while(0 !== curr){
            rand = Math.floor(Math.random() * curr);
            curr -= 1;
            temp = this.idx[curr];
            this.idx[curr] = this.idx[rand];
            this.idx[rand] = temp;
        }
    };

    this.resetIdx = function(){
        this.initIdx();
        this.shuffleIdx();
        this.setProgress();
    };

    this.getTenQuestions = function(){
        if(!this.idx.length){
            this.resetIdx();
        } else {
            for(i=0;i<10;i++){
                this.questions.push(this.idx.pop());
            }
        }
        console.log(this.questions);
    };

    this.getOneQuestion = function(){
        if(!this.questions.length){
            this.getTenQuestions();
        }
        this.currIdx = this.questions.pop();
        console.log(this.questions);
        return this.currIdx;
    };

    this.getItem = function(){
        return data[this.getOneQuestion()];
    };
    this.getCurrIdx = function(){
        return this.currIdx;
    }
    this.getCurrItem = function(){
        return data[this.getCurrIdx()];
    };

    this.plusCorrect = function(){
        // increment quiz score, update display
        if(this.correct < 10){
            this.correct++;
            $('#quiz-score').text("Correct "+ this.correct +"/10");
        }
        // remove question from previous incorrect answers if found
        for(i in this.wrong){
            if(this.currIdx == this.wrong[this.currIdx]){
                this.wrong.splice(this.currIdx, 1);
            }
        }
    };

    this.plusWrong = function(){
        this.wrong.push(this.currIdx);
    };

    this.resetWrong = function(){
        this.wrong = [];
    }
    this.resetQuestions = function(){
        this.questions = [];
        this.getTenQuestions();
    }

    this.gradeQuiz = function(){
        if(this.correct >= 6){
            $('#quiz-score').text("Congratulations! You passed with a score of "+ this.correct +"/10");
            $('#quiz-score').css("color", "#aaffaa");
        } else {
            $('#quiz-score').text("You can do it! Study a little harder. "+ this.correct + "/10");
            $('#quiz-score').css("color", "#ffaaaa");
        }
        this.graded = true;
    };

    this.resetQuiz = function(){
        this.resetQuestions();
        this.correct = 0;
        this.graded = false;
        $('#quiz-score').css("color", "#839496");
        $('#quiz-score').text("Correct "+ this.correct +"/10");
    };

    this.setState = function(state){
        this.state = state;
    };

    this.checkProgress = function(){
        if(this.questions.length == 0){
            this.gradeQuiz();
        } else {
            this.setProgress();
        }
    };

    this.setProgress = function(){
        if(!this.questions.length){
            this.getTenQuestions();
        }
        total = 10;
        i = ((total - this.questions.length)*10)+"%";
        $('#progress').css("width", i);
    };
}