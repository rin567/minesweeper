import { observer } from 'mobx-react-lite'
import { store } from '../../store/store'
import styles from './Header.module.css'
import Smiley from './smiley/Smiley'
import Timer from './timer/Timer'

const Header = observer(() => {
	return (
		<div className={styles.header}>
			<Timer time={store.time.minuties}></Timer>
			<Smiley></Smiley>
			<Timer time={store.time.seconds}></Timer>
		</div>
	)
})
export default Header
