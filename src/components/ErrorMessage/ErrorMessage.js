import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import { Alert, AlertTitle } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}))

const ErrorMessage = ({ text, onReload }) => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Collapse in>
				<Alert severity="error">
					<AlertTitle>Error</AlertTitle>
					{text} <strong>check it out!</strong>
				</Alert>
			</Collapse>
			<Button variant="outlined" onClick={onReload}>
				Reload
			</Button>
		</div>
	)
}
ErrorMessage.propTypes = {
	text: PropTypes.string,
	onReload: PropTypes.func.isRequired,
}

export default ErrorMessage
