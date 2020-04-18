import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import PokemonModal from './PokemonModal'

const PokemonModalContainer = ({ activePokemonStore }) => {
	const { activePokemonData: pokemon } = activePokemonStore

	const [open, setOpen] = useState(false)
	const [images, setImages] = useState([])
	const [value, setValue] = React.useState(0)

	const unknownAvatar =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQPCrB8wH5KKc8IhLNB5D-QE9Q0Rz8ID3pO-ScWvH4uaj6AuLp9&usqp=CAU'

	useEffect(() => {
		setOpen(Object.keys(pokemon).length > 0)
		getImagesArray(pokemon.sprites)
	}, [pokemon])

	const getImagesArray = (sprites) => {
		if (sprites) {
			const newImages = []
			for (const key in sprites) {
				if (sprites[key]) newImages.push({ name: key, url: sprites[key] })
			}
			setImages(newImages)
		}
	}
	const onCloseHandler = () => {
		activePokemonStore.setActivePokemon()
		setValue(0)
	}
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	const modalState = { pokemon, open, images, value, unknownAvatar }
	const modalActions = { onCloseHandler, handleChange }
	return <PokemonModal modalState={modalState} modalActions={modalActions} />
}
PokemonModalContainer.propTypes = {
	activePokemonStore: PropTypes.shape({
		activePokemonData: PropTypes.object,
	}),
}

export default inject('activePokemonStore')(observer(PokemonModalContainer))
