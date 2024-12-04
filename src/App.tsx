import './App.css'
import Field from './components/field/Field'
import Header from './components/header/Header'

const App = () => {
	return (
		<div className='app'>
			<div className='mineweeper'>
				<Header />
				<Field />
			</div>
		</div>
	)
}

export default App
