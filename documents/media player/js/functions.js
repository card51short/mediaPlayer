// set counters
var current = 0;
var counter = 0;
//create Track info arrays
var trackNames = [];
var trackTitles = [];
//set getElementById shorcuts 
var repeatButton = document.getElementById("repeatBtn");
var repeatOneButton = document.getElementById("repeatOneBtn");
var shuffleButton = document.getElementById("shuffleBtn");
var audioSource = document.getElementById("source");
var trackName = document.getElementById("track");
var trackLength = document.getElementById("length");
//set pre-loaded event listeners
repeatButton.addEventListener("click", addButtonClass);
repeatOneButton.addEventListener("click", addButtonClass);
shuffleButton.addEventListener("click", addButtonClass);
audioSource.addEventListener("loadedmetadata", trackInfo);
//When files are selected by user - add them to playlist, play them, make it current and fill in track info
audio_file.onchange = function(){
    if (counter > 19) {
        alert("19 is the maximum amount of songs allowed");
    }else {
        var files = this.files;
        var file = URL.createObjectURL(files[0]); 
        audioSource.src = file; 
        audioSource.play();
        document.getElementById("tracks").innerHTML += "<input type='radio' id=" +  counter + " name='trackListItems'><label for=" + counter + ">" + files[0].name + "</label>";
        trackNames[counter] = file;
        trackTitles[counter] = files[0].name;
        addListener();
        document.getElementById(counter).checked = "checked";
        counter++;
    }
};
//add onclick listener to each new track added
function addListener() {
    var x = document.getElementById("tracks");
    var y = x.getElementsByTagName("input");
    var i;
    for (i = 0; i < y.length; i++) {
        document.getElementById(i).addEventListener("click", playTrack);
    }
}
//play track upon click
function playTrack() {
    current = this.id;
    trackName.innerHTML = "<p class='bold'>Track: </p>" + trackTitles[this.id];
    audioSource.src = trackNames[this.id];
    audioSource.play();
    
}
//fill in track info after meta data loads
function trackInfo() {
    document.getElementById('track').value = trackTitles[current];
    var minutes = Math.floor(audioSource.duration / 60);
    var seconds = audioSource.duration - minutes * 60;
    if (seconds < 10) {
        document.getElementById('length').value = minutes + ":0" + Math.round(seconds);
    }else 
        document.getElementById('length').value = minutes + ":" + Math.round(seconds);
}

//set repeat, repeat one and shuffle buttons
audioSource.onended=function(){
        //if repeat all is pressed
        if (repeatButton.src.indexOf("Green") != -1) {
            if (trackNames[current+1]){ 
                audioSource.src = trackNames[current+1];
                audioSource.play();
                current = current+1;
                trackInfo();
            }else{
                audioSource.src = trackNames[0];
                audioSource.play();
                current = 0;
                trackInfo();
            }
        }else if (repeatOneButton.src.indexOf("Green") != -1) {
            audioSource.play();
        }else if(shuffleButton.src.indexOf("Green") != -1){
            var randomNumber = Math.floor(Math.random() * trackNames.length);
            audioSource.src = trackNames[randomNumber];
            audioSource.play();
            current = randomNumber;
            trackInfo();
        }else
            audioSource.stop();
};
//button functions to turn on/off
function addButtonClass() {
       if (this.id == "repeatBtn") {
            if (repeatButton.src.indexOf("Green") != -1) {
                this.src = "images/repeatButton.png";
            }else {
                this.src = "images/repeatButtonGreen.png";
                repeatOneButton.src = "images/repeatOneButton.png";
                shuffleButton.src = "images/shuffleButton.png";
            }
       }else if (this.id == "repeatOneBtn") {
            if (repeatOneButton.src.indexOf("Green") != -1) {
                this.src = "images/repeatOneButton.png";
            }else {
                this.src = "images/repeatOneButtonGreen.png";
                repeatButton.src = "images/repeatButton.png";
                shuffleButton.src = "images/shuffleButton.png";
            }
       }else if (this.id == "shuffleBtn") {
            if (shuffleButton.src.indexOf("Green") != -1) {
                this.src = "images/shuffleButton.png";
            }else {
                this.src = "images/shuffleButtonGreen.png";
                repeatOneButton.src = "images/repeatOneButton.png";
                repeatButton.src = "images/repeatButton.png";
            }
       }
}