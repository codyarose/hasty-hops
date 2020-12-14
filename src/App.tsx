import { FormEvent, useEffect, useRef, useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { Container, Header, Icon, Divider, Input, Ref } from 'semantic-ui-react'
import { BeerInfoScreen } from './screens/BeerInfoScreen'
import { SearchScreen } from './screens/SearchScreen'

const App = (): JSX.Element => {
	const history = useHistory()
	const [query, setQuery] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		return history.listen((location) => {
			if (location.search !== `?query=${query}`) {
				const { query } = queryString.parse(history.location.search)
				if (typeof query === 'string') {
					setQuery(query)
				}
			}
		})
	}, [history])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { value } = e.currentTarget.elements.namedItem('search') as HTMLInputElement
		history.push(`/?query=${value}`)
		setQuery(value)
		if (inputRef.current) {
			;(inputRef.current.children.namedItem('search') as HTMLInputElement).blur()
		}
	}

	return (
		<>
			<Container text textAlign="center">
				<Header as="h1" icon textAlign="center">
					<Icon name="beer" />
					Hasty Hops
					<Header.Subheader>Quick search for beers using React Query and Semantic UI</Header.Subheader>
				</Header>
				<Divider hidden />
				<form onSubmit={handleSubmit}>
					<Ref innerRef={inputRef}>
						<Input
							placeholder="Search..."
							type="search"
							name="search"
							id="search"
							size="big"
							icon={<Icon name="search" />}
							fluid
						/>
					</Ref>
				</form>
			</Container>
			<Switch>
				<Route exact path="/" render={() => <SearchScreen query={query} />} />
				<Route path="/beer/:bid" component={BeerInfoScreen} />
			</Switch>
		</>
	)
}

export default App
