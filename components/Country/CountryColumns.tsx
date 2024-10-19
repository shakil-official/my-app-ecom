import {ColumnDef} from "@tanstack/react-table";
import {CountryDatatableInterface} from "@/interface/country/CountryDatatableInterface";
import ActionList from "@/components/Reusable/ActionList";
import CountryFormUpdate from "@/components/Country/CountryFormUpdate";
import CountryDelete from "@/components/Country/CountryDelete";

export const CountryColumns: ColumnDef<CountryDatatableInterface>[] = [
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
            const countryId: number = row.original.id;

            return (
                <ActionList
                    dropdownMenuItems={[
                        <CountryDelete key={`delete-${countryId}`} data={countryId}/>,  // Assign unique key and pass id
                    ]}
                    component={
                        <CountryFormUpdate countryName={row.getValue('name')}
                                            id={row.original.id}
                                            status={row.getValue('status') === 'active'}
                        />
                    }/>

            );
        },
    },
];
