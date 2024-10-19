"use client";

import React, {useState} from "react";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@ui/form';
import {Input} from "@ui/input";
import {Button} from "@ui/button";
import {Switch} from "@ui/switch";
import {useDispatch} from "react-redux";
import {updateRequest} from "@/store/slices/countrySlice";
import {CountryFormUpdatePropsInterface} from "@/interface/country/CountryFormUpdatePropsInterface";


const formSchema = z.object({
    countryName: z.string().max(50, {
        message: "Country name can not be more then 50 character",
    }).min(1, {
        message: "Country name is required"
    }),
    status: z.boolean(),
    id: z.onumber()
});
const CountryFormUpdate: React.FC<CountryFormUpdatePropsInterface> = ({id, countryName, status}) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            countryName: countryName,
            status: status,
            id: id
        }
    });

    const [loading, setLoading] = useState(false);

    const handleUpdate = (values: z.infer<typeof formSchema>) => {
        dispatch(updateRequest({
            id: id,
            name: values.countryName,
            status: values.status ? 'active' : 'inactive'
        }));

        setLoading(() => true)
    }

    const dispatch = useDispatch();


    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleUpdate)}
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

export default CountryFormUpdate;

