import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'

const Loader = () => {
	return (
		<Box display="flex" padding="50px 0" alignItems="center" justifyContent="center" width="100%">
			<CircularProgress />
		</Box>
	)
}

export default Loader
