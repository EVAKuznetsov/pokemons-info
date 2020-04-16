import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import Box from '@material-ui/core/Box'

import SearchField from '../../SearchField/SearchField'

const TablePokToolbar = ({ onSearch, onClearFilter, findText }) => {
	const useToolbarStyles = makeStyles((theme) => ({
		root: {
			backgroundColor: '#d8d8d873',
			flexWrap: 'wrap',
			transition: '0.3s',
		},
		highlight: {
			alignItems: 'center',
		},

		title: {
			flex: '1 1 100%',
		},
		row: {
			display: 'flex',
			alignItems: 'center',
			width: '100%',
			padding: '0px 10px 15px 10px',
		},
		clear: {
			flexGrow: 1,
			flexShrink: 0,
			height: '40px',
			width: '40px',
		},
	}))
	const classes = useToolbarStyles()

	return (
		<Toolbar className={classes.root}>
			<Box className={classes.row}>
				<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
					Pokemons!!!
				</Typography>
				<SearchField onSearch={onSearch} />
			</Box>
			<Box className={classes.row} justifyContent="flex-end">
				{findText.length > 0 && (
					<Button
						variant="contained"
						color="default"
						onClick={onClearFilter}
						className={classes.button}
						startIcon={<DeleteIcon />}
					>
						clear filter
					</Button>
				)}
			</Box>
		</Toolbar>
	)
}
export default TablePokToolbar
