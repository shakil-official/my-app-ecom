"use client";

import React, {useEffect} from "react";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage} from '@ui/form';
import {Input} from "@ui/input";
import {Button} from "@ui/button";
import {Switch} from "@ui/switch";
import {useDispatch, useSelector} from "react-redux";
import {createRequest} from "@/store/slices/categorySlice";
import {RootState} from "@/store/store";
import {useToast} from "@/hooks/use-toast"


const formSchema = z.object({
    categoryName: z.string().max(50, {
        message: "Category name can not be more then 50 character",
    }).min(1, {
        message: "Category name is required"
    }),
    status: z.boolean(),
});
const CategoryForm: React.FC = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryName: "",
            status: true,
        }
    });

    const {toast} = useToast()
    const dispatch = useDispatch();
    const {error, loading, responseErrorMessage, success} = useSelector((state: RootState) => state.category)

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        dispatch(createRequest({
            name: values.categoryName,
            status: values.status ? 'active' : 'inactive'
        }));
    }

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
                description: "Category created"
            })
        }


    }, [error, responseErrorMessage, success, toast]);


    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
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
                                        Category Status
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
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full"
                            disabled={loading}>{loading ? 'Loading' : 'Submit'}
                    </Button>
                </form>
            </Form>


        </>
    );
};

export default CategoryForm;
