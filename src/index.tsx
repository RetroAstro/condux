import * as React from 'react'

export { combineReducers } from 'redux'

type Reducer<S, A> = (prevState: S, action: A) => S

type ProviderFC<T> = React.FC<{ children?: T }>

type MultiProviderFC<T> = React.FC<{ children: T; providers: T[] }>

type ThunkDispatch = (dispatch: React.Dispatch<any>, state: any) => void

type Thunk<T> = (action: T | ThunkDispatch) => void

interface CacheFCProps<T, K, P> {
	context: React.Context<T>
	selector(state: T): K
	children: (state: K) => P | P
}

interface ConduxContext<T, K> {
	state: React.Context<T>
	dispatch: React.Context<K>
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

		React.useEffect(() => {
			ref.current = state
		}, [state])

		const thunk: Thunk<K> = React.useCallback((action) => {
			if (typeof action === 'function') {
				(action as ThunkDispatch)(dispatch, () => ref.current)
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

export function Cache<T, K>({ context, selector, children }: CacheFCProps<T, K, React.ReactNode>) {
	const state = React.useContext(context)
	const selectedState = selector(state)

	return React.useMemo(() => (
		<>{children(selectedState)}</>
	), [selectedState])
}
