"use client"; // Mark this component as a client component

import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation"; // Use Next.js router for redirection
import {loginRequest} from "@/store/slices/authSlice"; // Adjust path as necessary
import {RootState} from "@/store/store"; // Import RootState based on your store setup
import {Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/Custom/Card"; // Import custom Card components
import Input from "@/components/Custom/Input"; // Import custom Input component
import {Button} from "@/components/Custom/Button"; // Import Button component
import {validateEmail, validatePassword} from "@/services/authValidationService"; // Import validation functions

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const router = useRouter(); // Next.js router

    const {error, loading, isLogin} = useSelector((state: RootState) => state.auth); // Access auth state from Redux store

    // Single useState to manage form fields and error
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        formError: '', // Validation error state
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value, // Dynamically update based on input name
            formError: '', // Reset error on input change
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(formState.email);
        const passwordError = validatePassword(formState.password);

        if (emailError || passwordError) {
            setFormState((prev) => ({
                ...prev,
                formError: emailError || passwordError || '', // Only valid strings or empty string
            }));
            return;
        }

        dispatch(loginRequest({email: formState.email, password: formState.password})); // Dispatch login request
    };

    useEffect(() => {
        if (isLogin) {
            // Redirect to dashboard or another page after successful login
            router.push('/'); // Adjust path as needed
        }
    }, [isLogin, router]);

    return (
        <Card className="w-full max-w-sm mx-auto mt-10">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-2 pt-3">
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="grid gap-2 pt-3">
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={formState.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {formState.formError && <p style={{color: 'red'}}>{formState.formError}</p>}
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <CardFooter>
                        <Button type="submit" disabled={loading} className="w-full pt-5">
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};

export default Login;
