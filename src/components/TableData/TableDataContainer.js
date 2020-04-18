import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import TableData from './TableData'
import Loader from '../Loader'
import ErrorMessage from '../ErrorMessage'

const TableDataContainer = ({ pokedexStore, activePokemonStore }) => {
	const { pokemonData: rows, isLoading, findText, error } = pokedexStore
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('')
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	useEffect(() => {
		const countAllPage = Math.floor(rows.length / rowsPerPage)
		if (countAllPage < page) setPage(countAllPage)
	}, [page, rows.length, rowsPerPage])

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
	const handleClick = (pokemonData) => {
		activePokemonStore.setActivePokemon(pokemonData)
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
	const onReload = () => {
		pokedexStore.fetchData()
	}

	if (isLoading) return <Loader />
	if (error) return <ErrorMessage text={error} onReload={onReload} />
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

TableDataContainer.propTypes = {
	pokedexStore: PropTypes.shape({
		pokemonData: PropTypes.array,
		isLoading: PropTypes.bool,
		selectedTags: PropTypes.array,
		findText: PropTypes.string,
		error: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
	}),
	activePokemonStore: PropTypes.shape({
		activePokemonData: PropTypes.object,
	}),
}

export default inject('pokedexStore', 'activePokemonStore')(observer(TableDataContainer))
