class Api {
	static fetchPokemonData = async () => {
		try {
			// первый запрос на получение колличества покемонов
			const firstResult = await request(`https://pokeapi.co/api/v2/pokemon?limit=1`)
			const commonData = await request(
				`https://pokeapi.co/api/v2/pokemon?limit=5` // ${firstResult.count}
			)
			const pokemonPromises = await commonData.results.map((pokemon) => request(pokemon.url))
			const results = await Promise.all(pokemonPromises)
			return { data: results, count: commonData.count }
		} catch (e) {
			console.log(e)
			throw e
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
	const res = await fetch(url, config)
	return await res.json()
}

export default Api
