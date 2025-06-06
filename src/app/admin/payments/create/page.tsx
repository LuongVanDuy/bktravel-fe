"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Col, Form, message, Row } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { ProForm, ProFormDigit, ProFormSwitch, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";
import { createPayment } from "@/store/actions/payments";

const CreatePayment = (props: any) => {
  const { createPayment } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const breadcrumbItems = [
    { label: "Thanh toán", href: "/admin/payments/all/" },
    { label: "Tất cả phương thức thanh toán", href: "/admin/payments/all/" },
    { label: "Thêm phương thức thanh toán mới" },
  ];

  const onSuccess = (messageContent: string) => {
    messageApi.success({
      content: messageContent,
    });
    router.push("/admin/payments/all");
  };

  const onFailure = (error: any) => {
    messageApi.error({
      content: error,
    });
  };

  const handleFinish = async (values: any) => {
    const payload: any = {
      ...values,
      providerInfo: { value: values.providerInfo },
    };
    createPayment(session?.user.accessToken, payload, () => onSuccess("Thêm phương thức thanh toán thành công"), onFailure);
  };

  return (
    <LayoutAdmin>
      {contextHolder}
      <TopHeader items={breadcrumbItems} />
      <ProForm onFinish={handleFinish} submitter={false}>
        <Row gutter={16}>
          <Col span={18}>
            <Card size="small" title="Thông tin phương thức thanh toán">
              <ProFormText
                name="code"
                label="Mã phương thức"
                placeholder="Nhập mã (VD: CASH, MOMO)"
                rules={[{ required: true, message: "Vui lòng nhập mã phương thức" }]}
              />
              <ProFormText
                name="name"
                label="Tên phương thức"
                placeholder="Nhập tên hiển thị (VD: Tiền mặt, Momo)"
                rules={[{ required: true, message: "Vui lòng nhập tên" }]}
              />
              <ProFormTextArea name="description" label="Mô tả" placeholder="Nhập mô tả (nếu có)" />
              <ProFormTextArea
                name="providerInfo"
                label="Thông tin nhà cung cấp (JSON)"
                placeholder='VD: { "merchantId": "abc123", "apiKey": "xyz456" }'
                fieldProps={{ autoSize: { minRows: 3 } }}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card size="small" title="Hành động">
              <ProFormSwitch name="is_active" label="Kích hoạt" fieldProps={{ defaultChecked: true }} />
              <ProFormDigit name="sortOrder" label="Thứ tự hiển thị" placeholder="VD: 1, 2, 3..." min={0} />
              <Form.Item style={{ display: "flex", justifyContent: "end", marginBottom: 0 }}>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </ProForm>
    </LayoutAdmin>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  createPayment: createPayment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePayment);
