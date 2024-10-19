import {all} from 'redux-saga/effects';
import authSaga from './authSaga';
import categorySaga from './categorySaga';
import countrySaga from './countrySaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        categorySaga(),
        countrySaga(),
    ]);
}
