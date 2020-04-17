import { computed, extendObservable, action, toJS, runInAction, autorun } from 'mobx'
import Api from '../services/api'

class PokemonTypesStore {
	constructor() {
		extendObservable(this, {
			_pokemonTypes: [],
			error: null,
		})
	}

	@computed get pokemonTypes() {
		return toJS(this._pokemonTypes)
	}

	set pokemonTypes(data) {
		this._pokemonTypes = data
	}

	@action async fetchPokemonTypes() {
		this.pokemonTypes = []
		try {
			this.pokemonTypes = await Api.fetchTypes()
		} catch (error) {
			runInAction(() => {
				this.error = error
			})
		}
	}

	getTypes = autorun(() => this.fetchPokemonTypes(), { delay: 100 })
}

export default PokemonTypesStore
