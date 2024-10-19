import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {countryInterface} from "@/interface/country/CountryInterface";
import {CountryCreateInterface} from "@/interface/country/CountryCreateInterface";

const initialState: countryInterface = {
    id: null,
    name: '',
    status: 'inactive', // Set initial status as 'inactive'
    loading: false,
    create: false,
    error: false,
    responseErrorMessage: null,
    success: false,
    close: false,
    // data table
    responseError: null, // Assuming this is part of the interface
    countries: [], // For storing fetched countries
    total: 0, // Total number of countries
    page: 1, // Current page number
    limit: 10, // Default limit per page,
    dataTableReload: true,
    message: "",
    query: {
        name:  null,
        status: null,
    }
}

// Define the payload type for fetching countries
interface FetchCountriesPayload {
    page: number;
    limit: number;
    query: {
        name?: string | null;
        status?: string | null;
    };
}


const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        createRequest(state, action: PayloadAction<CountryCreateInterface>) {
            state.loading = true;
            state.error = false;
            state.success = false;
            state.close = false;
            state.status = action.payload.status
        },

        updateRequest(state, action: PayloadAction<CountryCreateInterface>) {
            state.error = false;
            state.success = false;
            state.close = false;
            state.status = action.payload.status;
            state.id = action.payload.id;
        },
        deleteRequest(state, action: PayloadAction<{ id: number }>) {
            state.id = action.payload.id;
            state.error = false;
            state.success = false;
            state.loading = true;
        },
        success(state, action: PayloadAction<{ message?: string }>) {
            state.close = true;
            state.success = true;
            state.error = false;
            state.loading = false;
            state.dataTableReload = !state.dataTableReload;
            state.message = action.payload.message ? action.payload.message : '';
        },
        failure(state, action: PayloadAction<string | null>) {
            state.error = true;
            state.close = false;
            state.success = false;
            state.loading = false;
            state.responseErrorMessage = action.payload;
        },
        dialogReset(state) {
            state.close = false; // Reset close as well
            state.success = false; // Reset close as well
        },
        // Fetching countries start
        fetchCountriesStart(state, action: PayloadAction<FetchCountriesPayload>) {
            state.loading = true;
            state.error = null; // Reset error when a new fetch starts
            state.page = action.payload.page;
            state.limit = action.payload.limit;
        },
        // Fetching countries success
        fetchCountriesSuccess(state, action: PayloadAction<{ countries: []; total: number }>) {
            state.countries = action.payload.countries; // Set fetched countries
            state.total = action.payload.total; // Set total number of countries
            state.loading = false; // Stop loading
        },
        // Fetching countries failure
        fetchCountriesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload; // Set the error message
        },
        // Set the current page for pagination
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload; // Update the page number
        },
        setName: function (state, action: PayloadAction<string>) {
            state.query.name = action.payload;
        },
        setStatus: function (state, action: PayloadAction<string>) {
            state.query.status = action.payload;
        },
        // Set the limit for pagination
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload; // Update the limit per page
        },
    }
});

export const {
    createRequest,
    updateRequest,
    success,
    failure,
    dialogReset,
    fetchCountriesStart,
    fetchCountriesSuccess,
    fetchCountriesFailure,
    setPage,
    setName,
    setStatus,
    deleteRequest,
} = countrySlice.actions;
export default countrySlice.reducer;
