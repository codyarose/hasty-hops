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
	// const isSuccess = true
	const beer = data ? data.response.beer : null
	// const beer = {
	// 	bid: 16630,
	// 	beer_name: 'Celebration Ale',
	// 	beer_label:
	// 		'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_16630_sm_96f50e03ae848a4a368a787b38f989.jpeg',
	// 	beer_abv: 6.8,
	// 	beer_ibu: 65,
	// 	beer_description:
	// 		'The long, cold nights of winter are a little brighter with Celebration Ale. Wonderfully robust and rich, Celebration Ale is dry-hopped for a lively, intense aroma. Brewed especially for the holidays, it is perfect for a festive gathering or for a quiet evening at home.',
	// 	beer_style: 'American IPA',
	// 	is_in_production: 1,
	// 	beer_slug: 'sierra-nevada-brewing-co-celebration-ale',
	// 	is_homebrew: 0,
	// 	created_at: 'Fri, 24 Dec 2010 10:10:42 +0000',
	// 	rating_count: 35148,
	// 	rating_score: 3.78495,
	// 	stats: {
	// 		total_count: 57453,
	// 		monthly_count: 24387,
	// 		total_user_count: 39594,
	// 		user_count: 0,
	// 	},
	// 	brewery: {
	// 		brewery_id: 1142,
	// 		brewery_name: 'Sierra Nevada Brewing Co.',
	// 		brewery_label: 'https://d1c8v1qci5en44.cloudfront.net/site/brewery_logos/brewery-1142_f241d.jpeg',
	// 		country_name: 'United States',
	// 		contact: {
	// 			twitter: 'SierraNevada',
	// 			facebook: 'http://www.facebook.com/sierranevadabeer',
	// 			url: 'http://www.sierranevada.com/',
	// 		},
	// 		location: {
	// 			brewery_city: 'Chico',
	// 			brewery_state: 'CA',
	// 			lat: 39.7246,
	// 			lng: -121.816,
	// 		},
	// 	},
	// 	auth_rating: 0,
	// 	wish_list: false,
	// 	media: {
	// 		count: 1,
	// 		items: {
	// 			photo_id: 25856365,
	// 			photo: {
	// 				photo_img_sm:
	// 					'https://d1c8v1qci5en44.cloudfront.net/photo/2014_12_14/b73895e69761fdb62a4a9e10294e9613_100x100.jpg',
	// 				photo_img_md:
	// 					'https://d1c8v1qci5en44.cloudfront.net/photo/2014_12_14/b73895e69761fdb62a4a9e10294e9613_320x320.jpg',
	// 				photo_img_lg:
	// 					'https://d1c8v1qci5en44.cloudfront.net/photo/2014_12_14/b73895e69761fdb62a4a9e10294e9613_640x640.jpg',
	// 				photo_img_og:
	// 					'https://d1c8v1qci5en44.cloudfront.net/photo/2014_12_14/b73895e69761fdb62a4a9e10294e9613_raw.jpg',
	// 			},
	// 			created_at: 'Sun, 14 Dec 2014 22:39:26 +0000',
	// 			checkin_id: 137623689,
	// 			beer: {
	// 				bid: 16630,
	// 				beer_name: 'Celebration Ale',
	// 				beer_label:
	// 					'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_16630_sm_96f50e03ae848a4a368a787b38f989.jpeg',
	// 				beer_abv: 6.8,
	// 				beer_ibu: 65,
	// 				beer_slug: 'sierra-nevada-brewing-co-celebration-ale',
	// 				beer_description:
	// 					'The long, cold nights of winter are a little brighter with Celebration Ale. Wonderfully robust and rich, Celebration Ale is dry-hopped for a lively, intense aroma. Brewed especially for the holidays, it is perfect for a festive gathering or for a quiet evening at home.',
	// 				is_in_production: 1,
	// 				beer_style_id: 128,
	// 				beer_style: 'American IPA',
	// 				auth_rating: 0,
	// 				wish_list: false,
	// 				beer_active: 1,
	// 			},
	// 			brewery: {
	// 				brewery_id: 1142,
	// 				brewery_name: 'Sierra Nevada Brewing Co.',
	// 				brewery_slug: 'sierra-nevada-brewing-co',
	// 				brewery_label: 'https://d1c8v1qci5en44.cloudfront.net/site/brewery_logos/brewery-1142_f241d.jpeg',
	// 				country_name: 'United States',
	// 				contact: {
	// 					twitter: 'SierraNevada',
	// 					facebook: 'http://www.facebook.com/sierranevadabeer',
	// 					url: 'http://www.sierranevada.com/',
	// 				},
	// 				location: {
	// 					brewery_city: 'Chico',
	// 					brewery_state: 'CA',
	// 					lat: 39.7246,
	// 					lng: -121.816,
	// 				},
	// 				brewery_active: 1,
	// 			},
	// 			user: {
	// 				uid: 1068060,
	// 				user_name: 'Sallyddrake',
	// 				first_name: 'Sally',
	// 				last_name: 'D',
	// 				user_avatar:
	// 					'https://gravatar.com/avatar/51d0f47cf4633afac7dda8990a67ab1b?size=100&d=htt…44.cloudfront.net%2Fsite%2Fassets%2Fimages%2Fdefault_avatar_v2.jpg%3Fv%3D1',
	// 				relationship: 'none',
	// 				is_private: 0,
	// 			},
	// 			venue: [
	// 				{
	// 					venue_id: 1922107,
	// 					venue_name: "Lucky's Market",
	// 					primary_category: 'Shop & Service',
	// 					parent_category_id: '4d4b7105d754a06378d81259',
	// 					categories: {
	// 						count: 1,
	// 						items: [
	// 							{
	// 								category_name: 'Grocery or Supermarket',
	// 								category_id: '4bf58dd8d48988d118951735',
	// 								is_primary: true,
	// 							},
	// 						],
	// 					},
	// 					location: {
	// 						venue_address: 'Fountain Plaza',
	// 						venue_city: 'Ellisville',
	// 						venue_state: 'MO',
	// 						lat: 38.6058,
	// 						lng: -90.5834,
	// 					},
	// 					contact: {
	// 						twitter: '',
	// 						venue_url: '',
	// 					},
	// 					private_venue: true,
	// 					foursquare: {
	// 						foursquare_id: '53d80e2b498eb7cff03ec47a',
	// 						foursquare_url: 'http://4sq.com/1rCS43U',
	// 					},
	// 					venue_icon: {
	// 						sm: 'https://ss3.4sqi.net/img/categories_v2/shops/food_grocery_bg_64.png',
	// 						md: 'https://ss3.4sqi.net/img/categories_v2/shops/food_grocery_bg_88.png',
	// 						lg: 'https://ss3.4sqi.net/img/categories_v2/shops/food_grocery_bg_88.png',
	// 					},
	// 				},
	// 			],
	// 		},
	// 	},
	// 	similar: {
	// 		count: 1,
	// 		items: {
	// 			rating_score: 4.16096,
	// 			beer: {
	// 				bid: 881386,
	// 				beer_name: 'Stone Enjoy By 12.26.14 IPA',
	// 				beer_abv: 9.4,
	// 				beer_ibu: 88,
	// 				beer_style: 'Imperial / Double IPA',
	// 				beer_label: 'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-881386_1a85e_sm.jpeg',
	// 				auth_rating: 0,
	// 				wish_list: false,
	// 			},
	// 			brewery: {
	// 				brewery_id: 1204,
	// 				brewery_name: 'Stone Brewing Co.',
	// 				brewery_slug: 'stone-brewing-co',
	// 				brewery_label: 'https://d1c8v1qci5en44.cloudfront.net/site/brewery_logos/brewery-stone.jpg',
	// 				country_name: 'United States',
	// 				contact: {
	// 					twitter: 'StoneBrewingCo',
	// 					facebook: 'http://www.facebook.com/StoneBrewingCo',
	// 					instagram: 'StoneBrewingCo',
	// 					url: 'http://www.stonebrew.com/',
	// 				},
	// 				location: {
	// 					brewery_city: 'Escondido',
	// 					brewery_state: 'CA',
	// 					lat: 33.1157,
	// 					lng: -117.12,
	// 				},
	// 				brewery_active: 1,
	// 			},
	// 			friends: {
	// 				items: [],
	// 				count: 0,
	// 			},
	// 		},
	// 	},
	// 	friends: {
	// 		count: 0,
	// 		items: [],
	// 	},
	// 	vintages: {
	// 		count: 5,
	// 		items: [
	// 			{
	// 				beer: {
	// 					bid: 6796,
	// 					beer_label:
	// 						'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_6796_sm_7a8d7db0099654386f616e26ccb043.jpeg',
	// 					beer_slug: 'sierra-nevada-brewing-co-celebration-ale-2010',
	// 					beer_name: 'Celebration Ale (2010)',
	// 					is_vintage: 1,
	// 					is_variant: 0,
	// 				},
	// 			},
	// 			{
	// 				beer: {
	// 					bid: 10611,
	// 					beer_label:
	// 						'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_10611_sm_f9e846389a5b26bb4888557aa78a29.jpeg',
	// 					beer_slug: 'sierra-nevada-brewing-co-celebration-ale-2007',
	// 					beer_name: 'Celebration Ale (2007)',
	// 					is_vintage: 1,
	// 					is_variant: 0,
	// 				},
	// 			},
	// 			{
	// 				beer: {
	// 					bid: 12371,
	// 					beer_label:
	// 						'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_12371_sm_389b71c2126a12d3e538ba9d0ef82e.jpeg',
	// 					beer_slug: 'sierra-nevada-brewing-co-celebration-ale-2009',
	// 					beer_name: 'Celebration Ale (2009)',
	// 					is_vintage: 1,
	// 					is_variant: 0,
	// 				},
	// 			},
	// 			{
	// 				beer: {
	// 					bid: 15030,
	// 					beer_label:
	// 						'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_16630_sm_96f50e03ae848a4a368a787b38f989.jpeg',
	// 					beer_slug: 'sierra-nevada-brewing-co-celebration-ale-1997',
	// 					beer_name: 'Celebration Ale (1997)',
	// 					is_vintage: 1,
	// 					is_variant: 0,
	// 				},
	// 			},
	// 			{
	// 				beer: {
	// 					bid: 19893,
	// 					beer_label:
	// 						'https://d1c8v1qci5en44.cloudfront.net/site/beer_logos/beer-_16630_sm_96f50e03ae848a4a368a787b38f989.jpeg',
	// 					beer_slug: 'sierra-nevada-brewing-co-celebration-ale-2006',
	// 					beer_name: 'Celebration Ale (2006)',
	// 					is_vintage: 1,
	// 					is_variant: 0,
	// 				},
	// 			},
	// 		],
	// 	},
	// }

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
