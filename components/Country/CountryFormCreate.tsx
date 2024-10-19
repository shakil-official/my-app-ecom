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
import {createRequest} from "@/store/slices/countrySlice";
import {RootState} from "@/store/store";
import {useToast} from "@/hooks/use-toast"


const formSchema = z.object({
    countryName: z.string().max(50, {
        message: "Country name can not be more then 50 character",
    }).min(1, {
        message: "Country name is required"
    }),
    status: z.boolean(),
});
const CountryFormCreate: React.FC = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            countryName: "", // country
            status: true,
        }
    });

    const {toast} = useToast()
    const dispatch = useDispatch();
    const {error, loading, responseErrorMessage, success} = useSelector((state: RootState) => state.country)

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        dispatch(createRequest({
            name: values.countryName,
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
                description: "Country created"
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
                    <FormField name="countryName"
                               control={form.control}
                               render={({field}) => {
                                   return (
                                       <FormItem>
                                           <FormLabel>Country name</FormLabel>
                                           <FormControl>
                                               <Input
                                                   type="text"
                                                   placeholder="Please enter country name"
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
                                        Country Status
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

export default CountryFormCreate;
