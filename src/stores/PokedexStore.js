import { extendObservable, computed, action, configure, runInAction, toJS, autorun } from 'mobx'
import Api from '../services/api'

configure({ enforceActions: 'observed' })
class PokedexStore {
	constructor() {
		extendObservable(this, {
			_pokemonData: [],
			isLoading: true,
			selectedTags: [],
			findText: '',
			error: null,
		})
	}

	@computed get pokemonData() {
		const data = toJS(this._pokemonData)
		if (!this.findText.length > 0) return data
		return data.filter((elem) => elem.name.toLowerCase().includes(this.findText.toLowerCase()))
	}

	set pokemonData(data) {
		this._pokemonData = data
	}

	// @computed get findText() {
	// 	return this._findText
	// }

	// set findText(value) {
	// 	this._findText = value
	// }

	@action async fetchData(limit, offset) {
		this.isLoading = true
		this.error = ''

		try {
			const result = await Api.fetchPokemonData(limit, offset)
			runInAction(() => {
				this.pokemonData = result.data.map((item) => ({
					id: item.id,
					name: item.name,
					avatar: item.sprites.front_default || item.sprites.back_default,
					types: item.types,
					base_experience: item.base_experience,
				}))
			})
		} catch (e) {
			runInAction(() => {
				this.pokemonData = []
				this.error = 'Произошла ошибка при получении списка покемонов'
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

	reactToMountTable = autorun(
		() => {
			this.fetchData()
		},
		{ delay: 100 }
	)
}

export default PokedexStore
