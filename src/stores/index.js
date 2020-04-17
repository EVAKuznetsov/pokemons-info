import PokedexStore from './PokedexStore'
import ActivePokemonStore from './ActivePokemonStore'
import PokemonTypesStore from './PokemonTypesStore'

const stores = {
	pokedexStore: new PokedexStore(),
	activePokemonStore: new ActivePokemonStore(),
	pokemonTypesStore: new PokemonTypesStore(),
}

export default stores
