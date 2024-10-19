export interface CountryDatatableInterface {
    id: number;
    name: string;
    status: "active" | "inactive";
    image: string | null;
    adminId: number;
    createdAt: string;
    updatedAt: string;
}
