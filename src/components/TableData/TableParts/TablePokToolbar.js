import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import SearchField from '../../SearchField/SearchField'
import TypesList from '../../TypesList'

const TablePokToolbar = ({ onSearch, onClearFilter, findText }) => {
	const useToolbarStyles = makeStyles(() => ({
		root: {
			backgroundColor: '#d8d8d873',
			flexWrap: 'wrap',
			paddingTop: '15px',
			paddingBottom: '15px',
		},
		highlight: {
			alignItems: 'center',
		},

		title: {
			flex: '1 1 100%',
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
			<Grid container alignItems="center" spacing={2}>
				<Grid item xs={12} sm>
					<Typography className={classes.title} variant="h4" id="tableTitle" component="div">
						Pokemons
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<SearchField onSearch={onSearch} />
				</Grid>

				{findText.length > 0 && (
					<Grid container item alignItems="center" xs={12} justify="flex-end">
						<Box marginRight="10px">
							Filtered text: <b>"{findText}"</b>
						</Box>
						<Button
							variant="contained"
							size="small"
							color="primary"
							onClick={onClearFilter}
							startIcon={<DeleteIcon />}
						>
							clear filter
						</Button>
					</Grid>
				)}

				<Grid item xs={12}>
					<TypesList />
				</Grid>
			</Grid>
		</Toolbar>
	)
}

TablePokToolbar.propTypes = {
	onSearch: PropTypes.func.isRequired,
	onClearFilter: PropTypes.func.isRequired,
	findText: PropTypes.string,
}
export default TablePokToolbar
