import React from 'react'
import ReactDOM from 'react-dom'
import { MultiProvider } from '../../src/index'
import { App, CounterProvider } from './App'

ReactDOM.render(
	<MultiProvider
		providers={[
			<CounterProvider />
		]}
	>
		<App />
	</MultiProvider>,
	document.getElementById('app')
)
