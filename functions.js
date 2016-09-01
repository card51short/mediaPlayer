// set counters
var current = 0,
counter = 0;
//create Track info arrays
var trackNames = [],
trackTitles = [],
trackLengths = [];
//set getElementById shorcuts 
var repeatButton = document.getElementById("repeatBtn"),
repeatOneButton = document.getElementById("repeatOneBtn"),
shuffleButton = document.getElementById("shuffleBtn"),
audioSource = document.getElementById("source"),
trackName = document.getElementById("track"),
trackLength = document.getElementById("length"),
tracks = document.getElementById("tracks");
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
        trackNames[counter] = file;
        trackTitles[counter] = files[0].name;
        var song = document.createElement('input');
        var songLabel = document.createElement('label');
        songLabel.textContent = files[0].name;
        song.type = 'radio';
        song.id = "track" + counter;
        song.name = 'playListTracks';
        tracks.appendChild(song);
        tracks.appendChild(songLabel);
        
        songLabel.htmlFor = "track" + counter;
        document.getElementById("track" + counter).addEventListener("click", playTrack);
        document.getElementById("track" + counter).checked = "checked";
        counter++;
    }
};
//play track upon click
function playTrack() {
    idSearch = this.id.match(/\d+/)[0];
    current = idSearch;
    trackName.value = trackTitles[(idSearch)];
    audioSource.src = trackNames[idSearch];
    audioSource.play();
}
//fill in track info after meta data loads
function trackInfo() {
    trackName.value = trackTitles[current];
    var minutes = Math.floor(audioSource.duration / 60),
    seconds = audioSource.duration - minutes * 60;
    if (seconds < 10) {
        trackLength.value = minutes + ":0" + Math.round(seconds);
        trackLengths[current] = document.getElementById('length').value;
    }else{
        trackLength.value = minutes + ":" + Math.round(seconds);
        trackLengths[current] = document.getElementById('length').value;
    }
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