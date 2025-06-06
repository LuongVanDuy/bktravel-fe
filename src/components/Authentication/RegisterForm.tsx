"use client";

import React, { useState } from "react";

import { Form, Input, Button, message } from "antd";
import { fetchApi } from "@/helper/api";

const RegisterForm = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const signupData = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    };

    fetchApi("register", "POST", signupData)
      .then((res) => {
        if (res && res.success) {
          messageApi.success("Đăng ký thành công!");
          form.resetFields();
        } else {
          messageApi.error("Đăng ký thất bại, vui lòng thử lại.");
        }
      })
      .catch((error) => {
        messageApi.error(error.message);
      });
  };

  return (
    <Form form={form} name="register-form" layout="vertical" onFinish={handleSubmit} className="login-register-form" autoComplete="off">
      {contextHolder}
      <h4>Đăng Ký Tài Khoản</h4>

      <Form.Item name="fullName" rules={[{ required: true, message: "Vui lòng cung cấp họ và tên." }]}>
        <Input size="large" placeholder="Họ và Tên" className="form-control" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Vui lòng cung cấp email." },
          { type: "email", message: "Email không hợp lệ." },
        ]}
      >
        <Input size="large" placeholder="Email" className="form-control" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Vui lòng nhập mật khẩu." },
          { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự." },
        ]}
      >
        <Input.Password size="large" placeholder="Mật khẩu" className="form-control" />
      </Form.Item>

      <Form.Item
        name="repeatPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Vui lòng nhập lại mật khẩu." },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu xác nhận không khớp."));
            },
          }),
        ]}
      >
        <Input.Password size="large" placeholder="Nhập lại mật khẩu" className="form-control" />
      </Form.Item>

      <Form.Item className="mb-0">
        <Button type="primary" htmlType="submit" className="default-btn active rounded-10 w-100 text-center d-block border-0">
          Đăng ký ngay
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
