import {
    SUBMIT_FILTERS_REQUESTING
} from './Type'


export const filtersRequesting = (params) => {
console.log(params, '>>>>>>>>>>>>>>>>>>SUBMIT')

return{
    type: SUBMIT_FILTERS_REQUESTING,
    params

}

}