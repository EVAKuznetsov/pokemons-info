import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

function TabPanel(props) {
	const { children, value, index, className, ...other } = props

	return (
		<Typography
			className={className}
			component="div"
			role="tabpanel"
			hidden={value !== index}
			{...other}
		>
			{value === index && <Box minHeight={'150px'}>{children}</Box>}
		</Typography>
	)
}

export default TabPanel
