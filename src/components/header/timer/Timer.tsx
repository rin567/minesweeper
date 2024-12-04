import { FC } from 'react'
import { ITimerProps } from '../../../types/types'
import styles from './Timer.module.css'

const Timer: FC<ITimerProps> = ({ time }) => {
	let firstNum = 'number' + Math.trunc(time / 10)
	let secondNum = 'number' + (time % 10)

	return (
		<div className={styles.container}>
			<div className={styles.numbers + ' ' + styles.number0}></div>
			<div className={styles.numbers + ' ' + styles[firstNum]}></div>
			<div className={styles.numbers + ' ' + styles[secondNum]}></div>
		</div>
	)
}

export default Timer
