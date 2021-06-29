import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Detail from "./components/Detail";
import Login from "./components/login";
function App() {
	return (
		<div className='App'>
			<Router>
				<Header />
				<Switch>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/detail'>
						<Detail />
					</Route>
					<Route path='/' exact>
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}
export default App;
