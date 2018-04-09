function generateWinningNumber() {
    return Math.floor(Math.random() * 100) + 1; 
}

function shuffle(array) {
    var m = array.length, i, t; 
    while(m) {
        i = (Math.floor(Math.random() * m--));
        t = array[m];
        array[m] = array[i]
        array[i] = t; 
    }
    return array;
}

function Game() {
    this.playersGuess = null  
    this.pastGuesses = []
    this.winningNumber = generateWinningNumber(); 
}

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess - this.winningNumber); 
}

Game.prototype.isLower = function() {
    if(this.playersGuess < this.winningNumber) {
        return true; 
    }
    return false; 
}; 


Game.prototype.playersGuessSubmission = function(num) {
    if(num < 1 || num > 100 || typeof num !== "number") {
        throw "That is an invalid guess."
    } else {
        this.playersGuess = num; 
    }
    return this.checkGuess(); 
};

Game.prototype.checkGuess = function() {
    if(this.playersGuess===this.winningNumber) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Win!'
    }
    else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if(this.pastGuesses.length === 5) {
                $('#hint, #submit').prop("disabled",true);
                $('#subtitle').text("Press the Reset button to play again!")
                return 'You Lose.';
            }
            else {
                var diff = this.difference();
                if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }
                if(diff < 10) return'You\'re burning up!';
                else if(diff < 25) return'You\'re lukewarm.';
                else if(diff < 50) return'You\'re a bit chilly.';
                else return'You\'re ice cold!';
            }
        }
    }
}

function newGame() {
    return new Game(); 
}

Game.prototype.provideHint = function() {
    return shuffle([this.winningNumber,generateWinningNumber(),generateWinningNumber()]); 
}

$(document).ready(function() {
    $('#submit').click(function(e) {
       console.log('Submit button has been clicked')
    })
})

function makeAGuess(game) {
    var guess = $('#players-input').val();
    $('#players-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#title').text(output);
}

$(document).ready(function() {
    var game = new Game();

    $('#submit').click(function(e) {
       makeAGuess(game);
    })

    $('#players-input').keypress(function(event) {
        if ( event.which == 13 ) {
           makeAGuess(game);
        }
    })
})


