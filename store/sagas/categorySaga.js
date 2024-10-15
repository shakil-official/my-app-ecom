import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
    createRequest,
    updateRequest,
    failure,
    success,
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure
} from "../slices/categorySlice";
import {createCategoryApi, fetchingCategoryApi, updateCategoryApi} from "@/services/api/api";


function* handleCategoryCreate(action) {
    try {
        const response = yield call(createCategoryApi, action.payload);
        const {} = response.data;

        yield put(success())
    } catch (error) {
        yield put(failure(error.response.data.error))
    }
}

function* handleCategoryUpdate(action) {
    try {
        const response = yield call(updateCategoryApi, action.payload);
        const {} = response.data;

        yield put(success())
    } catch (error) {
        yield put(failure(error.response.data.error))
    }
}

// Saga worker for fetching categories
function* fetchCategoriesSaga(action) {
    try {
        const {page, limit} = action.payload;

        console.log({page, limit}, "Saga limit check")

        const result = yield call(fetchingCategoryApi, page, limit);


        yield put(fetchCategoriesSuccess({categories: result.data.categories, total: result.data.total}));
    } catch (error) {
        yield put(fetchCategoriesFailure(error.message || 'Failed to fetch categories'));
    }
}

function* categorySaga() {
    yield all([
        yield takeLatest(createRequest.type, handleCategoryCreate),
        yield takeLatest(updateRequest.type, handleCategoryUpdate),
        yield takeLatest(fetchCategoriesStart.type, fetchCategoriesSaga),
    ]);
}

export default categorySaga;