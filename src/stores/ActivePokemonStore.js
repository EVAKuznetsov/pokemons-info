import { computed, extendObservable, action, toJS } from 'mobx'

class ActivePokemonStore {
	constructor() {
		extendObservable(this, {
			_activePokemonData: {},
		})
	}

	@computed get activePokemonData() {
		return toJS(this._activePokemonData)
	}

	set activePokemonData(data) {
		this._activePokemonData = data
	}

	@action setActivePokemon(data) {
		this.activePokemonData = data || {}
	}
}

export default ActivePokemonStore
