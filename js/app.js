class MusicPlayer {
    constructor(musicList, ui) {
        this.musicList = musicList,
            this.ui = ui,
            this.index = 0
        this.played = false
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
        const minute = Math.floor(seconds / 60)
        const second = Math.floor(seconds % 60)
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
            <span id="time">00:00</span>
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
        this.ui.nextBtn.addEventListener("click", () => this.next())
        this.ui.prevBtn.addEventListener("click", () => this.prev())
        this.ui.playBtn.addEventListener("click", () => this.play())

        this.ui.audio.addEventListener('loadedmetadata', () => {
            const endTime = this.calc(this.ui.audio.duration);
            const currTime = this.calc(this.ui.audio.currentTime);
            this.ui.timeStart.textContent = currTime
            this.ui.timeEnd.textContent = endTime

        })

        this.ui.audio.addEventListener('timeupdate', () => {
            this.ui.timeStart.textContent = this.calc(this.ui.audio.currentTime);
            this.ui.timeEnd.textContent = this.calc(this.ui.audio.duration - this.ui.audio.currentTime)
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
