import {useQuery} from 'react-query'
import { useParams } from 'react-router-dom'
import {client} from '../utils/api-client'
import {CapSpinner} from '../components/CapSpinner'

interface BeerInfoParams {
	bid: string
}

const BeerInfoScreen = () => {
	const {bid} = useParams<BeerInfoParams>()
	const { data: beer, isLoading, isError, isSuccess } = useQuery(
		bid,
		() => client(`beer/info/${bid}`).then((data) => data.response.beer),
	)

	return (
		<>
			{isLoading ? <CapSpinner /> : isError && <p>Error</p>}
			{isSuccess ? (
				<div>
					<p>{beer.beer_name}</p>
					<p>{beer.rating_score}</p>
					<p>{beer.beer_style}</p>
					<p>{beer.beer_description}</p>
				</div>
			) : null}
		</>
	)
}

export {BeerInfoScreen}
