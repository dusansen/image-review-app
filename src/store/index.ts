import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer, AppState } from './reducer';
import { AnyAction } from 'redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore<AppState, AnyAction, unknown, unknown>(reducer, composedEnhancer);

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
