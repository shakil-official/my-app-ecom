import {CategoryCreateInterface} from "@/interface/CategoryCreateInterface";
import {CategoryDatatableInterface} from "@/interface/CategoryDatatableInterface";


export interface categoryInterface extends CategoryCreateInterface {
    loading: boolean;
    create: boolean;
    error: boolean | string | null;
    responseErrorMessage: string | null;
    success: boolean;
    close: boolean;
    responseError: string | null; // Assuming it's a string message or null if no error
    categories: CategoryDatatableInterface[]; // For storing fetched categories
    total: number; // Total number of categories
    page: number; // Current page number
    limit: number; // Default limit per page
}
