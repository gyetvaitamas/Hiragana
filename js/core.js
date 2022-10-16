/*
 * Github: https://github.com/gyetvaitamas/hiragana
 * Created by Tamás Gyetvai
 */

const hiraganaArray = [
    ['ん', 'n'], ['わ', 'wa'], ['を', 'o'], ['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro'],
    ['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo'], ['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo'],
    ['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho'], ['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'],
    ['ね', 'ne'], ['の', 'no'], ['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to'], ['さ', 'sa'],
    ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so'], ['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'],
    ['こ', 'ko'], ['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o']
];

var score = {
    "correct": 0,
    "wrong": 0,
    "ration": 0
}

var hiragana = new Object();
var preventRecurringWrong = false;

// Pick and display a random Hiragana
function pickHiragana() {

    // Selecting a random hiragana from the array
    var pickRandom = Math.floor(Math.random()*hiraganaArray.length);

    // Set hiragana details
    hiragana = {
        "character": hiraganaArray[pickRandom][0],
        "word": hiraganaArray[pickRandom][1],
        "length": hiraganaArray[pickRandom][1].length,
    }

    // Set input text field max length to match hiragana's length
    document.getElementById('input').setAttribute('maxlength', hiragana.length);

    // Display hiragana on page
    var currentHiraganaElement = document.getElementById("currentHiragana");
    var currentHiraganaWordElement = document.getElementById("currentHiraganaWord");

    currentHiraganaElement.innerHTML = hiragana.character;
    currentHiraganaWordElement.innerHTML = hiragana.word;

    // With fade effect
    fadeEffect(currentHiraganaElement);
    fadeEffect(currentHiraganaWordElement);

}

// When page loaded or refreshed
function start() {

    pickHiragana();

    // Setup scores
    document.getElementById("correctRatio").innerHTML = "Ratio: " + score.ration + "%";
    document.getElementById("correctAnswers").innerHTML = "Correct: " + score.correct;
    document.getElementById("wrongAnswers").innerHTML = "Wrong: " + score.wrong;
    
    // Auto focus input field
    document.getElementById('input').focus();
}

// Main keyboard event, when user is typing
function eventHandler() {

    // Convert input to lowercase and save into variable
    var typedWord = document.getElementById('input').value.toLowerCase();

    if (typedWord === hiragana.word) {

        // Input matched

        // Add 'correct' score and calculate ration
        score.correct++;
        score.ration = score.correct / (score.correct+score.wrong) * 100;

        // Clear input field
        document.getElementById('input').value = "";

        // Pick new hiragana
        pickHiragana();

    } else {

        if(document.getElementById('input').value.length === hiragana.length){

            // Input is wrong

            // Check if user typing wrong answer continuously
            if (!preventRecurringWrong) {
                // Add 'wrong' score and calculate ration
                score.wrong++;
                score.ration = score.correct / (score.correct+score.wrong) * 100;
            }
            
            // Prevent counting 'wrong' score while user is typing continuously
            preventRecurringWrong = true;

            // Change input border for alerting
            document.getElementById("input").classList.remove("defaultIndicator");
            document.getElementById("input").classList.add("wrongIndicator");
            
        } else {

            // Input length not match with the hiragana's length

            // Clear prevention from recurring wrong answers
            preventRecurringWrong = false;

            // Change input border back to normal
            document.getElementById("input").classList.remove("wrongIndicator");
            document.getElementById("input").classList.add("defaultIndicator");

        }

    }

    // Keep scores updating
    document.getElementById("correctRatio").innerHTML = "Ratio: " + Math.round(score.ration*10)/10 + "%";
    document.getElementById("correctAnswers").innerHTML = "Correct: " + score.correct;
    document.getElementById("wrongAnswers").innerHTML = "Wrong: " + score.wrong;

}

// Always focus the input field
function alwaysFocus() {
    document.getElementById('input').focus();
}

// Opacity effect
function fadeIn(element,i) {

    i = i + 0.08;
    element.style.opacity = i;

    if (i<1) {
        setTimeout(function() {
            fadeIn(element,i);
        }, 10);
    }

}

// Fading effect
function fadeEffect(textToFade){

    var i = 0;
    fadeIn(textToFade,i);

}

// Theme changer (Light/Dark) using CSS files
function changeTheme() {

    var changeTheme = document.getElementById("changeTheme");
    var link = document.getElementById("theme");

    if (changeTheme.innerHTML === "Light") {

        // Switch to Light theme
        link.setAttribute("href", "css/light.css");
        changeTheme.innerHTML = "Dark";
        
    } else {

        // Switch to Dark theme
        link.setAttribute("href", "css/dark.css");
        changeTheme.innerHTML = "Light";
        
    }

}