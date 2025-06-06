"use client";

import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        const response = await fetch("/api/auth/session");
        const session = await response.json();

        if (session.user) {
          if (session.user.isSuperAdmin === 1) {
            router.push("/admin");
          } else {
            router.push("/account");
          }
        }
      } else {
        const errorMessage = result?.error || "Đăng nhập thất bại, vui lòng kiểm tra lại!";
        messageApi.error(errorMessage);
      }
    } catch (error) {
      messageApi.error("Đã xảy ra lỗi, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form name="login-form" className="login-register-form" onFinish={handleSubmit} layout="vertical" autoComplete="off">
      {contextHolder}
      <h4>Đăng Nhập</h4>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Vui lòng cung cấp email hợp lệ." },
          { type: "email", message: "Email không hợp lệ." },
        ]}
      >
        <Input size="large" type="email" placeholder="Email" className="form-control" />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: "Vui lòng cung cấp mật khẩu." }]}>
        <Input.Password size="large" placeholder="Mật khẩu" className="form-control" />
      </Form.Item>

      <Form.Item>
        <div className="d-flex justify-content-between">
          <Checkbox>Giữ tôi đăng nhập</Checkbox>
          <Link href="/authentication/forgot-password">Quên mật khẩu?</Link>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} className="default-btn active rounded-10 w-100 text-center d-block border-0">
          Đăng Nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
