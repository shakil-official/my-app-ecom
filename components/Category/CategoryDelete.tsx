
import React from "react";


interface DeleteCategoryProps {
    data: number | object | string;
}

const CategoryDelete: React.FC<DeleteCategoryProps> = ({ data }) => {
    console.log("Deleting category:", data);

    return (
     <></>
    );
};

export default CategoryDelete;
