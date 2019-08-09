// study.js
// idx object for study mode

function Study(){
    this.idx     =   [];
    this.currIdx =   0;
    this.state   =   true; // on/off - on by default
    this.all     =   true; // study all questions or only previous incorrect
    
    this.initIdx = function(){
        this.idx = [];
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

    this.getIdx = function(){
        this.currIdx = this.idx.pop();
        return this.currIdx;
    };
    this.getCurrIdx = function(){
        return this.currIdx;
    };
    this.getCurrItem = function(){
        return data[this.getCurrIdx()];
    }
    this.getItem = function(){
        return data[this.getIdx()];
    };

    this.setState = function(state){
        this.state = state;
    };
    this.getState = function(){
        return this.state;
    };
    this.setAll = function(all){
        this.all = all;
    }
    this.getAll = function(){
        return this.all;
    }

    this.setProgress = function(){
        if(!this.idx.length){
            this.resetIdx();
        }
        total = 100;
        i = (total - this.idx.length)+"%";
        $('#progress').css("width", i);
    };
}