import { FormEvent, useState } from "react"
import { client } from "../utils/api-client"
import { useQuery } from "react-query"
import { CapSpinner } from '../components/CapSpinner'
import { Link } from 'react-router-dom'

const SearchScreen = () => {
	const [query, setQuery] = useState('')
	const [offset, setOffset] = useState(0)
	const limit = 5
	const { data, isLoading, isError, isSuccess, refetch } = useQuery(
		["beerSearch", {query}],
		() => client(`search/beer`, {q: encodeURIComponent(query), offset, limit}).then((data) => data.response),
		{
			enabled: (query !== ''),
			refetchOnWindowFocus: false,
		}
	)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const {value} = e.currentTarget.elements.namedItem('search') as HTMLInputElement
		setQuery(value)
	}
	const handleChangePage = () => {
		setOffset(prevOffset => prevOffset + limit)
		refetch()
	}

	console.log(data)

	return (
		<div className='App'>
			<form onSubmit={handleSubmit}>
				<input
					placeholder='Search...'
					type='search'
					name='search'
					id='search'
				/>
			</form>
			{isLoading ? <CapSpinner /> : isError && <p>Error</p>}
			{isSuccess && (
				<div>
					{data.beers.count > 0 ? (
						<>
							<p>Total: {data.found}</p>
							{data.beers.items.map((item: any) => {
								const {
									beer: {
										bid,
										beer_name,
										beer_label,
										beer_description,
										beer_style,
									},
								} = item
								return (
									<div key={bid} style={{ display: "flex" }}>
										<img src={beer_label} alt='' />
										<div>
											<Link to={`/beer/${bid}`}>{beer_name}</Link>
											<p>{beer_style}</p>
											<p>{beer_description}</p>
										</div>
									</div>
								)
							})}
							<div>
								{/* <button onClick={handleChangePage()}>previous</button> */}
								<button onClick={handleChangePage}>next</button>
							</div>
						</>
					) : (
						<p>No results</p>
					)}
				</div>
			)}
		</div>
	)
}

export { SearchScreen }
