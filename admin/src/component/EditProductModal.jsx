import React, { useState } from "react";
import "./EditProductModal.css";
import axios from "axios";
import { message } from "antd";
const EditProductModal = ({ product, onClose }) => {
    const [editedProduct, setEditedProduct] = useState({ ...product });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_APP_SERVER_HOST_ADMIN}/products/${
                    editedProduct.id
                }`,
                editedProduct
            );
            if (response.status === 200) {
                message.success("Product updated successfully");
            } else {
                message.error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            message.error("An error occurred while updating the product");
        }

        onClose();
    };

    return (
        <div className="edit-product-modal">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="name">Name:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="name"
                        value={editedProduct.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="name">Price:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="retail_price_cents"
                        value={editedProduct.retail_price_cents}
                        onChange={handleInputChange}
                        name="retail_price_cents"
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="brand">Brand:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="brand_name"
                        value={editedProduct.brand_name}
                        onChange={handleInputChange}
                        name="brand_name"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">Box Condition:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="box_condition"
                        value={editedProduct.box_condition}
                        onChange={handleInputChange}
                        name="box_condition"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">Category:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="category"
                        value={editedProduct.category}
                        onChange={handleInputChange}
                        name="category"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">Collection Slugs:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="collection_slugs"
                        value={editedProduct.collection_slugs}
                        onChange={handleInputChange}
                        name="collection_slugs"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">Color:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="color"
                        value={editedProduct.color}
                        onChange={handleInputChange}
                        name="color"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">designer:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="designer"
                        value={editedProduct.designer}
                        onChange={handleInputChange}
                        name="designer"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">details:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="details"
                        value={editedProduct.details}
                        onChange={handleInputChange}
                        name="details"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">gender:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="gender"
                        value={editedProduct.gender}
                        onChange={handleInputChange}
                        name="gender"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">grid_picture_url:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="grid_picture_url"
                        value={editedProduct.grid_picture_url}
                        onChange={handleInputChange}
                        name="grid_picture_url"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">has_stock:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="has_stock"
                        value={editedProduct.has_stock}
                        onChange={handleInputChange}
                        name="has_stock"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">keywords:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="keywords"
                        value={editedProduct.keywords}
                        onChange={handleInputChange}
                        name="keywords"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">main_picture_url:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="main_picture_url"
                        value={editedProduct.main_picture_url}
                        onChange={handleInputChange}
                        name="main_picture_url"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">midsole:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="midsole"
                        value={editedProduct.midsole}
                        onChange={handleInputChange}
                        name="midsole"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">nickname:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="nickname"
                        value={editedProduct.nickname}
                        onChange={handleInputChange}
                        name="nickname"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">original_picture_url:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="original_picture_url"
                        value={editedProduct.original_picture_url}
                        onChange={handleInputChange}
                        name="original_picture_url"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">shoe_condition:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="shoe_condition"
                        value={editedProduct.shoe_condition}
                        onChange={handleInputChange}
                        name="shoe_condition"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">size_range:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="size_range"
                        value={editedProduct.size_range}
                        onChange={handleInputChange}
                        name="size_range"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="brand">release_date:</label>
                </div>
                <div className="form-row">
                    <input
                        type="text"
                        id="release_date"
                        value={editedProduct.release_date}
                        onChange={handleInputChange}
                        name="release_date"
                    />
                </div>

                {/* Add more input fields for other product properties */}
                <button type="submit">Save</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditProductModal;
