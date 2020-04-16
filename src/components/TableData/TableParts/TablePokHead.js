import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'

function TablePokHead(props) {
	const headCells = [
		{ id: 'id', numeric: false, sorted: true, label: 'Id' },
		{ id: 'avatar', numeric: false, sorted: false, label: 'Avatar' },
		{ id: 'name', numeric: true, sorted: true, label: 'Name' },
		{ id: 'type', numeric: true, sorted: false, label: 'Type' },
		{ id: 'base_experience', numeric: true, sorted: true, label: 'Base experience' },
	]
	const { classes, order, orderBy, onRequestSort } = props
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						{headCell.sorted ? (
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
							>
								{headCell.label}
								{orderBy === headCell.id ? (
									<span className={classes.visuallyHidden}>
										{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</span>
								) : null}
							</TableSortLabel>
						) : (
							headCell.label
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

export default TablePokHead
