import React from 'react';
import { Chat } from './features/chat/Chat';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import InputName from './features/chat/InputName';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<BrowserRouter>
					<Route exact path="/" component={InputName} />
					<Route path="/chat/:username" component={Chat} />
				</BrowserRouter>
			</header>
		</div>
	);
}

export default App;
