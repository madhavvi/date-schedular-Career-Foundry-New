import SlotsSagas from './sagas/slots';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        ...SlotsSagas
    ])
}