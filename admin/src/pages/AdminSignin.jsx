import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Title } = Typography;
import axios from "axios";

import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const AdminSignin = () => {
    const navigate = useNavigate();
   
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: "",
    });

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_SERVER_HOST_AUTH}/adminlogin`,
                userLogin
            );
            console.log('respo', response.data)

            if (response.status === 200 || response.status === 201) {
            setUserLogin(response.data);
                message.success(response.data.message);
                navigate("/admin");
            } else {
                console.error("Login failed:", response.data.message);
                message.error(response.data.message);
            }
        } catch (error) {
            console.error("Call API user fail", error);
            message.error("Login failed");
        }
    };
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        if (values.remember) {
            localStorage.setItem("usernameadmin", values.username);
            localStorage.setItem("passwordadmin", values.password);
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        console.log("Handle password recovery logic here");
    };
    const handleReset = () => {
        setUserLogin({
            username: "",
            password: "",
        });
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card style={{ width: 500 }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Title level={2}>SIGN IN </Title>
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Username"
                            onChange={(e) =>
                                setUserLogin({
                                    ...userLogin,
                                    username: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                            onChange={(e) =>
                                setUserLogin({
                                    ...userLogin,
                                    password: e.target.value,
                                })
                            }
                        />
                        <a
                            style={{ float: "right" }}
                            className="login-form-forgot"
                            href=""
                            onClick={handleForgotPassword}
                        >
                            Forgot password
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                            onClick={handleLogin}
                        >
                            Log in
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        Don't have an account <Link to="/">Hompage</Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AdminSignin;
