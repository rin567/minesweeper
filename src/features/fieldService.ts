import { store } from '../store/store'
import { bomb, crossBomb, myMask, redBomb } from './constants'
import { headerService } from './headerService'

class FieldService {
	createField(size: number): number[] {
		const myField = Array(size * size).fill(0)

		function inc(x: number, y: number): void {
			if (x >= 0 && x < size && y >= 0 && y < size) {
				if (myField[y * size + x] === bomb) return
				myField[y * size + x] += 1
			}
		}

		for (let i = 0; i < size * 2; ) {
			const x = Math.floor(Math.random() * size)
			const y = Math.floor(Math.random() * size)

			if (myField[y * size + x] === bomb) continue

			myField[y * size + x] = bomb
			i++

			inc(x + 1, y)
			inc(x - 1, y)
			inc(x, y + 1)
			inc(x, y - 1)
			inc(x + 1, y - 1)
			inc(x - 1, y - 1)
			inc(x + 1, y + 1)
			inc(x - 1, y + 1)
		}
		return myField
	}
	firstClick(x: number, y: number) {
		let countBomb = 0

		function dec(x: number, y: number) {
			if (x >= 0 && x < store.size && y >= 0 && y < store.size) {
				if (store.field[y * store.size + x] === bomb) {
					countBomb++
					return
				}
				store.field[y * store.size + x] -= 1
			}
			return countBomb
		}

		if (store.field[y * store.size + x] === bomb) {
			dec(x + 1, y)
			dec(x - 1, y)
			dec(x, y + 1)
			dec(x, y - 1)
			dec(x + 1, y - 1)
			dec(x - 1, y - 1)
			dec(x + 1, y + 1)
			dec(x - 1, y + 1)
			store.field[y * store.size + x] = countBomb
		}
	}

	clear(x: number, y: number) {
		const clearing: number[][] = []

		function pushClearing(x: number, y: number): void {
			if (x >= 0 && x < store.size && y >= 0 && y < store.size) {
				if (store.mask[y * store.size + x] === myMask.transparent) return
				clearing.push([x, y])
			}
		}

		pushClearing(x, y)

		while (clearing.length) {
			const [x, y] = clearing.pop() || []

			store.mask[y * store.size + x] = myMask.transparent

			if (store.field[y * store.size + x] !== 0) continue

			pushClearing(x + 1, y)
			pushClearing(x + 1, y - 1)
			pushClearing(x + 1, y + 1)
			pushClearing(x - 1, y)
			pushClearing(x - 1, y - 1)
			pushClearing(x - 1, y + 1)
			pushClearing(x, y + 1)
			pushClearing(x, y - 1)
		}
	}

	isBomb(x: number, y: number) {
		if (store.field[y * store.size + x] === bomb) {
			store.start = 0
			store.smiley = 'loser'
			headerService.clearTimer()
			store.field[y * store.size + x] = redBomb
			store.field.forEach((cell, i) => {
				if (cell === bomb) {
					if (store.mask[i] === myMask.flag) {
						store.field[i] = crossBomb
					}
					store.mask[i] = myMask.transparent
				}
			})
		}
	}

	onClickHandler(x: number, y: number) {
		if (!store.start) return
		if (store.mask[y * store.size + x] === myMask.transparent) return
		if (store.mask.every(m => m === myMask.base)) {
			fieldService.firstClick(x, y)
		}
		this.clear(x, y)
		this.isBomb(x, y)
		if (store.start) {
			if (
				store.field.every(
					(cell, i) => cell === bomb || store.mask[i] === myMask.transparent
				)
			) {
				this.youWin()
			}
		}
	}
	onMouseUpHandler(x: number, y: number) {
		if (store.mask[y * store.size + x] === myMask.transparent) return
		if (!store.start) return
		store.smiley = 'happy'
	}
	onMouseDownHandler(
		e: React.MouseEvent<HTMLDivElement>,
		x: number,
		y: number
	) {
		if (store.mask[y * store.size + x] === myMask.transparent) return
		if (!store.start) return
		if (e.button === 0) {
			store.smiley = 'wow'
		}
	}
	onDoubleClickHandler(x: number, y: number) {
		if (
			store.mask[y * store.size + x] === myMask.base ||
			store.field[y * store.size + x] === 0
		)
			return
		let arr: number[][] = []
		let countFlag = 0
		function pushArr(x: number, y: number) {
			if (x >= 0 && x < store.size && y >= 0 && y < store.size) {
				if (store.mask[y * store.size + x] === myMask.transparent) return
				if (store.mask[y * store.size + x] === myMask.flag) {
					countFlag++
					return
				}
				arr.push([x, y])
			}
		}
		pushArr(x + 1, y)
		pushArr(x - 1, y)
		pushArr(x, y + 1)
		pushArr(x, y - 1)
		pushArr(x + 1, y - 1)
		pushArr(x - 1, y - 1)
		pushArr(x + 1, y + 1)
		pushArr(x - 1, y + 1)
		if (countFlag === store.field[y * store.size + x]) {
			while (arr.length) {
				const [x, y] = arr.pop() || []
				if (store.field[y * store.size + x] === 0) {
					this.clear(x, y)
				} else {
					store.mask[y * store.size + x] = myMask.transparent
					if (store.field[y * store.size + x] === bomb) this.isBomb(x, y)
				}
			}
		}
		if (store.start) {
			if (
				store.field.every(
					(cell, i) => cell === bomb || store.mask[i] === myMask.transparent
				)
			) {
				this.youWin()
			}
		}
	}

	onContextMenuHandler(x: number, y: number) {
		if (!store.start) return
		switch (store.mask[y * store.size + x]) {
			case myMask.base:
				store.mask[y * store.size + x] = myMask.flag
				if (
					store.field.every(
						(cell, i) => cell !== bomb || store.mask[i] === myMask.flag
					)
				) {
					this.youWin()
				}
				break
			case myMask.flag:
				store.mask[y * store.size + x] = myMask.question
				break
			case myMask.question:
				store.mask[y * store.size + x] = myMask.base
				break
			default:
				return
		}
	}
	youWin() {
		store.start = 0
		store.smiley = 'cool'
		headerService.clearTimer()
	}
}

export const fieldService = new FieldService()
