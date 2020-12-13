import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { client } from '../utils/api-client'
import { CapSpinner } from '../components/CapSpinner'
import { APIError } from './SearchScreen'

interface BeerInfoParams {
	bid: string
}

interface BeerInfoResponse {
	response: {
		beer: {
			beer_name: string
			rating_score: number
			beer_style: string
			beer_description: string
		}
	}
}

const BeerInfoScreen = (): JSX.Element => {
	const { bid } = useParams<BeerInfoParams>()
	const { data, isLoading, isError, isSuccess } = useQuery<BeerInfoResponse, APIError>(bid, () =>
		client<BeerInfoResponse>(`beer/info/${bid}`).then((data) => data),
	)

	const beer = data?.response.beer

	return (
		<>
			{isLoading ? <CapSpinner /> : isError && <p>Error</p>}
			{isSuccess && beer ? (
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

export { BeerInfoScreen }
