"use client"; // Mark this component as a client component

import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod"

import {useRouter} from "next/navigation"; // Use Next.js router for redirection
import {loginRequest} from "@/store/slices/authSlice"; // Adjust path as necessary
import {RootState} from "@/store/store"; // Import RootState based on your store setup
import {Card, CardContent, CardHeader, CardTitle} from "@ui/card"; // Import custom Card components
import {Input} from "@ui/input";
import {Button} from "@ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@ui/form";
import {toast} from "@/hooks/use-toast"; // Import validation functions
import {Toaster} from "@/components/ui/toaster"


const FormSchema = z.object({
    email: z.string().min(2, {
        message: "Email must be at least 1 characters.",
    }).email(),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const router = useRouter(); // Next.js router

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const {error, errorMessage, loading, isLogin} = useSelector((state: RootState) => state.auth); // Access auth state from Redux store

    function onSubmit(data: z.infer<typeof FormSchema>) {
        dispatch(loginRequest({email: data.email, password: data.password})); // Dispatch login request
    }

    useEffect(() => {
        if (error) {
            toast({
                title: "Warning",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 text-white p-4">{errorMessage} </pre>
                ),
            });
        }

        if (isLogin) {
            router.push('/');
        }

    }, [isLogin, router, error, errorMessage]);

    return (
        <>
            <Card className="w-full max-w-sm mx-auto mt-10">
                <CardHeader>
                    <CardTitle className="text-2xl mx-auto">Login</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="pace-y-8 ">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Please provide your email
                                        </FormDescription>
                                        <FormMessage className='mb-1'/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Enter your password" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Please provide your password
                                        </FormDescription>
                                        <FormMessage className='mb-1'/>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit"
                                    className="mt-2"
                                    disabled={loading}>Login</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Toaster/>
        </>
    );
};

export default Login;
