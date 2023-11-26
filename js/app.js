class MusicPlayer {
    constructor(musicList, ui) {
        this.musicList = musicList,
            this.ui = ui,
            this.index = 0
        this.played = false
        this.volumed = true
        this.event()
    }

    displayMusic() {
        const music = this.musicList[this.index]
        this.ui.musicPhoto.src = `${music.img}`
        this.ui.audio.src = `${music.mp3}`
        this.ui.musicName.textContent = music.name
        this.ui.author.textContent = music.author
    }

    calc(seconds) {
        const minute = Math.floor(seconds / 60) || 0
        const second = Math.floor(seconds % 60) || 0
        return `${minute}:${second < 10 ? "0" + second : second}`
    }
    next() {
        if (this.index + 1 < this.musicList.length) {
            this.index++
        } else {
            this.index = 0
        }
        this.createPlayList()
        this.displayMusic()
        if (this.played) {
            this.play(true)
        }

    }
    prev() {
        if (this.index > 0) {
            this.index--
        } else {
            this.index = this.musicList.length - 1
        }
        this.createPlayList()
        this.displayMusic()
        if (this.played) {
            this.play(true)
        }
    }
    play(status = false) {

        if (status) {
            this.played = true
        } else {
            this.played = !this.played
        }

        if (this.played) {
            this.ui.audio.play()
            this.ui.playBtn.querySelector('i').classList = 'fa-solid fa-pause'
        } else {
            this.ui.audio.pause()
            this.ui.playBtn.querySelector('i').classList = 'fa-solid fa-play'

        }

    }
    createPlayList() {
        const list = this.musicList.map((music, musicIndex) => {
            return ` <div data-id=${musicIndex} class="songBox d-flex justify-between m-top-7 ${this.index == musicIndex ? 'color-orange' : 'color-white'}">
            <p id="song">${music.author}-${music.name}</p>
         
            </div>`
        }).join('')
        this.ui.musicList.innerHTML = list
        document.querySelectorAll('.songBox').forEach((song) => {
            song.addEventListener('click', () => {
                const index = song.getAttribute('data-id')
                this.index = parseInt(index)
                this.displayMusic()
                this.createPlayList()
                this.play(true)
            })
        })

    }

    event() {
        const obj = this
        this.ui.nextBtn.addEventListener("click", () => this.next())
        this.ui.prevBtn.addEventListener("click", () => this.prev())
        this.ui.playBtn.addEventListener("click", () => this.play())
        // music start and end time
        this.ui.audio.addEventListener('loadedmetadata', () => {
            const endTime = this.calc(this.ui.audio.duration);
            const currTime = this.calc(this.ui.audio.currentTime);
            this.ui.timeStart.textContent = currTime
            this.ui.timeEnd.textContent = endTime


        })
        // volume icon
        this.ui.volume.addEventListener('click', () => {
            this.volumed = !this.volumed
            if (!this.volumed) {
                this.ui.audio.muted = true
                this.ui.volume.classList = 'fa-solid fa-volume-xmark'
                this.ui.volumeLive.style.width = '0%'
            } else {
                this.ui.audio.muted = false
                this.ui.volume.classList = 'fa solid fa-volume-high'
                this.ui.volumeLive.style.width = '100%'
            }

        })
        // volume progress bar
        this.ui.volumeControl.addEventListener('click', function (e) {
            const control = this.getBoundingClientRect();
            const progress = ((e.clientX - control.left) / control.width)
            obj.ui.volumeLive.style.width = `${progress * 100}%`;
            obj.ui.audio.volume = progress
        })
        // music progress bar
        this.ui.musicLine.addEventListener('click', function (e) {
            const controlBar = this.getBoundingClientRect();
            const progress = ((e.clientX - controlBar.left) / controlBar.width)
            obj.ui.musicLive.style.width = `${progress * 100}%`;

            obj.ui.timeStart.textContent = obj.calc(progress * obj.ui.audio.duration)
            obj.ui.audio.currentTime = progress * obj.ui.audio.duration
        })
        // music current time and end time progress
        this.ui.audio.addEventListener('timeupdate', () => {
            this.ui.timeStart.textContent = this.calc(this.ui.audio.currentTime);
            this.ui.timeEnd.textContent = this.calc(this.ui.audio.duration - this.ui.audio.currentTime)

            const total = (this.ui.audio.currentTime / this.ui.audio.duration) * 100
            this.ui.musicLive.style.width = total + `%`

            if (this.ui.audio.currentTime == this.ui.audio.duration) {
                this.next()
            }
        })

        document.addEventListener('keydown', (e) => {
            if (e.code == 'ArrowRight') {
                this.next()
            }
            else if (e.code == 'ArrowLeft') {
                this.prev()
            }
            else if (e.code == 'Space') {
                this.play(true)
            }

        })
    }
}
