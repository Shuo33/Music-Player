const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');


// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2; 


// Update song details to the DOM
function loadSong(song) {
    title.innerText = song; 
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`; 
}

// Initially load song details 
loadSong(songs[songIndex]); 


// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}


// Pause song 
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}


// Prev song
function prevSong() {
    songIndex--; 

    if (songIndex < 0) {
        songIndex = songs.length - 1; 
    }

    loadSong(songs[songIndex]);

    playSong();
}



// Next song
function nextSong() {
    songIndex++; 

    if (songIndex > songs.length - 1) {
        songIndex = 0; 
    }

    loadSong(songs[songIndex]);

    playSong();
}


// Update progress bar 
function updateProgress(e) {
    const { currentTime, duration } = e.target; 
    const percentage = (currentTime / duration) * 100;

    progress.style.width = `${percentage}%`;
}

// Click on progress bar
function setProgress(e) {
    // the total length of the progress bar that got clicked
    const width = this.clientWidth; 

    // the length where the bar get clicked
    const clickX = e.offsetX;

    const duration = audio.duration; 

    audio.currentTime = (clickX / width) * duration; 
}




// Event listeners 
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});


// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update: 'timeupdate' event is fired when the time indicated by the 'currentTime' attribute has been updated
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);