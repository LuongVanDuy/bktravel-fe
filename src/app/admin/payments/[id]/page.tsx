"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Col, Form, message, Row } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { ProForm, ProFormDigit, ProFormSwitch, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { connect } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";
import { fetchPayment, updatePayment } from "@/store/actions/payments";

const UpdateCategory = (props: any) => {
  const { fetchPayment, paymentDetail, updatePayment } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const categoryId = Number(params.id);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [formField, setFormField] = useState<any | undefined>();

  const breadcrumbItems = [
    { label: "Thanh toán", href: "/admin/payments/all/" },
    { label: "Tất cả phương thức", href: "/admin/payments/all/" },
    { label: "Chỉnh sửa phương thức thanh toán" },
  ];

  const loadList = () => {
    fetchPayment(session?.user.accessToken, categoryId);
  };

  useEffect(() => {
    if (session?.user.accessToken) {
      loadList();
    }
  }, [session?.user.accessToken]);

  useEffect(() => {
    if (paymentDetail) {
      setFormField(paymentDetail);
    }
  }, [paymentDetail]);

  useEffect(() => {
    if (formField && Object.keys(formField).length) {
      form.setFieldsValue({
        code: formField.code,
        name: formField.name,
        description: formField.description,
        isActive: formField.isActive,
        sortOrder: formField.sortOrder,
      });
    }
  }, [formField]);

  const onSuccess = (messageContent: string) => {
    messageApi.success({
      content: messageContent,
    });
  };

  const onFailure = (error: any) => {
    messageApi.error({
      content: error,
    });
  };

  const handleFinish = async (values: any) => {
    const payload: any = {
      id: categoryId,
      data: {
        ...values,
        providerInfo: { value: values.providerInfo },
      },
    };
    updatePayment(session?.user.accessToken, payload, () => onSuccess("Cập nhật phương thức thanh toán thành công"), onFailure);
  };

  return (
    <LayoutAdmin>
      {contextHolder}
      <TopHeader items={breadcrumbItems} />
      <ProForm form={form} onFinish={handleFinish} submitter={false}>
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

const mapStateToProps = (state: any) => ({
  paymentDetail: state.payments.detail,
});

const mapDispatchToProps = {
  fetchPayment: fetchPayment,
  updatePayment: updatePayment,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCategory);
