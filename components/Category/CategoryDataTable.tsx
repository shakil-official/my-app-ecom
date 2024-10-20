import {DataTable} from "@ui/data-table";
import {fetchCategoriesStart, setName, setPage, setStatus} from "@/store/slices/categorySlice";
import {Input} from "@ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@ui/select";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {useEffect} from "react";
import {CategoryColumns} from "@/components/Category/CategoryColumns";

const CategoryDataTable = () => {

    const dispatch = useDispatch(); // Initialize the dispatch function
    const {
        categories,
        total,
        page,
        limit,
        query,
        loading,
        dataTableReload
    } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        dispatch(fetchCategoriesStart({page, limit, query}));
    }, [dispatch, page, limit, dataTableReload, query]);


    return (
        <>
            <DataTable data={categories}
                       columns={CategoryColumns}
                       limit={limit}
                       total={total}
                       page={page}
                       isLoading={loading}
                       onPageChange={(newPage: number) => {
                           dispatch(setPage(newPage));
                       }}
                       filters={[
                           {
                               id: "name",
                               component: (value, setValue) => (
                                   <Input
                                       placeholder="Filter by name..."
                                       value={value}

                                       onChange={(e) => {
                                           dispatch(setName(e.target.value))
                                           setValue(e.target.value)
                                       }}
                                       className="max-w-sm"
                                   />
                               ),
                           },
                           {
                               id: "status",
                               component: (value, setValue) => (
                                   <Select value={value} onValueChange={(data) => {
                                       if (data && data !== 'null'){
                                           dispatch(setStatus(data))
                                           setValue(data)
                                       }
                                   }}>
                                       <SelectTrigger>
                                           <SelectValue placeholder="Status"/>
                                       </SelectTrigger>
                                       <SelectContent>
                                           <SelectItem value="active">Active</SelectItem>
                                           <SelectItem value="inactive">Inactive</SelectItem>
                                       </SelectContent>
                                   </Select>
                               ),
                           },
                       ]}
            />
        </>
    )
}


export default CategoryDataTable;