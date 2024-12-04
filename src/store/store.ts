import { makeAutoObservable } from 'mobx'
import { myMask } from '../features/constants'
import { fieldService } from '../features/fieldService'
import { ITime } from '../types/types'

class Store {
	start: number = 0
	size: number = 16
	mask = Array(this.size * this.size).fill(myMask.base)
	field = fieldService.createField(this.size)
	time: ITime = { minuties: 40, seconds: 0 }
	smiley: string = 'happy'
	constructor() {
		makeAutoObservable(this, {}, { deep: true, autoBind: true })
	}
}

export const store = new Store()
