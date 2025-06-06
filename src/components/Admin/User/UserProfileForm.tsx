import React from "react";
import { Form, Row, Col, Card, Button } from "antd";
import { ProForm, ProFormText, ProFormTextArea, ProFormDatePicker } from "@ant-design/pro-components";
import OneImageUploader from "../Form/OneImageUploader";

const UserProfileForm: React.FC<{ form: any; onFinish: (values: any) => void }> = ({ form, onFinish }) => {
  return (
    <ProForm form={form} onFinish={onFinish} submitter={false}>
      <Row gutter={16}>
        <Col span={8}>
          <Card size="small">
            <ProForm.Item name="avatar" label="Ảnh đại diện">
              <OneImageUploader />
            </ProForm.Item>
            <ProFormText
              name="username"
              label="Tên người dùng"
              placeholder="Nhập Tên người dùng"
              rules={[{ required: true, message: "Vui lòng nhập Tên người dùng" }]}
              disabled
            />
            <ProFormText name="email" label="Email" placeholder="Nhập email" rules={[{ required: true, message: "Vui lòng nhập email" }]} />
          </Card>
        </Col>
        <Col span={16}>
          <Card size="small">
            <ProFormText
              name="fullName"
              label="Tên đầy đủ"
              placeholder="Nhập tên đầy đủ"
              rules={[{ required: true, message: "Vui lòng Nhập tên đầy đủ" }]}
            />
            <ProFormText
              name="phone"
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              rules={[{ required: true, message: "Vui lòng Nhập số điện thoại" }]}
            />
            <ProFormDatePicker name="dateOfBirth" label="Ngày sinh" placeholder="Chọn ngày sinh" format="DD-MM-YYYY" />
            <ProFormText name="address" label="Địa chỉ" placeholder="Nhập địa chỉ" />
            <ProFormTextArea
              name="about"
              label="Giới thiệu"
              placeholder="Mô tả ngắn về bản thân"
              fieldProps={{
                autoSize: { minRows: 4, maxRows: 6 },
              }}
            />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </ProForm>
  );
};

export default UserProfileForm;
