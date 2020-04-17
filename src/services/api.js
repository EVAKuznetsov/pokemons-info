class Api {
	static fetchPokemonData = async () => {
		try {
			// первый запрос на получение колличества покемонов
			const firstResult = await request(`https://pokeapi.co/api/v2/pokemon?limit=1`)
			const commonData = await request(
				`https://pokeapi.co/api/v2/pokemon?limit=${firstResult.count}`
			)
			const pokemonPromises = await commonData.results.map((pokemon) => request(pokemon.url))
			const results = await Promise.all(pokemonPromises)
			return { data: results, count: commonData.count }
		} catch (error) {
			throw new Error(error)
		}
	}

	static fetchTypes = async () => {
		try {
			const types = await request(`https://pokeapi.co/api/v2/type`)
			return types.results
		} catch (error) {
			throw new Error(error)
		}
	}
}

const request = async (url = '', method = 'GET', data) => {
	const config = {
		method,
		headers: { 'content-type': 'aplication/json' },
	}
	if (method === 'POST' || method === 'PATCH') {
		config.body = JSON.stringify(data)
	}
	try {
		const res = await fetch(url, config)
		return await res.json()
	} catch (error) {
		throw new Error(error)
	}
}

export default Api
