import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
    createRequest,
    deleteRequest,
    failure,
    fetchCategoriesFailure,
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    success,
    updateRequest
} from "../slices/categorySlice";
import {createCategoryApi, deleteCategoryApi, fetchingCategoryApi, updateCategoryApi} from "@/services/api/categoryApi";


function* handleCategoryCreate(action) {
    try {
        const response = yield call(createCategoryApi, action.payload);
        const {} = response.data;

        yield put(success({message: "Category created successfully"}))
    } catch (error) {
        yield put(failure(error.response.data.error))
    }
}

function* handleCategoryUpdate(action) {
    try {
        const response = yield call(updateCategoryApi, action.payload);
        const {} = response.data;

        yield put(success({message: "Category updated successfully"}))
    } catch (error) {
        yield put(failure(error.response.data.error))
    }
}

function* handleCategoryDelete(action) {
    try {
        const response = yield call(deleteCategoryApi, action.payload);
        const {} = response.data;

        yield put(success({message: "Category deleted successfully"}))
    } catch (error) {
        yield put(failure(error.response.data.error))
    }
}

// Saga worker for fetching categories
function* fetchCategoriesSaga(action) {
    try {
        console.log(action.payload, {message: "checking "})
        const {page, limit, query} = action.payload;

        console.log({page, limit,query}, "Saga limit check")

        const result = yield call(fetchingCategoryApi, page, limit, query);

        yield put(fetchCategoriesSuccess({categories: result.data.categories, total: result.data.total}));
    } catch (error) {
        yield put(fetchCategoriesFailure(error.message || 'Failed to fetch categories'));
    }
}

function* categorySaga() {
    yield all([
        yield takeLatest(createRequest.type, handleCategoryCreate),
        yield takeLatest(updateRequest.type, handleCategoryUpdate),
        yield takeLatest(deleteRequest.type, handleCategoryDelete),
        yield takeLatest(fetchCategoriesStart.type, fetchCategoriesSaga),
    ]);
}

export default categorySaga;