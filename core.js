/*
 * Github: https://github.com/gyetvaitamas/hiragana
 * Created by Tamás Gyetvai
 */

var currentHiragana = "";
var currentHiraganaPrinted = "";
var currentHiraganaPrintedLength = 0;
var winPoint = 0;
var losePoint = 0;
var hiraganaArray = [
    ['ん', 'n'], ['わ', 'wa'], ['を', 'o'], ['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro'],
    ['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo'], ['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo'],
    ['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho'], ['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'],
    ['ね', 'ne'], ['の', 'no'], ['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to'], ['さ', 'sa'],
    ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so'], ['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'],
    ['こ', 'ko'], ['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o']
];


// Always focus input field
function bodyClick() {
    document.getElementById('input').focus();
}

// Pick and display a random Hiragana
function pickHiragana() {
    // Selecting a random hiragana from the array
    var pickRandom = Math.floor(Math.random()*hiraganaArray.length);
    currentHiragana = hiraganaArray[pickRandom][0];
    currentHiraganaPrinted = hiraganaArray[pickRandom][1];
    
    // Storing the hiragana's length
    currentHiraganaPrintedLength = currentHiraganaPrinted.length;
    
    // Displaying the hiragana
    document.getElementById("currentHiragana").innerHTML = currentHiragana;
    fadeEffect(document.getElementById("currentHiragana"));
    
    // Displaying the hiragana in printed format
    document.getElementById("currentHiraganaPrinted").innerHTML = currentHiraganaPrinted;
    fadeEffect(document.getElementById("currentHiraganaPrinted"));
}

// For hiragana.html
function printHiragana() {
    var i,n;

    for(i = 0; i < hiraganaArray.length; i++){
        for(n = 0; n < 6; n++){
            if(n !== 5){
                document.write("<a class='word'>" + hiraganaArray[i][0] + " " + hiraganaArray[i][1] + "</a>" + "&emsp;&emsp;");
            }else{
                document.write("<a class='word'>" + hiraganaArray[i][0] + " " + hiraganaArray[i][1] + "</a>");
            }
            i++;
        }
        i--;
        document.write("<br>");
    }
}

// When page loaded or refreshed
function start() {
    pickHiragana();
    document.getElementById("winPoint").innerHTML = "Matched: " + winPoint;
    document.getElementById("losePoint").innerHTML = "Missed: " + losePoint;
    
    // Auto focus input field
    document.getElementById('input').focus();
}

// Main keyboard event
function eventHandler() {
    // Setting input text field length to match hiragana's length
    document.getElementById('input').setAttribute('maxlength', currentHiraganaPrintedLength);
    
    if (document.getElementById('input').value === currentHiraganaPrinted) {
        // The user input matches with the printed hiragana format = add win point and reset UI
        winPoint++;
        pickHiragana();
        document.getElementById("warn").innerHTML = "";
        document.getElementById('input').value = "";
    } else {
        // The user input doesn't matches with the printed hiragana format = add lose point and warn user
        if(document.getElementById('input').value.length === currentHiraganaPrintedLength){
            losePoint++;
            document.getElementById("warn").innerHTML = "!";
        } else {
            document.getElementById("warn").innerHTML = "";
        }
    }
    // Keep points up-to-date
    document.getElementById("winPoint").innerHTML = "Matched: " + winPoint;
    document.getElementById("losePoint").innerHTML = "Missed: " + losePoint;
}

// Opacity effect
function fadeIn(element,i) {
    i = i + 0.08;
    element.style.opacity = i;
    if(i<1){
        setTimeout(function(){fadeIn(element,i);}, 10);
    }
}

// Fading effect
function fadeEffect(textToFade){
    var i = 0;
    var element;
    element = textToFade;
    fadeIn(element,i);
}

// Theme changer (Light/Dark)
function changeTheme() {
    var body = document.getElementById("body");
    var input = document.getElementById("input");
    var theme = document.getElementById("changeTheme");

    if(theme.innerHTML === "Light"){
        // Switch to light theme
        body.style.color = "#3D3D3D";
        body.style.backgroundColor = "#F2F2F2";
        input.style.color = "#F2F2F2";
        input.style.backgroundColor = "#3D3D3D";
        theme.innerHTML = "Dark";
    }else {
        // Switch to dark theme
        body.style.color = "#e5e5e5";
        body.style.backgroundColor = "#121212";
        input.style.color = "#121212";
        input.style.backgroundColor = "#BFBFBF";
        theme.innerHTML = "Light";
    } 
}