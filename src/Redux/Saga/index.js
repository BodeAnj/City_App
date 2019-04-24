import submitSaga from './SubmitSaga'

const rootSaga = function rootSaga() {
    yield [
        submitSaga()
    ]
}

export default rootSaga;