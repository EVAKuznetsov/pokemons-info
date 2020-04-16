import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import TableData from './components/TableData'

const App = () => {
	return (
		<Container>
			<Grid container justify="center">
				<Grid item md={10}>
					<TableData />
				</Grid>
			</Grid>
		</Container>
	)
}
export default App
