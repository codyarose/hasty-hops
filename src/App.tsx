import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {BeerInfoScreen} from './screens/BeerInfoScreen'
import {SearchScreen} from './screens/SearchScreen'

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={SearchScreen} />
				<Route path="/beer/:bid" component={BeerInfoScreen} />
			</Switch>
		</Router>
	)
}

export default App
