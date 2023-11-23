const UI = {
    musicList: document.getElementById('musicList'),
    musicPhoto: document.getElementById('musicPhoto'),
    musicName: document.getElementById('musicName'),
    author: document.getElementById('author'),
    audio: document.getElementById('audio'),
    timeStart: document.getElementById('timeStart'),
    timeEnd: document.getElementById('timeEnd'),
    prevBtn: document.getElementById('prevBtn'),
    playBtn: document.getElementById('playBtn'),
    nextBtn: document.getElementById('nextBtn'),
    volume: document.getElementById('volume'),
    volumeLive: document.getElementById('volumeLive'),
    musicLive: document.getElementById('musicLive'),
    musicLine: document.getElementById('musicLine'),
    volumeControl: document.getElementById('volumeControl'),
    time: document.getElementById('time'),
}

const player = new MusicPlayer(musics, UI);
player.displayMusic()
player.createPlayList() 