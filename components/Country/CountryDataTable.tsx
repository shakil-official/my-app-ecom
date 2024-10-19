import {DataTable} from "@ui/data-table";
import {fetchCountriesStart, setName, setPage, setStatus} from "@/store/slices/countrySlice";
import {Input} from "@ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@ui/select";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {useEffect} from "react";
import {CountryColumns} from "@/components/Country/CountryColumns";

const CountryDataTable = () => {

    const dispatch = useDispatch(); // Initialize the dispatch function
    const {
        countries,
        total,
        page,
        limit,
        query,
        loading,
        dataTableReload
    } = useSelector((state: RootState) => state.country);

    useEffect(() => {
        dispatch(fetchCountriesStart({page, limit, query}));
    }, [dispatch, page, limit, dataTableReload, query]);

    console.log(countries)

    return (
        <>
            <DataTable data={countries}
                       columns={CountryColumns}
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


export default CountryDataTable;