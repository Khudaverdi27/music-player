class MusicPlayer {
    constructor(musicList, ui) {
        this.musicList = musicList,
            this.ui = ui,
            this.index = 0
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

        this.displayMusic()
    }
    prev() {
        if (this.index > 0) {
            this.index--
        } else {
            this.index = this.musicList.length - 1
        }

        this.displayMusic()
    }
    event() {
        this.ui.nextBtn.addEventListener("click", () => {
            this.next()
        })
        this.ui.prevBtn.addEventListener("click", () => {
            this.prev()
        })

        this.ui.audio.addEventListener('loadedmetadata', () => {
            const endTime = this.calc(this.ui.audio.duration);
            const currTime = this.calc(this.ui.audio.currentTime);
            this.ui.timeStart.textContent = currTime
            this.ui.timeEnd.textContent = endTime

        })
    }
}
