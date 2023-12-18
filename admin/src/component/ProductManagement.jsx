import React, { useState, useEffect } from "react";
import EditProductModal from "./EditProductModal";
import axios from "axios";
import { message } from "antd";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_SERVER_HOST_ADMIN}/products/`
            );
            setProducts(response.data.product);
            console.log("response.data", response.data.product);
            console.log("products", products);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await axios.delete(
                `${
                    import.meta.env.VITE_APP_SERVER_HOST_ADMIN
                }/products/${productId}`
            );

            if (response.status === 200) {
                fetchProducts();
                message.success(response.data.message);
            } else {
                console.error("Delete products failed:", response.data.message);
                message.error(response.data.message);
            }
        } catch (error) {
            console.error("Delete products failed:", error);
            message.error("Delete products failed");
        }
    };

    // Function to handle opening the modal for editing a product
    const openModal = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    // Function to handle closing the modal
    const closeModal = () => {
        setEditingProduct(null);
        setIsModalOpen(false);
        fetchProducts();
    };

    return (
        <div>
            <h1>Product Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.brand_name}</td>
                            <td>{product.retail_price_cents}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleDeleteProduct(product.id)
                                    }
                                >
                                    Delete
                                </button>
                                <button onClick={() => openModal(product)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <EditProductModal
                    product={editingProduct}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default ProductManagement;
