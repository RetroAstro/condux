import * as React from 'react'
import { isObject } from './utils'

import {
	Reducer,
	ProviderFC,
	MultiProviderFC,
	ThunkDispatch,
	Thunk,
	CacheFCProps,
	ConduxContext,
	SelectorProps,
	ShallowEqual,
} from './types'

const wm = new WeakMap()

const listeners: any[] = []

function subscribe<T>(listener: T) {
	listeners.push(listener)

	return function unsubscribe() {
		const index = listeners.indexOf(listener)
		listeners.splice(index, 1)
	}
}

export function condux<T, K>(
	reducer: Reducer<any, any>,
	initialState: T
): [
		ConduxContext<T, Thunk<K>>,
		ProviderFC<React.ReactNode>
	] {
	const StateContext = React.createContext<T>({} as T)
	const DispatchContext = React.createContext<Thunk<K>>((_) => { })

	const Provider: ProviderFC<React.ReactNode> = ({ children }) => {
		const [state, dispatch] = React.useReducer(reducer, initialState)
		const ref = React.useRef()

		const currentState = React.useCallback(() => ref.current, [])

		React.useEffect(() => {
			wm.set(StateContext, currentState)
		}, [])

		React.useEffect(() => {
			ref.current = state
		}, [state])

		React.useEffect(() => {
			listeners.forEach((listener: () => void) => listener())
		}, [state])

		const thunk: Thunk<K> = React.useCallback(action => {
			if (typeof action === 'function') {
				(action as ThunkDispatch)(dispatch, currentState)
			} else {
				dispatch(action)
			}
		}, [])

		return (
			<DispatchContext.Provider value={thunk}>
				<StateContext.Provider value={state}>
					{children}
				</StateContext.Provider>
			</DispatchContext.Provider>
		)
	}

	const Context = {
		state: StateContext,
		dispatch: DispatchContext
	}

	return [Context, Provider]
}

export function getState<T>(context: React.Context<T>): T | undefined {
	const state = wm.get(context)
	return state()
}

export function useSelector<T, K>({ selector, context, equal }: SelectorProps<T, K>) {
	const [, forceRender] = React.useReducer(s => s + 1, 0)
	const ref = React.useRef<K>()

	React.useEffect(() => {
		const unsubscribe = subscribe(() => {
			const state = getState(context)

			if (state) {
				const selectedState = selector(state)
				let deps = [selectedState]

				if (equal === ShallowEqual && isObject(selectedState)) {
					deps = Object.values(selectedState)
				}

				React.useMemo(() => {
					ref.current = selectedState
					forceRender()
				}, deps)
			}
		})

		return unsubscribe
	}, [])

	return ref.current
}

export function Cache<T, K>({ context, selector, children }: CacheFCProps<T, K, React.ReactElement>) {
	const state = React.useContext(context)
	const selectedState = selector(state)

	const node = children(selectedState)

	return React.useMemo(() => node, [selectedState, ...node.props])
}

export const MultiProvider: MultiProviderFC<React.ReactNode> = ({ children, providers }) => {
	if (children == null) {
		throw new Error('MultiProvider: Missing children')
	}

	if (providers.length === 0) {
		return <>{children}</>
	}

	let node = children

	providers.reverse().forEach(provider => {
		node = React.cloneElement(provider as any, undefined, node)
	})

	return <>{node}</>
}

export { ShallowEqual } from './types'

export { combineReducers } from 'redux'
