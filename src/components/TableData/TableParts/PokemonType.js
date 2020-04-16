import React from 'react'
import Box from '@material-ui/core/Box'

const PokemonType = ({ type }) => {
	const typeColors = {
		normal: '#8A8A80',
		fire: '#FE6148',
		water: '#4B90D6',
		electric: '#FFCC32',
		grass: '#77CC55',
		ice: '#7ED4FF',
		fighting: '#BA5544',
		poison: '#AA5599',
		ground: '#D8BD6C',
		flying: '#9AA9FE',
		psychic: '#FF6FA9',
		bug: '#AABB22',
		rock: '#C5B67E',
		ghost: '#7D7EC6',
		dragon: '#7766ED',
		dark: '#795848',
		steel: '#B7B7C5',
		fairy: '#F1A9F0',
	}
	return (
		<Box
			component="span"
			display="inline"
			bgcolor={typeColors[type]}
			color="#ffffff"
			padding={'5px'}
			margin={'5px'}
			borderRadius={5}
		>
			{type}
		</Box>
	)
}

export default PokemonType
