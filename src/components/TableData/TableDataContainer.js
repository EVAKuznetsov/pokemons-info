import React from 'react'
import { inject, observer } from 'mobx-react'

import TableData from './TableData'
import Loader from '../Loader'

const TableDataContainer = ({ pokedexStore }) => {
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('')
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)
	const { pokemonData: rows, isLoading, findText } = pokedexStore

	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1
		}
		if (b[orderBy] > a[orderBy]) {
			return 1
		}
		return 0
	}

	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy)
	}

	function stableSort(array, comparator) {
		const stabilizedThis = array.map((el, index) => [el, index])
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0])
			if (order !== 0) return order
			return a[1] - b[1]
		})
		return stabilizedThis.map((el) => el[0])
	}

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}
	const handleClick = (event, name) => {
		alert('модалка')
	}
	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}
	const onSearch = (value) => {
		pokedexStore.onSearchPokemon(value)
	}
	const onClearFilter = () => {
		pokedexStore.clearFilter()
	}

	if (isLoading) return <Loader />
	return (
		<TableData
			componentState={{
				order,
				orderBy,
				page,
				rowsPerPage,
				rows,
				findText,
			}}
			componentActions={{
				handleClick,
				handleChangePage,
				handleChangeRowsPerPage,
				handleRequestSort,
				getComparator,
				stableSort,
				onSearch,
				onClearFilter,
			}}
		/>
	)
}

export default inject('pokedexStore')(observer(TableDataContainer))
