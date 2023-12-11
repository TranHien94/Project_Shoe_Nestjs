import React, { useState } from "react";
import ProductManagement from "../component/ProductManagement";
import UserManagement from "../component/UserManagement";
import "./AdminPanel.css"; 

const AdminPanel = () => {
    const [selectedNavItem, setSelectedNavItem] = useState("products");

    // Function to handle navigation item selection
    const handleNavItemClick = (item) => {
        setSelectedNavItem(item);
    };

    // Render the content based on the selected navigation item
    const renderContent = () => {
        if (selectedNavItem === "products") {
            return <ProductManagement />;
        } else if (selectedNavItem === "users") {
            return <UserManagement />;
        }
    };

    return (
        <div className="admin-panel">
            <div className="left-panel">
                <div
                    className={`nav-item ${
                        selectedNavItem === "products" ? "active" : ""
                    }`}
                    onClick={() => handleNavItemClick("products")}
                >
                    Products
                </div>
                <div
                    className={`nav-item ${
                        selectedNavItem === "users" ? "active" : ""
                    }`}
                    onClick={() => handleNavItemClick("users")}
                >
                    Users
                </div>
            </div>
            <div className="right-panel">{renderContent()}</div>
        </div>
    );
};

export default AdminPanel;
