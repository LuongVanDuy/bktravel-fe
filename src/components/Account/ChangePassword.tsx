"use client";

import React from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { ProForm } from "@ant-design/pro-components";

interface ChangePasswordFormValues {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePasswordForm: React.FC<{ form: any; onFinish: (values: any) => void }> = ({ form, onFinish }) => {
  return (
    <ProForm form={form} onFinish={onFinish} submitter={false}>
      <Row gutter={16}>
        <Col sm={24} md={16}>
          <Form.Item label="Mật khẩu hiện tại" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}>
            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật mật khẩu
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </ProForm>
  );
};

export default ChangePasswordForm;
