import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
    createRequest,
    deleteRequest,
    failure,
    fetchCountriesFailure,
    fetchCountriesStart,
    fetchCountriesSuccess,
    success,
    updateRequest
} from "../slices/countrySlice";
import {createCountryApi, deleteCountryApi, fetchingCountryApi, updateCountryApi} from "../../services/api/countryApi";


function* handleCountryCreate(action) {
    try {
        const response = yield call(createCountryApi, action.payload);
        const {} = response.data;

        yield put(success({message: "Country created successfully"}))
    } catch (error) {
        yield put(failure(error.response.data.error))
    }
}

function* handleCountryUpdate(action) {
    try {
        const response = yield call(updateCountryApi, action.payload);
        const {} = response.data;

        yield put(success({message: "Country updated successfully"}))
    } catch (error) {
        yield put(failure(error.response.data.error))
    }
}

function* handleCountryDelete(action) {
    try {
        const response = yield call(deleteCountryApi, action.payload);
        const {} = response.data;

        yield put(success({message: "Country deleted successfully"}))
    } catch (error) {
        yield put(failure(error.response.data.error))
    }
}

// Saga worker for fetching categories
function* fetchCountriesSaga(action) {
    console.log("checking ...")
    try {
        console.log(action.payload, {message: "checking "})
        const {page, limit, query} = action.payload;

        console.log({page, limit,query}, "Saga limit check")

        const result = yield call(fetchingCountryApi, page, limit, query);

        yield put(fetchCountriesSuccess({countries: result.data.countries, total: result.data.total}));
    } catch (error) {
        yield put(fetchCountriesFailure(error.message || 'Failed to fetch categories'));
    }
}

function* countrySaga() {
    yield all([
        yield takeLatest(createRequest.type, handleCountryCreate),
        yield takeLatest(updateRequest.type, handleCountryUpdate),
        yield takeLatest(deleteRequest.type, handleCountryDelete),
        yield takeLatest(fetchCountriesStart.type, fetchCountriesSaga),
    ]);
}

export default countrySaga;