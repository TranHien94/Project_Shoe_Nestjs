import React, { useState, useEffect } from 'react';
import './EditUserModal.css';
import axios from 'axios';
import { message } from "antd";

function EditUserModal({ editingUser, onClose, }) {
    const [updatedUser, setUpdatedUser] = useState({});

    useEffect(() => {
        if (editingUser) {
            setUpdatedUser({ ...editingUser });
        }
    }, [editingUser]);

    const saveUser = async () => {
        try {
            await axios.put(
                `${import.meta.env.VITE_APP_SERVER_HOST_ADMIN}/users/${
                    updatedUser.id
                }`,
                updatedUser
            );
            // Close the modal and perform any necessary actions
            onClose();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveUser();
    };

    return (
        <div className="edit-user-modal">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    User Name:
                    <input
                        type="text"
                        name="username"
                        value={updatedUser.username || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={updatedUser.email || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={updatedUser.password || ""}
                        onChange={handleChange}
                    />
                </label>
                <button type="button" onClick={saveUser}>
                    Save
                </button>
                <button type="button" onClick={onClose}>
                    {" "}
                    Cancel{" "}
                </button>
            </form>
        </div>
    );
}

export default EditUserModal;
