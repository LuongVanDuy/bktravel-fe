"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Form, Input, InputNumber, message, Row, Select } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { connect, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { ProForm, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { useParams, useRouter } from "next/navigation";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { fetchTours } from "@/store/actions/tours";
import { updateOrder, fetchOrder } from "@/store/actions/orders";
import { fetchPayments } from "@/store/actions/payments";

const CreateOrder = (props: any) => {
  const { fetchTours, tourList, fetchPayments, paymentList, fetchOrder, orderDetail, updateOrder } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const orderId = Number(params.id);
  const [form] = Form.useForm();
  const [formField, setFormField] = useState<any | undefined>();
  const [messageApi, contextHolder] = message.useMessage();
  const breadcrumbItems = [
    { label: "Đặt tour", href: "/admin/orders/all/" },
    { label: "Tất cả tour đã đặt", href: "/admin/orders/all/" },
    { label: "Chỉnh sửa tour đã đặt" },
  ];

  const loadList = () => {
    fetchTours(session?.user.accessToken, {});
    fetchPayments(session?.user.accessToken, {});
    fetchOrder(session?.user.accessToken, orderId);
  };

  useEffect(() => {
    if (session?.user.accessToken) {
      loadList();
    }
  }, [session?.user.accessToken]);

  useEffect(() => {
    if (orderDetail) {
      setFormField(orderDetail);
    }
  }, [orderDetail]);

  useEffect(() => {
    if (formField && Object.keys(formField).length) {
      form.setFieldsValue({
        fullName: formField.fullName,
        billingEmail: formField.billingEmail,
        phoneNumber: formField.phoneNumber,
        address: formField.address,
        note: formField.note,
        orderItems: formField.orderItems && formField.orderItems.length > 0 ? formField.orderItems : [{}],
        totalPrice: formField.totalPrice || 0,
        paymentMethodId: formField.paymentMethodId,
        status: formField.status,
      });
    }
  }, [formField]);

  const onSuccess = (messageContent: string) => {
    messageApi.success({
      content: messageContent,
    });
    router.push("/admin/orders/all");
  };

  const onFailure = (error: any) => {
    messageApi.error({
      content: error,
    });
  };

  const handleFinish = async (values: any) => {
    const payload = {
      id: orderId,
      data: {
        ...values,
      },
    };
    updateOrder(session?.user.accessToken, payload, () => onSuccess("Đặt tour thành công"), onFailure);
  };

  return (
    <LayoutAdmin>
      {contextHolder}
      <TopHeader items={breadcrumbItems} />
      <ProForm
        form={form}
        onFinish={handleFinish}
        submitter={false}
        onValuesChange={(_, allValues) => {
          const orderItems = allValues.orderItems || [];

          const updatedItems = orderItems.map((item: any) => {
            if (!item || typeof item.tourId === "undefined") return item;

            const selectedTour = tourList.find((tour: any) => tour.id === item.tourId);
            if (selectedTour && typeof item.quantityAdult === "number") {
              return {
                ...item,
                priceSnapshot: item.quantityAdult * selectedTour.priceAdult,
              };
            }
            return item;
          });

          const totalPrice = updatedItems.reduce((sum: number, item: any) => sum + (item?.priceSnapshot || 0), 0);

          form.setFieldsValue({
            orderItems: updatedItems,
            totalPrice: totalPrice,
          });
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={9}>
            <Card size="small" style={{ marginBottom: 15 }} title="Thông tin đơn hàng">
              <ProFormText name="fullName" label="Họ tên" rules={[{ required: true }]} />
              <ProFormText name="billingEmail" label="Email" rules={[{ type: "email" }]} />
              <ProFormText name="phoneNumber" label="Số điện thoại" />
              <ProFormText name="address" label="Địa chỉ" />
              <ProFormTextArea name="note" label="Ghi chú" />
            </Card>
          </Col>
          <Col xs={24} md={15}>
            <Card size="small" title="Danh sách tour" style={{ marginBottom: 15 }}>
              <Form.List name="orderItems" initialValue={[{}]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => {
                      const selectedTourIds = form.getFieldValue("orderItems")?.map((item: any) => item?.tourId) || [];

                      return (
                        <Row key={key} gutter={16} align="middle" style={{ marginBottom: 10 }}>
                          <Col span={6}>
                            <Form.Item
                              {...restField}
                              name={[name, "tourId"]}
                              label="Tour"
                              rules={[{ required: true, message: "Vui lòng chọn tour" }]}
                            >
                              <Select
                                placeholder="Chọn tour"
                                showSearch
                                optionFilterProp="label"
                                options={tourList.map((tour: any) => ({
                                  label: tour.title,
                                  value: tour.id,
                                  disabled: selectedTourIds.some((id: any, idx: number) => id === tour.id && idx !== name),
                                }))}
                              />
                            </Form.Item>
                          </Col>

                          <Col span={4}>
                            <Form.Item
                              {...restField}
                              name={[name, "quantityAdult"]}
                              label="Người lớn"
                              rules={[
                                { type: "number", min: 0 },
                                {
                                  validator: (_, value, callback) => {
                                    const values = form.getFieldValue("orderItems")?.[name] || {};
                                    const { quantityChild = 0, quantityBaby = 0 } = values;
                                    if ((value || 0) + quantityChild + quantityBaby > 0) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject("Phải nhập ít nhất 1 số lượng");
                                  },
                                },
                              ]}
                              initialValue={0}
                            >
                              <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                          </Col>

                          <Col span={4}>
                            <Form.Item
                              {...restField}
                              name={[name, "quantityChild"]}
                              label="Trẻ em"
                              rules={[
                                { type: "number", min: 0 },
                                {
                                  validator: (_, value, callback) => {
                                    const values = form.getFieldValue("orderItems")?.[name] || {};
                                    const { quantityAdult = 0, quantityBaby = 0 } = values;
                                    if (quantityAdult + (value || 0) + quantityBaby > 0) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject("Phải nhập ít nhất 1 số lượng");
                                  },
                                },
                              ]}
                              initialValue={0}
                            >
                              <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                          </Col>

                          <Col span={4}>
                            <Form.Item
                              {...restField}
                              name={[name, "quantityBaby"]}
                              label="Em bé"
                              rules={[
                                { type: "number", min: 0 },
                                {
                                  validator: (_, value, callback) => {
                                    const values = form.getFieldValue("orderItems")?.[name] || {};
                                    const { quantityAdult = 0, quantityChild = 0 } = values;
                                    if (quantityAdult + quantityChild + (value || 0) > 0) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject("Phải nhập ít nhất 1 số lượng");
                                  },
                                },
                              ]}
                              initialValue={0}
                            >
                              <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                          </Col>

                          <Col span={4}>
                            <Form.Item noStyle shouldUpdate>
                              {() => {
                                const price = form.getFieldValue(["orderItems", name, "priceSnapshot"]);
                                return (
                                  <div style={{ marginTop: 0 }}>
                                    <strong>Giá: </strong>
                                    {price ? price.toLocaleString("vi-VN") + " ₫" : "0 ₫"}
                                  </div>
                                );
                              }}
                            </Form.Item>
                          </Col>

                          <Col span={2}>
                            <MinusCircleOutlined onClick={() => remove(name)} style={{ color: "red", fontSize: 20, marginTop: 0 }} />
                          </Col>
                        </Row>
                      );
                    })}

                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        + Thêm tour
                      </Button>
                    </Form.Item>
                    <Form.Item shouldUpdate>
                      {() => {
                        const total = form.getFieldValue("totalPrice") || 0;
                        return (
                          <div style={{ textAlign: "left", marginTop: 10 }}>
                            <strong>Tổng tiền:</strong> <span style={{ fontSize: 16, color: "#1890ff" }}>{total.toLocaleString("vi-VN")} ₫</span>
                          </div>
                        );
                      }}
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item name="totalPrice" noStyle>
                <Input value={form.getFieldValue("totalPrice")} hidden />
              </Form.Item>
            </Card>
            <Card size="small" title="Hành động">
              <Form.Item name="paymentMethodId" label="Phương thức thanh toán" rules={[{ required: true }]}>
                <Select
                  placeholder="Phương thức thanh toán"
                  showSearch
                  optionFilterProp="label"
                  options={paymentList.map((payment: any) => ({
                    label: `${payment.name} (${payment.code})`,
                    value: payment.id,
                  }))}
                />
              </Form.Item>
              <ProFormSelect
                name="status"
                label="Trạng thái đơn hàng"
                options={[
                  { label: "Pending", value: 0 },
                  { label: "Confirmed", value: 1 },
                  { label: "Processing", value: 2 },
                  { label: "Completed", value: 3 },
                  { label: "Cancelled", value: 4 },
                  { label: "Failed", value: 5 },
                  { label: "Refunded", value: 6 },
                ]}
              />
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
  tourList: state.tours.list,
  tourLoading: state.tours.loading,
  paymentList: state.payments.list,
  orderDetail: state.orders.detail,
  orderLoading: state.orders.loading,
});

const mapDispatchToProps = {
  fetchTours: fetchTours,
  fetchPayments: fetchPayments,
  fetchOrder: fetchOrder,
  updateOrder: updateOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
