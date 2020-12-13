import { FormEvent, useState } from "react"
import { client } from "../utils/api-client"
import { useQuery } from "react-query"
import { CapSpinner } from "../components/CapSpinner"
import { Link } from "react-router-dom"
import {
	Container,
	Input,
	Card,
	Image,
	Divider,
	Grid,
	Pagination,
	Icon,
	Header,
	Message,
	StrictPaginationProps,
} from "semantic-ui-react"
import { useCurrentWindowWidth } from "../utils/useCurrentWindowWidth"

interface APIError extends Error {
	meta: any
}

const SearchScreen = () => {
	const [query, setQuery] = useState("")
	const [offset, setOffset] = useState(0)
	const [activePage, setActivePage] = useState(1)
	const windowWidth = useCurrentWindowWidth()
	const isMobile = windowWidth > 500

	const limit = 25
	const { data, isLoading, isError, isSuccess, error, refetch } = useQuery<
		any,
		APIError
	>(
		["beerSearch", { query }, { offset }],
		() =>
			client(`search/beer`, {
				q: encodeURIComponent(query),
				offset,
				limit,
			}).then((data) => data.response),
		{
			enabled: query !== "",
			refetchOnWindowFocus: false,
		}
	)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { value } = e.currentTarget.elements.namedItem(
			"search"
		) as HTMLInputElement
		setQuery(value)
	}
	const handleChangePage = (_e: any, data: StrictPaginationProps) => {
		const { activePage } = data
		if (activePage && typeof activePage === "number") {
			setActivePage(activePage)
			activePage && setOffset((activePage - 1) * limit)
		}
		refetch()
	}

	return (
		<Container style={{ padding: "3rem 0" }}>
			<Container text textAlign='center'>
				<Header as='h1' icon textAlign='center'>
					<Icon name='beer' />
					Hasty Hops
					<Header.Subheader>
						Quick search for beers using React Query and Semantic UI
					</Header.Subheader>
				</Header>
				<Divider hidden />
				<form onSubmit={handleSubmit}>
					<Input
						placeholder='Search...'
						type='search'
						name='search'
						id='search'
						size='big'
						icon={<Icon name='search' />}
						fluid
						loading={isLoading}
					/>
				</form>
			</Container>

			{isLoading ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						padding: "3rem 0",
					}}
				>
					<CapSpinner />
				</div>
			) : (
				isError && (
					<Message
						icon='times circle'
						header='Uh oh! There was an error...'
						content={error?.meta.error_detail}
					/>
				)
			)}
			{isSuccess && (
				<div>
					<Divider
						horizontal
						section
						content={`Results: ${data.found}`}
					/>
					{data.beers.count > 0 ? (
						<>
							<Card.Group centered>
								{data.beers.items.map((item: any) => {
									const {
										beer: {
											bid,
											beer_name,
											beer_label,
											beer_abv,
											beer_ibu,
											beer_style,
										},
									} = item
									return (
										<Card
											key={bid}
											as={Link}
											to={`/beer/${bid}`}
											style={{ color: "inherit" }}
										>
											<Card.Content textAlign='center'>
												<Image
													src={beer_label}
													alt={`${beer_name} label`}
												/>
												<Divider hidden />
												<Card.Header>
													{beer_name}
												</Card.Header>
												<Card.Meta>
													{beer_style}
												</Card.Meta>
											</Card.Content>
											<Card.Content textAlign='center'>
												<Grid columns={2} divided>
													<Grid.Row>
														<Grid.Column>
															{beer_abv}% ABV
														</Grid.Column>
														<Grid.Column>
															{beer_ibu} IBU
														</Grid.Column>
													</Grid.Row>
												</Grid>
											</Card.Content>
										</Card>
									)
								})}
							</Card.Group>
							<Divider section />
							<div style={{ textAlign: "center" }}>
								<Pagination
									activePage={activePage}
									ellipsisItem={
										isMobile
											? {
													content: (
														<Icon name='ellipsis horizontal' />
													),
													icon: true,
											  }
											: null
									}
									firstItem={null}
									lastItem={null}
									prevItem={
										activePage !== 1
											? {
													content: (
														<Icon name='angle left' />
													),
													icon: true,
											  }
											: null
									}
									nextItem={
										activePage !==
										Math.ceil(data.found / limit)
											? {
													content: (
														<Icon name='angle right' />
													),
													icon: true,
											  }
											: null
									}
									totalPages={Math.ceil(data.found / limit)}
									onPageChange={handleChangePage}
								/>
							</div>
						</>
					) : (
						<p style={{ textAlign: "center" }}>No results</p>
					)}
				</div>
			)}
		</Container>
	)
}

export { SearchScreen }
