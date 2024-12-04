import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { myMask } from '../../../features/constants'
import { fieldService } from '../../../features/fieldService'
import { store } from '../../../store/store'
import { ICellProps } from '../../../types/types'
import styles from './Cell.module.css'

const Cell: FC<ICellProps> = observer(({ x, y }) => {
	let numCell = store.field[y * store.size + x]
	if (store.mask[y * store.size + x] !== myMask.transparent) {
		numCell = store.mask[y * store.size + x]
	}

	return (
		<div
			onClick={e => {
				if (!e.ctrlKey) {
					fieldService.onClickHandler(x, y)
				}
			}}
			onMouseUp={() => {
				fieldService.onMouseUpHandler(x, y)
			}}
			onMouseDown={e => {
				fieldService.onMouseDownHandler(e, x, y)
			}}
			onDoubleClick={() => fieldService.onDoubleClickHandler(x, y)}
			onContextMenu={e => {
				e.preventDefault()
				e.stopPropagation()
				fieldService.onContextMenuHandler(x, y)
			}}
			className={styles.cell + ' ' + styles[`cell${numCell}`]}
		></div>
	)
})
export default Cell
