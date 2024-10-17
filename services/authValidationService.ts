// services/validationService.ts

export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "Please enter a valid email address.";
};

export const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
        return "Password must be at least 6 characters long.";
    }
    return null; // Return null if the password is valid
};
