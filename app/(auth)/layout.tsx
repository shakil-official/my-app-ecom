"use client"; // Mark this component as a client component

import React from 'react';
import {Provider} from 'react-redux'; // Import Provider from react-redux
import store from "@/store/store";

export default function AuthLayout({children}: {
    readonly children: React.ReactNode;
}) {

    return (
        <Provider store={store}> {/* Wrap your layout with Provider */}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                {children}
            </div>
        </Provider>
    );
}
