export interface CountryCreateInterface {
    id?: number | null,
    name: string,
    status: 'active' | 'inactive'; // Enum for status
}