"use client";

import React, {useEffect, useState} from "react";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage} from '@ui/form';
import {Input} from "@ui/input";
import {Button} from "@ui/button";
import {Switch} from "@ui/switch";
import {useDispatch, useSelector} from "react-redux";
import {updateRequest} from "@/store/slices/categorySlice";
import {RootState} from "@/store/store";
import {useToast} from "@/hooks/use-toast"
import {CategoryFormUpdatePropsInterface} from "@/interface/CategoryFormUpdatePropsInterface";


const formSchema = z.object({
    categoryName: z.string().max(50, {
        message: "Category name can not be more then 50 character",
    }).min(1, {
        message: "Category name is required"
    }),
    status: z.boolean(),
    id: z.onumber()
});
const CategoryFormUpdate: React.FC<CategoryFormUpdatePropsInterface> = ({id, categoryName, status}) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryName: categoryName,
            status: status,
            id: id
        }
    });

    const [loading, setLoading] = useState(false);

    const handleUpdate = (values: z.infer<typeof formSchema>) => {
        dispatch(updateRequest({
            id: id,
            name: values.categoryName,
            status: values.status ? 'active' : 'inactive'
        }));

        setLoading(() => true)
    }

    const dispatch = useDispatch();
    const {error, responseErrorMessage, success} = useSelector((state: RootState) => state.category)
    const {toast} = useToast()

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
                title: "Warning",
                description: "Category updated"
            })
        }

    }, [error, responseErrorMessage, success, toast]);


    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleUpdate)}
                    className="max-w-screen-lg w-full flex flex-col gap-4"
                >
                    <FormField name="categoryName"
                               control={form.control}
                               render={({field}) => {
                                   return (
                                       <FormItem>
                                           <FormLabel>Category name</FormLabel>
                                           <FormControl>
                                               <Input
                                                   type="text"
                                                   placeholder="Please enter category name"
                                                   {...field} />
                                           </FormControl>
                                           <FormMessage/>
                                       </FormItem>
                                   )
                               }}>
                    </FormField>

                    <FormField
                        control={form.control}
                        name="status"
                        render={({field}) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        Status
                                    </FormLabel>
                                    <FormDescription>
                                        It&apos;s can be Active or Inactive
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full"
                            disabled={loading}>{loading ? 'Loading' : 'Update'}
                    </Button>
                </form>
            </Form>


        </>
    );
};

export default CategoryFormUpdate;

