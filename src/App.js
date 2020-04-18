import React from 'react'
import Container from '@material-ui/core/Container'

import TableData from './components/TableData'
import PokemonModal from './components/PokemonModal'

const App = () => {
	return (
		<Container>
			<TableData />
			<PokemonModal />
		</Container>
	)
}
export default App
