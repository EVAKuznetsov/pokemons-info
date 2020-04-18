import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: '5px 10px',
		},
	},
}))
const TypesList = ({ pokemonTypesStore, pokedexStore }) => {
	const classes = useStyles()
	const { selectedTags } = pokedexStore

	const onAddTagHandler = (tag) => {
		pokedexStore.addSelectedTag(tag)
	}
	const onRemoveTagHandler = (tag) => {
		pokedexStore.removeSelectedTag(tag)
	}

	return (
		<Box className={classes.root}>
			{pokemonTypesStore.pokemonTypes.map((type) =>
				selectedTags.includes(type.name) ? (
					<Chip
						key={type.name}
						size="small"
						label={type.name}
						onDelete={() => onRemoveTagHandler(type.name)}
						color="primary"
					/>
				) : (
					<Chip
						key={type.name}
						size="small"
						label={type.name}
						variant="outlined"
						onClick={() => onAddTagHandler(type.name)}
						color="default"
					/>
				)
			)}
		</Box>
	)
}
TypesList.propTypes = {
	pokemonTypesStore: PropTypes.shape({
		pokemonTypes: PropTypes.array,
		error: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
	}),
	pokedexStore: PropTypes.shape({
		pokemonData: PropTypes.array,
		isLoading: PropTypes.bool,
		selectedTags: PropTypes.array,
		findText: PropTypes.string,
		error: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
	}),
}

export default inject('pokemonTypesStore', 'pokedexStore')(observer(TypesList))
