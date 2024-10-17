import {useEffect, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation'; // Use next/navigation for Next.js 13
import validateToken from "@/services/api/tokenValidation"; // Import your token validation function

const useRequireAuth = () => {
    const router = useRouter();
    const pathname = usePathname(); // Get current pathname
    const [token, setToken] = useState<string | null>(null); // Use state to handle token

    useEffect(() => {
        // Ensure this runs only on the client
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken); // Set the token in state only once
        }
    }, []); // Run this effect once on component mount

    useEffect(() => {
        // Proceed only if the token exists
        if (token) {
            validateToken(token)
                .then((response) => {
                    console.log(response);
                    if (pathname === '/login') {
                        router.push('/'); // Redirect to home if already logged in
                    }
                })
                .catch((error) => {
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('token'); // Remove the invalid token
                    router.push('/login'); // Redirect to login if validation fails
                });
        }
    }, [token, pathname, router]); // Depend on token, pathname, and router

    return null; // No UI rendering from this hook
};

export default useRequireAuth;
