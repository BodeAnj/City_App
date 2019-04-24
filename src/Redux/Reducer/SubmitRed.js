import {
    SUBMIT_FILTERS_SUCCESS, 
    SUBMIT_FILTERS_FAIL
} from '../Action/Type'


const INITIAL_STATE = {
    city : null,
    selected : null,
}
export default ( state= INITIAL_STATE, action) => {
    console.log(action , '--------REDUCER')
    switch(action.type) {
        case SUBMIT_FILTERS_SUCCESS:
        return { status: 'success' }
        case SUBMIT_FILTERS_FAIL: 
        return { status :'fail' }
        
        
        default :
            return state
}
}