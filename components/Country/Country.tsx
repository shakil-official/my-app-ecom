"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@ui/card"
import DialogComponent from "@/components/Reusable/DialogComponent";
import CountryFormCreate from "@/components/Country/CountryFormCreate";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {RootState} from "@/store/store";
import {dialogReset} from "@/store/slices/countrySlice";
import CountryDataTable from "@/components/Country/CountryDataTable";
import {PlusCircle} from "lucide-react";
import {toast} from "@/hooks/use-toast";


const Country = () => {

    const [isDialogOpen, setDialogOpen] = useState(false); // State to control dialog open/close
    const toggleDialog = (open: boolean) => {
        setDialogOpen(open);
    };

    const {close} = useSelector((state: RootState) => state.country)
    const dispatch = useDispatch(); // Initialize the dispatch function
    const {error, responseErrorMessage, success, message} = useSelector((state: RootState) => state.country)


    useEffect(() => {
        if (error) {
            toast({
                title: "Warning",
                description: responseErrorMessage,
                variant: 'destructive'
            })
        }

        if (success) {
            toast({
                title: "Success",
                description: message
            })
        }
    }, [error, message, responseErrorMessage, success]);


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
                        buttonLabel="Add Country"
                        dialogTitle="Country Add"
                        open={isDialogOpen}
                        onToggle={toggleDialog} // Pass the toggle function
                        icon={<PlusCircle className="h-3.5 w-3.5"/>} // Pass the icon here
                    >
                        <CountryFormCreate/>
                    </DialogComponent>
                </div>

                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Country Manage</CardTitle>
                        <CardDescription>
                            Manage your country.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CountryDataTable/>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </main>
        </>
    );
};

export default Country;
