console.log("Welcome Hewmens");

let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('Progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let Songs = [
    { songName: "Cold Out Here", filepath: "./songs/Cold Out Here.mp3", coverPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuVA7fShFHXYfb2llkqPiTo8Ube6k-F14Rqg&s" },
    { songName: "Out Of Time", filepath: "./songs/Out Of Time.mp3", coverPath: "https://t2.genius.com/unsafe/430x430/https%3A%2F%2Fimages.genius.com%2F9d188abfba0fa3e96ed613adc56f4597.1000x1000x1.jpg" },
    { songName: "Just Cry No Cues", filepath: "./songs/Just Cry No Cues.mp3", coverPath: "https://t2.genius.com/unsafe/430x430/https%3A%2F%2Fimages.genius.com%2F9d188abfba0fa3e96ed613adc56f4597.1000x1000x1.jpg" },
    { songName: "Cry on Cue Please", filepath: "./songs/Cry on Cue Please.mp3", coverPath: "https://t2.genius.com/unsafe/430x430/https%3A%2F%2Fimages.genius.com%2F3dbc87e962f8812878835dd138873989.1000x1000x1.png" },
    { songName: "Feels Like Home", filepath: "./songs/Feels like home.mp3", coverPath: "https://t2.genius.com/unsafe/430x430/https%3A%2F%2Fimages.genius.com%2Fd6bed2c784f7270b85a8733d192cc4e0.1000x1000x1.png" },
    { songName: "Can't take it anymore", filepath: "./songs/can't take it anymore.mp3", coverPath: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/57/3d/ab/573dab76-c2c9-3f9d-87e7-f857943017db/artwork.jpg/316x316bb.webp" },
    { songName: "Right on time", filepath: "./songs/right on time.mp3", coverPath: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/6c/69/12/6c691249-8abd-42c8-f8ad-e4163ce7040f/5063655253790_cover.jpg/316x316bb.webp" },
    { songName: "Coffee shop", filepath: "./songs/coffee shop.mp3", coverPath: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a6/0d/0e/a60d0ec4-37e4-1bdf-49d4-d61bbd1e9d66/artwork.jpg/316x316bb.webp" },
    { songName: "Crazy loco", filepath: "./songs/crazy loco.mp3", coverPath: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c6/92/b0/c692b030-aabd-01bd-213f-1bd395f60ad1/199538553215.jpg/316x316bb.webp" },
    { songName: "You feel me?", filepath: "./songs/you feel me.mp3", coverPath: "https://t2.genius.com/unsafe/430x430/https%3A%2F%2Fimages.genius.com%2Fbdad896cc9092848eed0e8b076f13e1e.1000x1000x1.png" },
    { songName: "December", filepath: "./songs/december.mp3", coverPath: "https://t2.genius.com/unsafe/430x430/https%3A%2F%2Fimages.genius.com%2F1eef87cc835355676547015ad4dc4931.1000x1000x1.png" }
];


songItems.forEach((element, i) => {
    if(element.getElementsByTagName("img")[0]) {
        element.getElementsByTagName("img")[0].src = Songs[i].coverPath;
    }
    if(element.getElementsByClassName("songName")[0]) {
        element.getElementsByClassName("songName")[0].innerText = Songs[i].songName;
    }
});

masterPlay.addEventListener('click', () => {
    if (!audioElement.src) {
        audioElement.src = Songs[songIndex].filepath;
        audioElement.currentTime = 0;
    }
    
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
});

// Seek functionality
progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});

// Reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    });
}

// Song item play/pause
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-circle-play')) {
            makeAllPlays();
            songIndex = i;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = Songs[songIndex].filepath;
            masterSongName.innerText = Songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        } else {
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
        }
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % Songs.length;
    audioElement.src = Songs[songIndex].filepath;
    masterSongName.innerText = Songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + Songs.length) % Songs.length;
    audioElement.src = Songs[songIndex].filepath;
    masterSongName.innerText = Songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
