import { useQuery } from 'react-query'
import { useParams, Link } from 'react-router-dom'
import { client } from '../utils/api-client'
import { CapSpinner } from '../components/CapSpinner'
import { APIError, Beer } from './SearchScreen'
import { Container, Message, Header, Rating, Image, Statistic, Divider, Grid, Segment } from 'semantic-ui-react'

interface BeerInfoParams {
	bid: string
}

interface BeerInfoResponse {
	response: {
		beer: {
			beer_name: string
			rating_score: number
			rating_count: number
			beer_style: string
			beer_description: string
			beer_label: string
			beer_abv: number
			beer_ibu: number
			brewery: {
				brewery_name: string
				contact: {
					url: string
				}
			}
			similar: {
				count: number
				items: {
					beer: Beer
					rating_score: number
					brewery: {
						brewery_name: string
					}
				}[]
			}
		}
	}
}

const BeerInfoScreen = (): JSX.Element => {
	const { bid } = useParams<BeerInfoParams>()
	const { data, isLoading, isError, isSuccess, error } = useQuery<BeerInfoResponse, APIError>(bid, () =>
		client<BeerInfoResponse>(`beer/info/${bid}`).then((data) => data),
	)
	const beer = data ? data.response.beer : null

	return (
		<Container text>
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
			{isSuccess && beer ? (
				<>
					<Segment.Group>
						<Segment padded>
							<Image src={beer.beer_label} alt={`${beer.beer_name} label`} floated="left" />
							<Header as="h2">
								{beer.beer_name}
								<Header.Subheader style={{ fontSize: '1.25rem' }}>
									<a href={beer.brewery.contact.url}>{beer.brewery.brewery_name}</a>
								</Header.Subheader>
								<Header.Subheader>{beer.beer_style}</Header.Subheader>
							</Header>
						</Segment>
						<Segment.Group horizontal size="big">
							<Segment textAlign="center">{beer.beer_abv}% ABV</Segment>
							<Segment textAlign="center">{beer.beer_ibu} IBU</Segment>
						</Segment.Group>
						<Segment>
							<Grid columns={3} stackable textAlign="center" verticalAlign="middle">
								<Grid.Row>
									<Grid.Column>
										<Statistic
											size="tiny"
											label="stars"
											value={Math.round(beer.rating_score * 100) / 100}
										/>
									</Grid.Column>
									<Grid.Column>
										<Rating
											defaultRating={beer.rating_score}
											maxRating={5}
											disabled
											size="massive"
										/>
									</Grid.Column>
									<Grid.Column>
										<Statistic size="tiny" label="ratings" value={beer.rating_count} />
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Segment>
						<Segment padded>
							<p>{beer.beer_description}</p>
						</Segment>
					</Segment.Group>
					<Divider hidden />
					{beer.similar.count > 0 ? (
						<Segment padded>
							<Header as="h3">Similar beers</Header>
							{beer.similar.items.map((item) => (
								<Segment vertical key={item.beer.bid}>
									<Link to={`/beer/${item.beer.bid}`}>
										<Image
											src={item.beer.beer_label}
											alt={`${item.beer.beer_name} label`}
											spaced="right"
											size="tiny"
										/>
										<Header as="h4" style={{ display: 'inline-block' }}>
											{item.beer.beer_name}
											<Header.Subheader>{item.brewery.brewery_name}</Header.Subheader>
											<Header.Subheader>
												{item.beer.beer_style} - {item.beer.beer_abv}%
											</Header.Subheader>
										</Header>
									</Link>
								</Segment>
							))}
						</Segment>
					) : null}
				</>
			) : null}
		</Container>
	)
}

export { BeerInfoScreen }
