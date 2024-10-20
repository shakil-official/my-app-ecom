import {ColumnDef} from "@tanstack/react-table";
import {CategoryDatatableInterface} from "@/interface/category/CategoryDatatableInterface";
import ActionList from "@/components/Reusable/ActionList";
import CategoryFormUpdate from "@/components/Category/CategoryFormUpdate";
import CategoryDelete from "@/components/Category/CategoryDelete";

export const CategoryColumns: ColumnDef<CategoryDatatableInterface>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({row}) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (
            <div className="capitalize text-teal-500">{row.getValue("status")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const categoryId: number = row.original.id;

            return (
                <ActionList
                    dropdownMenuItems={[
                        <CategoryDelete key={`delete-${categoryId}`} data={categoryId}/>,  // Assign unique key and pass id
                    ]}
                    component={
                        <CategoryFormUpdate categoryName={row.getValue('name')}
                                            id={row.original.id}
                                            status={row.getValue('status') === 'active'}
                        />
                    }/>

            );
        },
    },
];
