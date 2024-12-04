import { store } from '../store/store'
import { myMask } from './constants'
import { fieldService } from './fieldService'
class HeaderService {
	timer: ReturnType<typeof setInterval> | null = null
	tick() {
		if (store.time.minuties === 0 && store.time.seconds === 0) {
			return
		}
		if (store.time.seconds === 0) {
			store.time.minuties -= 1
			store.time.seconds = 59
		} else {
			store.time.seconds -= 1
		}
	}
	clearTimer() {
		if (this.timer) {
			clearInterval(this.timer)
		}
	}
	startGame() {
		store.start += 1
		store.time.minuties = 40
		store.time.seconds = 0
		this.clearTimer()
		this.timer = setInterval(this.tick, 1000)
		store.field = fieldService.createField(store.size)
		store.mask = Array(store.size * store.size).fill(myMask.base)
		store.smiley = 'happy'
	}
}
export const headerService = new HeaderService()
