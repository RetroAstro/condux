export type Reducer<S, A> = (prevState: S, action: A) => S

export type ProviderFC<T> = React.FC<{ children?: T }>

export type MultiProviderFC<T> = React.FC<{ children: T; providers: T[] }>

export type ThunkDispatch = (dispatch: React.Dispatch<any>, state: any) => void

export type Thunk<T> = (action: T | ThunkDispatch) => void

export const ShallowEqual = 'ShallowEqual'

export type ShallowEqualType = typeof ShallowEqual

export interface CacheFCProps<T, K> {
	context: React.Context<T>
	selector(state: T): K
	equal?: ShallowEqualType
	children: (state: K) => React.ReactElement
}

export interface ConduxContext<T, K> {
	state: React.Context<T>
	dispatch: React.Context<K>
}

export interface SelectorProps<T, K> {
	selector(state: T): K
	context: React.Context<T>
	equal?: ShallowEqualType
}

