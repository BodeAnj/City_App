import { call,put,takeEvery,apply } from 'redux-saga/effects'
import {
    SUBMIT_FILTERS_SUCCESS, 
    SUBMIT_FILTERS_FAIL,
    SUBMIT_FILTERS_REQUESTING
} from '../Action/Type'

export function* watchSelectCity({params}) {
    console.log (params, '++++++++++SAGA')
    

    try{
        
        const data = yield call('http://opentable.herokuapp.com/api/resturants', ...params);
        yield put({ type: SUBMIT_FILTERS_SUCCESS, data });
    } catch (error) {
        yield put({ type: SUBMIT_FILTERS_FAIL, error })
    } 
    
}

export default function* submitSaga() {
    yield takeEvery(SUBMIT_FILTERS_REQUESTING, watchSelectCity)
  }