import { useState } from 'react'
import { client } from '../utils/api-client'
import { useQuery } from 'react-query'
import { CapSpinner } from '../components/CapSpinner'
import { Link } from 'react-router-dom'
import {
	Container,
	Card,
	Image,
	Divider,
	Grid,
	Pagination,
	Icon,
	Message,
	StrictPaginationProps,
} from 'semantic-ui-react'
import { useCurrentWindowWidth } from '../utils/useCurrentWindowWidth'

export interface APIError extends Error {
	meta: {
		error_detail: string
	}
}

export interface Beer {
	bid: number
	beer_name: string
	beer_label: string
	beer_abv: string
	beer_ibu: string
	beer_style: string
}

interface BeerSearchResponse {
	response: {
		found: number
		beers: {
			count: number
			items: {
				beer: Beer
			}[]
		}
	}
}

const SearchScreen = ({ query }: { query: string }): JSX.Element => {
	const [offset, setOffset] = useState(0)
	const [activePage, setActivePage] = useState(1)
	const windowWidth = useCurrentWindowWidth()
	const isMobile = windowWidth > 500
	const limit = 25

	const { data, isLoading, isError, isSuccess, error, refetch } = useQuery<BeerSearchResponse, APIError>(
		['beerSearch', { query }, { offset }],
		() =>
			client<BeerSearchResponse>(`search/beer`, {
				q: encodeURIComponent(query),
				offset,
				limit,
			}).then((data) => data),
		{
			enabled: query !== '',
			refetchOnWindowFocus: false,
		},
	)
	const beersData = data ? data.response : null

	const handleChangePage = (_e: unknown, data: StrictPaginationProps) => {
		const { activePage } = data
		if (activePage && typeof activePage === 'number') {
			setActivePage(activePage)
			activePage && setOffset((activePage - 1) * limit)
		}
		refetch()
	}

	return (
		<Container>
			{isLoading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						padding: '3rem 0',
					}}
				>
					<CapSpinner />
				</div>
			) : (
				isError && (
					<Message
						icon="times circle"
						header="Uh oh! There was an error..."
						content={error?.meta.error_detail}
					/>
				)
			)}
			{isSuccess && beersData && (
				<div>
					<Divider horizontal section content={`Results: ${beersData.found}`} />
					{beersData.beers.count > 0 ? (
						<>
							<Card.Group centered>
								{beersData.beers.items.map((item) => {
									const {
										beer: { bid, beer_name, beer_label, beer_abv, beer_ibu, beer_style },
									} = item
									return (
										<Card key={bid} as={Link} to={`/beer/${bid}`} style={{ color: 'inherit' }}>
											<Card.Content textAlign="center">
												<Image src={beer_label} alt={`${beer_name} label`} />
												<Divider hidden />
												<Card.Header>{beer_name}</Card.Header>
												<Card.Meta>{beer_style}</Card.Meta>
											</Card.Content>
											<Card.Content textAlign="center">
												<Grid columns={2} divided>
													<Grid.Row>
														<Grid.Column>{beer_abv}% ABV</Grid.Column>
														<Grid.Column>{beer_ibu} IBU</Grid.Column>
													</Grid.Row>
												</Grid>
											</Card.Content>
										</Card>
									)
								})}
							</Card.Group>
							<Divider section />
							<div style={{ textAlign: 'center' }}>
								<Pagination
									activePage={activePage}
									ellipsisItem={
										isMobile
											? {
													content: <Icon name="ellipsis horizontal" />,
													icon: true,
											  }
											: null
									}
									firstItem={null}
									lastItem={null}
									prevItem={
										activePage !== 1
											? {
													content: <Icon name="angle left" />,
													icon: true,
											  }
											: null
									}
									nextItem={
										activePage !== Math.ceil(beersData.found / limit)
											? {
													content: <Icon name="angle right" />,
													icon: true,
											  }
											: null
									}
									totalPages={Math.ceil(beersData.found / limit)}
									onPageChange={handleChangePage}
								/>
							</div>
						</>
					) : (
						<p style={{ textAlign: 'center' }}>No results</p>
					)}
				</div>
			)}
		</Container>
	)
}

export { SearchScreen }
