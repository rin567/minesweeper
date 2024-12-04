import { observer } from 'mobx-react-lite'
import { headerService } from '../../../features/headerService'
import { store } from '../../../store/store'
import styles from './Smiley.module.css'

const Smiley = observer(() => {
	return (
		<div
			onClick={() => {
				headerService.startGame()
			}}
			className={styles.smiley + ' ' + styles[`${store.smiley}`]}
		></div>
	)
})
export default Smiley
