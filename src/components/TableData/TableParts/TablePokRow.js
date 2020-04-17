import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Box from '@material-ui/core/Box'

import PokemonType from '../../PokemonType'

const TablePokRow = ({ row, index, onClickRow }) => {
	const labelId = `enhanced-table-checkbox-${index}`
	const unknownAvatar =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQPCrB8wH5KKc8IhLNB5D-QE9Q0Rz8ID3pO-ScWvH4uaj6AuLp9&usqp=CAU'
	return (
		<TableRow hover onClick={() => onClickRow(row)} tabIndex={-1} key={row.id}>
			<TableCell component="th" id={labelId} scope="row" padding="default" align="left">
				{row.id}
			</TableCell>
			<TableCell align="left">
				<img style={{ height: 70 }} src={row.avatar ? row.avatar : unknownAvatar} alt="img" />
			</TableCell>
			<TableCell align="right">
				<Box fontWeight="700">{row.name}</Box>
			</TableCell>
			<TableCell align="right">
				{row.types.map((type) => (
					<PokemonType key={type.slot} type={type.type.name} />
				))}
			</TableCell>
			<TableCell align="right">{row.base_experience} exp</TableCell>
		</TableRow>
	)
}

export default TablePokRow
