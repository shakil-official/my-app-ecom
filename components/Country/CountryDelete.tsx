import React from "react";
import Swal from "sweetalert2";
import {DropdownMenuItem} from "@ui/dropdown-menu";
import {useDispatch} from "react-redux";
import {deleteRequest} from "@/store/slices/countrySlice";


interface DeleteCountryProps {
    data: number;
}

const CountryDelete: React.FC<DeleteCountryProps> = ({data}) => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteRequest({
                    id: data,
                }))
            }
        });
    }

    return (
        <>
            <DropdownMenuItem onClick={handleDelete}>
                Delete
            </DropdownMenuItem>

        </>
    );
};

export default CountryDelete;
