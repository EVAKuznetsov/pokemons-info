import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Box from '@material-ui/core/Box'

import SearchField from '../../SearchField/SearchField'
import TypesList from '../../TypesList'

const TablePokToolbar = ({ onSearch, onClearFilter, findText }) => {
	const useToolbarStyles = makeStyles(() => ({
		root: {
			backgroundColor: '#d8d8d873',
			flexWrap: 'wrap',
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
				<Typography className={classes.title} variant="h4" id="tableTitle" component="div">
					Pokemons
				</Typography>
				<SearchField onSearch={onSearch} />
			</Box>
			{findText.length > 0 && (
				<Box className={classes.row} justifyContent="flex-end">
					<Box marginRight="10px">
						Filtered text: <b>"{findText}"</b>
					</Box>
					<Button
						variant="contained"
						size="small"
						color="primary"
						onClick={onClearFilter}
						className={classes.button}
						startIcon={<DeleteIcon />}
					>
						clear filter
					</Button>
				</Box>
			)}
			<Box className={classes.row}>
				<TypesList />
			</Box>
		</Toolbar>
	)
}

TablePokToolbar.propTypes = {
	onSearch: PropTypes.func.isRequired,
	onClearFilter: PropTypes.func.isRequired,
	findText: PropTypes.string,
}
export default TablePokToolbar
