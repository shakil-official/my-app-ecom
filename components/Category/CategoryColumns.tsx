import {ColumnDef} from "@tanstack/react-table";
import {CategoryDatatableInterface} from "@/interface/CategoryDatatableInterface";
import ActionList from "@/components/Reusable/ActionList";
import CategoryFormUpdate from "@/components/Category/CategoryFormUpdate";

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
            return (
                <ActionList component={
                    <CategoryFormUpdate categoryName={row.getValue('name')}
                                        id={row.original.id}
                                        status={row.getValue('status') === 'active'}
                    />
                }/>

            );
        },
    },
];
