//key event to make one keyboard appear and another disappear

//AFTER DOCUMENT LOADS:
$(document).ready(function () {

    //ARRAY CONTAINING SENTENCES 
    var sentences = [
        'ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'
    ];

    var together = sentences.join(" ");
    //NUMBER OF WORDS IN SENTENCES ARRAY
    var togetherLen = together.split(" ").length;


    //VARIABLES TO KEEP TRACK OF SENTENCES INDEX, WHERE YELLOW-BLOCK IS ON PAGE, AND TIME
    var sLength = sentences.length;
    var currentS = 0;
    var count = 0;
    var lettersOfS;
    var numberOfMistakes = 0;
    var initialTime = Date.now();
    var endTime;
    var wps;
    var wpm;

    //VARIABLE DECLARATIONS AND SETTING INITIAL VISIBILITY RULES FOR BOTH KEYBOARDS
    var upper = "#keyboard-upper-container";
    var lower = "#keyboard-lower-container";
    var sentenceId = "#sentence";
    $(upper).hide();
    $(lower).show();

    //TOGGLES BETWEEN UPPER AND LOWER IF SHIFT KEY IS PRESSED
    $(document).keydown(function (key) {
        if (key.keyCode === 16) {
            $(upper).show();
            $(lower).hide();
        }
    });

    $(document).keyup(function (key) {
        if (key.keyCode === 16) {
            $(lower).show();
            $(upper).hide();
        }
    });

    //HIGHLIGHTS AND UNHIGHLIGHTS THE KEY THAT IS BEING PRESSED 
    $(document).keypress(function (key) {
        var grabKey = key.which;
        var keyId = "#" + grabKey.toString();
        $(keyId).css("background-color", "#ffff99");
        $(document).keyup(function (grabKey) {
            $(keyId).css({ "background-color": "" })
        })
    });

    //DISPLAYS FIRST SENTENCE AND TARGET LETTER
    $(sentenceId).append("<p>" + sentences[currentS] + "</p>");
    $("#target-letter").append("<h1>" + 't' + "</h1>");   

    //TRACKS AND DISPLAYS FEEDBACK SYMBOLS(RIGHT AND WRONG KEYS)
    //TRACKS AND DISPLAYS SENTENCES IN THE SENTENCES ARRAY
    //TRACKS AND DISPLAYS NEXT LETTER UNDERNEATH SENTENCE AND FEEDBACK DIVS
    $(document).keypress(function (key) {
        var lettersOfS = sentences[currentS].split("");
        var numberOfWords = togetherLen
        //TESTS IF THE COUNT VARIABLE IS THE LENGTH OF THE CURRENT SENTENCE
        if (count >= (lettersOfS.length - 1)) { 
           currentS += 1
           //IF CURRENT SENTENCE IS LESS THAN THE TOTAL SENTENCES
           //MOVE TO NEXT SENTENCE AND CONTINUE TO DISPLAY YELLOW-BLOCK, FEEDBACK, AND NEXT LETTER
           if (currentS < sentences.length) {
            $(sentenceId + " p").remove();
            $("#yellow-block").animate({
                left: "17px"
            }, 10);
            $("#feedback div").remove();
            lettersOfS = sentences[currentS].split("");
            count = 0;
            $(sentenceId).append("<p>" + sentences[currentS] + "</p>")
            $("#target-letter h1").remove();
            $("#target-letter").append("<h1>" + lettersOfS[count] + "</h1>")
            //OTHERWISE GAME IS OVER. DISPLAY RESULTS AND PROMPT TO PLAY AGAIN
           } else {
               $("#target-letter h1").remove();
               endTime = Date.now();
               timeSec = Math.floor((endTime - initialTime) / 1000);
               wpm = Math.floor((numberOfWords/ (Math.floor(timeSec) / 60) - (2 * numberOfMistakes)));
               alert("You typed " + wpm + " words per minute.");
               setTimeout(function () {
                   var stank = prompt("Type 'Yes' to play again");
                   if (stank.toUpperCase() === "YES") {
                       location.reload();
                   } 
               }, 2000);
           }
          //OR IF THE KEY CODE OF THE KEY PRESSED === KEY CODE OF THE CURRENT LETTER IN THE SENTENCE
          //MOVE TO NEXT LETTER, FEEDBACK INDICATES CORRECT, MOVES FOWARD
        } else if (key.charCode === sentences[currentS].charCodeAt(count)) {
            $("#yellow-block").animate({
            left: "+=17.5px"
            }, 10);
            $("<div></div>").addClass("glyphicon glyphicon-ok").appendTo($("#feedback"));
            count += 1;
            $("#target-letter h1").remove();
            $("#target-letter").append("<h1>" + lettersOfS[count] + "</h1>")
          //OR IF KEY CODE OF CURRENT LETTER DOES !== KEY CODE OF THE CURRENT LETTER IN THE SENTENCE
          //MOVE TO NEXT LETTER, FEED BACK INDICATES INCORRECT, MOVES FOWARD
        } else if (key.charCode !== sentences[currentS].charCodeAt(0)) {
            $("#yellow-block").animate({
            left: "+=17.5px"
            }, 10);
            $("<div></div>").addClass("glyphicon glyphicon-remove").appendTo($("#feedback"));
            count += 1;
            $("#target-letter h1").remove();
            $("#target-letter").append("<h1>" + lettersOfS[count] + "</h1>")
            numberOfMistakes += 1;
        }

    })
});



