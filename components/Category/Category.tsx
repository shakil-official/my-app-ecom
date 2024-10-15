"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@ui/card"
import DialogComponent from "@/components/Reusable/DialogComponent";
import CategoryFormCreate from "@/components/Category/CategoryFormCreate";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {RootState} from "@/store/store";
import {dialogReset} from "@/store/slices/categorySlice";

import CategoryDataTable from "@/components/Category/CategoryDataTable";
import {PlusCircle} from "lucide-react";


const Category = () => {

    const [isDialogOpen, setDialogOpen] = useState(false); // State to control dialog open/close
    const toggleDialog = (open: boolean) => {
        setDialogOpen(open);
    };

    const {close} = useSelector((state: RootState) => state.category)
    const dispatch = useDispatch(); // Initialize the dispatch function


    useEffect(() => {
        if (close) {
            setDialogOpen(() => false);
            dispatch(dialogReset()); // Dispatch the dialogReset action to reset the close state
        }
    }, [close, dispatch]);


    return (
        <>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="ml-auto flex items-center gap-2">
                    <DialogComponent
                        buttonLabel="Add Category"
                        dialogTitle="Category Add"
                        open={isDialogOpen}
                        onToggle={toggleDialog} // Pass the toggle function
                        icon={<PlusCircle className="h-3.5 w-3.5"/>} // Pass the icon here
                    >
                        <CategoryFormCreate/>
                    </DialogComponent>
                </div>

                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Category Manage</CardTitle>
                        <CardDescription>
                            Manage your category.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CategoryDataTable/>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </main>
        </>
    );
};

export default Category;
