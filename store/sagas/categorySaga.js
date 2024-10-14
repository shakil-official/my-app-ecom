import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
    createRequest,
    failure,
    success,
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure
} from "../slices/categorySlice";
import {createCategoryApi, fetchingCategoryApi} from "@/services/api/api";


function* handleCategory(action) {
    try {
        const response = yield call(createCategoryApi, action.payload);
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

        console.log({page, limit})

        const result = yield call(fetchingCategoryApi, page, limit);

        console.log(result, " result ")

        yield put(fetchCategoriesSuccess({categories: result.data.categories, total: result.total}));
    } catch (error) {
        yield put(fetchCategoriesFailure(error.message || 'Failed to fetch categories'));
    }
}

function* categorySaga() {
    yield all([
        yield takeLatest(createRequest.type, handleCategory),
        yield takeLatest(fetchCategoriesStart.type, fetchCategoriesSaga),
    ]);
}

export default categorySaga;