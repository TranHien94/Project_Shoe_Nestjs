import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Title } = Typography;
import axios from "axios";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
    //const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userSignup, setUserSignup] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSignup = async () => {
        try {
            if (
                !userSignup.email ||
                !userSignup.username ||
                !userSignup.password
            ) {
                message.error("Please fill is required fields.");
                return;
            }
            if (userSignup.password !== userSignup.confirmPassword) {
                message.error("Password no match.");
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_APP_SERVER_HOST_AUTH}/register`,
                userSignup
            );

            if (response.status === 200 || response.status === 201) {
                message.success(response.data.message);
                navigate("/explore");
            } else {
                console.error("Signup failed:", response.data.message);
                message.error(response.data.message);
            }
        } catch (error) {
            console.error("Call api signup fail", error);
            message.error("Signup failed");
        }
    };

    const onFinish = (values) => {
        console.log("received values ", values);
        if (values.remember) {
            localStorage.setItem("username", values.username);
            localStorage.setItem("password", values.password);
        }
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
                    <Title level={2}>SIGN UP </Title>
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
                                setUserSignup({
                                    ...userSignup,
                                    username: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Email"
                            onChange={(e) =>
                                setUserSignup({
                                    ...userSignup,
                                    email: e.target.value,
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
                                setUserSignup({
                                    ...userSignup,
                                    password: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your Password!",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) =>
                                setUserSignup({
                                    ...userSignup,
                                    confirmPassword: e.target.value,
                                })
                            }
                        />
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
                            onClick={handleSignup}
                        >
                            Sign up
                        </Button>
                        Already have an account?{" "}
                        <Link to="/login">Sign in</Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default SignUpForm;
