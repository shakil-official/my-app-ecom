import {CountryCreateInterface} from "@/interface/country/CountryCreateInterface";
import {CountryDatatableInterface} from "@/interface/country/CountryDatatableInterface";


export interface countryInterface extends CountryCreateInterface {
    id?: number | null;
    loading: boolean;
    create: boolean;
    error: boolean | string | null;
    responseErrorMessage: string | null;
    success: boolean;
    close: boolean;
    responseError: string | null; // Assuming it's a string message or null if no error
    countries: CountryDatatableInterface[]; // For storing fetched categories
    total: number; // Total number of categories
    page: number; // Current page number
    limit: number; // Default limit per page
    dataTableReload: boolean; // Default limit per page
    message?: string;
    query: {
        name?: string | null;
        status?: string | null;
    }
}
