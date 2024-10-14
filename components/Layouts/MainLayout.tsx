import SidebarMenu from "@/components/Menu/SidebarMenu";
import HeaderBar from "@/components/Layouts/HeaderBar";
import React from "react";
import store from "@/store/store";
import {Provider} from "react-redux";
import {Toaster} from "@ui/toaster";

const MainLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Provider store={store}> {/* Wrap your layout with Provider */}
                <div className="flex min-h-screen">
                    <SidebarMenu/>
                    {/* Main Content Area */}
                    <div className="flex-1 p-4 mb-5 bg-gray-100">
                        <HeaderBar/>

                        <div className="mt-4"> {/* Main content space */}
                            {children}
                        </div>
                        <Toaster/>

                    </div>
                </div>
            </Provider>
        </>
    );
};

export default MainLayout;
