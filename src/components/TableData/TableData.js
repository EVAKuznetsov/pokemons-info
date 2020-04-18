import React from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import TablePokHead from './TableParts/TablePokHead'
import TablePokRow from './TableParts/TablePokRow'
import TablePokToolbar from './TableParts/TablePokToolbar'

import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: '20px',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 650,
		overflowX: 'scroll',
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}))

const TableData = ({ componentState, componentActions }) => {
	const classes = useStyles()
	const { order, orderBy, page, rowsPerPage, rows, findText } = componentState
	const {
		handleClick,
		handleChangePage,
		handleChangeRowsPerPage,
		handleRequestSort,
		getComparator,
		stableSort,
		onSearch,
		onClearFilter,
	} = componentActions

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<TablePokToolbar onSearch={onSearch} findText={findText} onClearFilter={onClearFilter} />
				<TableContainer>
					<Table className={classes.table} aria-label="enhanced table" size={'medium'}>
						<TablePokHead
							classes={classes}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									return (
										<TablePokRow key={row.id} row={row} index={index} onClickRow={handleClick} />
									)
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 20, 50]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	)
}

TableData.propTypes = {
	componentState: PropTypes.shape({
		order: PropTypes.isRequired,
		orderBy: PropTypes.string,
		page: PropTypes.number.isRequired,
		rowsPerPage: PropTypes.number,
		rows: PropTypes.arrayOf(PropTypes.object),
		findText: PropTypes.string,
	}),
	componentActions: PropTypes.objectOf(PropTypes.func),
}

export default TableData
