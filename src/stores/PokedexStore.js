import { extendObservable, computed, action, configure, runInAction, toJS, autorun } from 'mobx'
import Api from '../services/api'

configure({ enforceActions: 'observed' })
class PokedexStore {
	constructor() {
		extendObservable(this, {
			_pokemonData: [],
			isLoading: true,
			_selectedTags: [],
			findText: '',
			error: null,
		})
	}

	@computed get pokemonData() {
		const data = toJS(this._pokemonData)
		if (!this.findText.length > 0 && !this.selectedTags.length > 0) return data
		const filteredData = data.filter((elem) => {
			if (this.findText.length > 0 && this.selectedTags.length > 0) {
				return (
					elem.name.toLowerCase().includes(this.findText.toLowerCase()) &&
					elem.types.filter((type) => this.selectedTags.includes(type.type.name)).length > 0
				)
			} else if (this.selectedTags.length > 0) {
				return elem.types.filter((type) => this.selectedTags.includes(type.type.name)).length > 0
			} else if (this.findText.length > 0) {
				return elem.name.toLowerCase().includes(this.findText.toLowerCase())
			}
			return true
		})
		return filteredData
	}

	set pokemonData(data) {
		this._pokemonData = data
	}

	@computed get selectedTags() {
		return toJS(this._selectedTags)
	}

	set selectedTags(data) {
		this._selectedTags = data
	}

	@action async fetchData() {
		this.isLoading = true
		this.error = ''

		try {
			const result = await Api.fetchPokemonData()
			runInAction(() => {
				this.pokemonData = result.data.map((item) => {
					const stats = item.stats.map((elem) => ({
						name_stat: elem.stat.name,
						base_stat: elem.base_stat,
					}))
					return {
						id: item.id,
						name: item.name,
						avatar: item.sprites.front_default || item.sprites.back_default,
						types: item.types,
						base_experience: item.base_experience,
						height: item.height,
						weight: item.weight,
						stats,
						sprites: item.sprites,
					}
				})
			})
		} catch (e) {
			runInAction(() => {
				this.pokemonData = []
				this.error = 'Error getting pokemon list.'
			})
		}
		runInAction(() => {
			this.isLoading = false
		})
	}

	@action onSearchPokemon(value) {
		if (value) this.findText = value
	}

	@action clearFilter() {
		this.findText = ''
	}

	@action addSelectedTag(tag) {
		const newSelectedTags = [...this.selectedTags]
		newSelectedTags.push(tag)
		this.selectedTags = newSelectedTags
	}

	@action removeSelectedTag(tag) {
		const newSelectedTags = [...this.selectedTags]
		const indexTag = newSelectedTags.indexOf(tag)
		newSelectedTags.splice(indexTag, 1)
		this.selectedTags = newSelectedTags
	}

	reactToMountTable = autorun(
		() => {
			this.fetchData()
		},
		{ delay: 100 }
	)
}

export default PokedexStore
