import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {Button} from "@ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@ui/table";


interface CustomColumnFilter {
    id: string; // The column ID
    // component: (value: string, setValue: (newValue: string) => void) => JSX.Element; // A function that returns a JSX component
    component: (value: string, setValue: (newValue: string) => void) => React.ReactNode; // A function that returns a React node

}

interface DataTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    isLoading?: boolean;
    total?: number;
    page: number;
    limit: number;
    onPageChange: (newPage: number) => void;
    filters?: CustomColumnFilter[]; // Use the custom filter type

}

// Define your filter interface that includes a component property


export function DataTable<T>({
                                 columns,
                                 data,
                                 isLoading = false,
                                 total = 0,
                                 page,
                                 limit,
                                 onPageChange,
                                 filters, // Accept filters as prop
                             }: DataTableProps<T>) {

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,

        },
    });

     console.log(data)

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                {/* Render filter components dynamically */}
                {filters?.map((filter) => {
                    const column = table.getColumn(filter.id);
                    const filterValue = column?.getFilterValue() as string;

                    return (
                        <div key={filter.id}>
                            {filter.component(filterValue, (newValue) =>
                                column?.setFilterValue(newValue)
                            )}
                        </div>
                    );
                })}

            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : data.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Showing {Math.min((page - 1) * limit + 1, total)} to{" "}
                    {Math.min(page * limit, total)} of {total} result(s).
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(Math.max(page - 1, 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(Math.min(page + 1, Math.ceil(total / limit)))}
                        disabled={page * limit >= total}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
