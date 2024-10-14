import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Use next/navigation for Next.js 13
import { RootState } from '@/store/store';
import { usePathname } from 'next/navigation'; // Import usePathname hook

const useRequireAuth = () => {
    const router = useRouter();
    const pathname = usePathname(); // Get current pathname
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; // Get token from local storage

    useEffect(() => {
        const isAuthenticated = isLogin || !!token; // Check if authenticated from Redux state or local storage

        if (!isAuthenticated) {
            router.push('/login'); // Redirect to login page
        } else if (pathname === '/login') {
            router.push('/'); // Redirect to home or another page if logged in
        }
    }, [isLogin, pathname, router, token]); // Include token in the dependency array
};

export default useRequireAuth;
