import { useState } from 'react';

const ProductForm = ({ onSubmit, initialData }) => {
    const [name, setName] = useState(initialData ? initialData.name : '');
    const [price, setPrice] = useState(initialData ? initialData.price : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, price });
        setName('');
        setPrice('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <button type="submit">{initialData ? 'Update' : 'Add'} Product</button>
        </form>
    );
};

export default ProductForm;
