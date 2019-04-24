import SubmitRed from  './Reducer/SubmitRed'
import SubmitSaga from './Saga/SubmitSaga'

import {createStore, applyMiddleware, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    Submit : SubmitRed
})

const Store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(SubmitSaga)

export default Store;