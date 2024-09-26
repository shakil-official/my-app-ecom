"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";


const ProductManager = () => {


    return (
        <>


            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" className="h-7 gap-1">
                        <PlusCircle className="h-3.5 w-3.5"/>
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                    </Button>
                </div>

                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <CardDescription>
                            Manage your products and view their sales performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Image</span>
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Total Sales
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Created at
                                    </TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="hidden sm:table-cell">
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        Laser Lemonade Machine
                                    </TableCell>
                                    <TableCell>
                                        {/*<Badge variant="outline">Draft</Badge>*/}
                                    </TableCell>
                                    <TableCell>$499.99</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        25
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        2023-07-12 10:42 AM
                                    </TableCell>
                                    <TableCell>

                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
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
