// /app/login/page.tsx
"use client"; // Mark this component as a client component

import Login from '@/components/Auth/Login';
import useRequireAuth from "@/hooks/useRequireAuth"; // Ensure this import path is correct

const LoginPage = () => {

    useRequireAuth()
    return (
        <>
            <Login/>
        </>
    );
};

export default LoginPage;
