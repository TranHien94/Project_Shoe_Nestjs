import React, { useState, useEffect, useId } from "react";
import "./UserManagement.css";
import Modal from "react-modal";
import axios from "axios";
import EditUserModal from "./EditUserModal";
import { message } from "antd";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal(user) {
        setEditingUser(user);
        setIsModalOpen(true);
    }

    function closeModal() {
        setEditingUser(null);
        setIsModalOpen(false);
        fetchUsers();
    }
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_SERVER_HOST_ADMIN}/users/`
            );
            setUsers(response.data.users);
            // console.log("response.data", response.data.users);
            console.log("users", users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_APP_SERVER_HOST_ADMIN}/users/${userId}`
            );

            if (response.status === 200) {
                fetchUsers();
                message.success(response.data.message);
            } else {
                console.error("Delete user fail:", response.data.message);
                message.error(response.data.message);
            }
            //setUsers(users.filter((user) => user.id !== userId));
        } catch (error) {
            console.error("Delete user fail:", error);
            message.error("Delete user failed");
        }
    };
    const handleEditUser = (user) => {
        openModal(user);
    };
    return (
        <div>
            <h2>User Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Delete
                                </button>
                                <button onClick={() => handleEditUser(user)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                <EditUserModal
                    editingUser={editingUser}
                    onClose={closeModal}
                    fetchUsers={fetchUsers}
                />
            </Modal>
        </div>
    );
};

export default UserManagement;
