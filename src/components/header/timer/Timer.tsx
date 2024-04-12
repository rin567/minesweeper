import styles from './Timer.module.css'

const Timer = (time: number) => {
	let firstNum = 'number' + Math.trunc(time / 10)
	let secondNum = 'number' + (time % 10)

	return (
		<div className='container'>
			<div className='numbers number0'></div>
			<div className={styles.numbers + styles[firstNum]}></div>
			<div className={styles.numbers + styles[secondNum]}></div>
		</div>
	)
}

export default Timer
