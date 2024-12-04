import { observer } from 'mobx-react-lite'
import { store } from '../../store/store'
import Cell from './cell/Cell'
import styles from './Field.module.css'

const Field = observer(() => {
	const dimension = Array(store.size).fill(0)
	return (
		<div className={styles.fieldContainer}>
			{dimension.map((_, y) => {
				return (
					<div className={styles.row} key={y}>
						{dimension.map((_, x) => {
							return <Cell key={y * store.size + x} x={x} y={y}></Cell>
						})}
					</div>
				)
			})}
		</div>
	)
})
export default Field
