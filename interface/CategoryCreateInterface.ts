export interface CategoryCreateInterface {
    id?: number | null,
    name: string,
    status: 'active' | 'inactive'; // Enum for status
}