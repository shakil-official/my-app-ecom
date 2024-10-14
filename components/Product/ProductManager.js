"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@ui/card"


import DialogComponent from "@/components/Helper/components/DialogComponent";
import {PlusCircle} from "lucide-react";
import {DataTableDemo} from "@/components/Helper/components/DataTableDemo";
import {useState} from "react";

const ProductManager = () => {
    const [isDialogOpen, setDialogOpen] = useState(false); // State to control dialog open/close
    const toggleDialog = (open: boolean) => {
        setDialogOpen(open);
    };

    return (
        <>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="ml-auto flex items-center gap-2">
                    <DialogComponent
                        buttonLabel="Add Product"
                        dialogTitle="Product Add"
                        dialogClass="md:max-w-screen-lg absolute top-[270px] sm:max-w-screen-lg sm:item-center"
                        open={isDialogOpen}
                        onToggle={toggleDialog} // Pass the toggle function
                        icon={<PlusCircle className="h-3.5 w-3.5"/>} // Pass the icon here
                    >
                        {/*here will be category form */}

                    </DialogComponent>
                </div>

                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <CardDescription>
                            Manage your products and view their sales performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <DataTableDemo></DataTableDemo>


                    </CardContent>
                    <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                            products
                        </div>
                    </CardFooter>
                </Card>
            </main>
        </>
    );
};

export default ProductManager;
