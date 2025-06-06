import React from "react";
import { Form, Row, Col, Card, Button, Checkbox, Tabs, InputNumber, Input, Select } from "antd";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import OneImageUploader from "../Form/OneImageUploader";
import MultiImageUploader from "../Form/MultiImageUploader";
import TabPane from "antd/es/tabs/TabPane";
import RichTextEditor from "../Form/RichTextEditor";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const TourDetailForm: React.FC<{ form?: any; onFinish: (values: any) => void; categoryList: any }> = ({ form, onFinish, categoryList }) => {
  return (
    <ProForm form={form} onFinish={onFinish} submitter={false}>
      <Row gutter={16}>
        <Col xs={24} md={18}>
          <ProFormText
            name="title"
            placeholder="Nhập tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            fieldProps={{
              style: {
                fontSize: "20px",
                height: "40px",
              },
            }}
            label={false}
          />
          <Card size="small" style={{ marginBottom: "15px" }} title="Chi tiết tour">
            <Tabs defaultActiveKey="info1" type="card">
              <TabPane tab="Điểm Nhấn Hành Trình" key="info1" forceRender>
                <ProForm.Item name="description">
                  <RichTextEditor height={450} />
                </ProForm.Item>
              </TabPane>
              <TabPane tab="Bảng giá" key="info2" forceRender>
                <Row gutter={16}>
                  <Col span={8}>
                    <ProForm.Item name="priceAdult" label="Giá người lớn">
                      <InputNumber
                        min={0}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as any}
                        style={{ width: "100%" }}
                        placeholder="Nhập giá người lớn"
                      />
                    </ProForm.Item>

                    <ProForm.Item name="priceChild" label="Giá trẻ em">
                      <InputNumber
                        min={0}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as any}
                        style={{ width: "100%" }}
                        placeholder="Nhập giá trẻ em"
                      />
                    </ProForm.Item>

                    <ProForm.Item name="priceBaby" label="Giá em bé">
                      <InputNumber
                        min={0}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as any}
                        style={{ width: "100%" }}
                        placeholder="Nhập giá em bé"
                      />
                    </ProForm.Item>
                  </Col>

                  <Col span={16}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Khởi hành từ"
                          name={["transportInfo", "departFrom"]}
                          rules={[{ required: true, message: "Vui lòng chọn nơi khởi hành" }]}
                        >
                          <Select
                            placeholder="Chọn nơi khởi hành"
                            options={[
                              { label: "Hà Nội", value: "Hà Nội" },
                              { label: "TP. Hồ Chí Minh", value: "TP. Hồ Chí Minh" },
                            ]}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          label="Khởi hành đến"
                          name={["transportInfo", "departTo"]}
                          rules={[{ required: true, message: "Vui lòng nhập điểm đến khi khởi hành" }]}
                        >
                          <Input placeholder="Nhập điểm đến khi khởi hành" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item label="Về từ" name={["transportInfo", "arriveFrom"]} rules={[{ required: true, message: "Vui lòng nhập nơi về" }]}>
                          <Input placeholder="Nhập nơi về" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          label="Về đến"
                          name={["transportInfo", "arriveTo"]}
                          rules={[{ required: true, message: "Vui lòng nhập điểm đến khi về" }]}
                        >
                          <Input placeholder="Nhập điểm đến khi về" />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          label="Phương tiện di chuyển"
                          name={["transportInfo", "transportMode"]}
                          rules={[{ required: true, message: "Vui lòng chọn phương tiện di chuyển" }]}
                        >
                          <Select
                            placeholder="Chọn phương tiện di chuyển"
                            options={[
                              { label: "Xe khách", value: "Xe khách" },
                              { label: "Xe limousine", value: "Xe limousine" },
                              { label: "Máy bay", value: "Máy bay" },
                              { label: "Tàu hỏa", value: "Tàu hỏa" },
                              { label: "Tàu cao tốc", value: "Tàu cao tốc" },
                              { label: "Xe máy", value: "Xe máy" },
                              { label: "Ô tô riêng", value: "Ô tô riêng" },
                              { label: "Du thuyền", value: "Du thuyền" },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label="Chi tiết phương tiện / hành trình"
                          name={["transportInfo", "description"]}
                          rules={[{ required: true, message: "Vui lòng nhập chi tiết phương tiện" }]}
                        >
                          <TextArea placeholder="Nhập chi tiết phương tiện hoặc hành trình" rows={4} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Địa điểm tham quan" key="info3">
                <Form.List name="locations">
                  {(fields, { add, remove }) => {
                    const groupedFields = [];
                    for (let i = 0; i < fields.length; i += 2) {
                      groupedFields.push(fields.slice(i, i + 2));
                    }

                    return (
                      <>
                        {groupedFields.map((group, groupIndex) => (
                          <Row gutter={16} key={groupIndex} style={{ marginBottom: 16 }}>
                            {group.map(({ key, name, ...restField }) => (
                              <Col xs={24} md={12} key={key}>
                                <div
                                  style={{
                                    padding: 12,
                                    border: "1px solid #d9d9d9",
                                    borderRadius: 6,
                                    position: "relative",
                                    background: "#fafafa",
                                  }}
                                >
                                  <Form.Item
                                    {...restField}
                                    label="Tên địa điểm"
                                    name={[name, "title"]}
                                    rules={[{ required: true, message: "Vui lòng nhập tên địa điểm" }]}
                                  >
                                    <Input placeholder="Nhập tên địa điểm" />
                                  </Form.Item>

                                  <Form.Item
                                    {...restField}
                                    label="Ảnh địa điểm"
                                    name={[name, "image"]}
                                    rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                                  >
                                    <OneImageUploader />
                                  </Form.Item>

                                  <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => remove(name)}
                                    size="small"
                                    style={{ position: "absolute", top: 8, right: 8 }}
                                  />
                                </div>
                              </Col>
                            ))}
                          </Row>
                        ))}

                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Thêm địa điểm
                          </Button>
                        </Form.Item>
                      </>
                    );
                  }}
                </Form.List>
              </TabPane>
              <TabPane tab="Lịch trình" key="info4">
                <Form.List name="schedules">
                  {(fields, { add, remove }) => {
                    const groupedFields = [];
                    for (let i = 0; i < fields.length; i += 2) {
                      groupedFields.push(fields.slice(i, i + 2));
                    }

                    return (
                      <>
                        {groupedFields.map((group, groupIndex) => (
                          <Row gutter={16} key={groupIndex} style={{ marginBottom: 16 }}>
                            {group.map(({ key, name, ...restField }, indexInGroup) => {
                              const dayNumber = groupIndex * 2 + indexInGroup + 1;
                              const dayLabel = `Ngày ${dayNumber}`;

                              return (
                                <Col span={24} key={key}>
                                  <div
                                    style={{
                                      padding: 12,
                                      border: "1px solid #d9d9d9",
                                      borderRadius: 6,
                                      position: "relative",
                                      background: "#fafafa",
                                      marginBottom: 16,
                                    }}
                                  >
                                    <div style={{ fontWeight: "bold", marginBottom: 8 }}>{dayLabel}</div>
                                    <Form.Item name={[name, "day"]} initialValue={dayLabel} hidden>
                                      <Input />
                                    </Form.Item>

                                    <Form.Item
                                      {...restField}
                                      name={[name, "title"]}
                                      rules={[{ required: true, message: "Vui lòng nhập tên địa điểm" }]}
                                    >
                                      <Input placeholder="Tên địa điểm" style={{ width: "100%" }} />
                                    </Form.Item>

                                    <ProForm.Item name={[name, "content"]}>
                                      <RichTextEditor height={300} />
                                    </ProForm.Item>

                                    <Button
                                      danger
                                      icon={<DeleteOutlined />}
                                      onClick={() => remove(name)}
                                      size="small"
                                      style={{ position: "absolute", top: 8, right: 8 }}
                                    />
                                  </div>
                                </Col>
                              );
                            })}
                          </Row>
                        ))}

                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Thêm lịch trình
                          </Button>
                        </Form.Item>
                      </>
                    );
                  }}
                </Form.List>
              </TabPane>
              <TabPane tab="Thông tin thêm" key="info5">
                <Tabs defaultActiveKey="included" type="card">
                  <TabPane tab="GIÁ TOUR BAO GỒM" key="included">
                    <ProForm.Item name="priceInclude">
                      <RichTextEditor height={300} />
                    </ProForm.Item>
                  </TabPane>
                  <TabPane tab="GIÁ TOUR KHÔNG BAO GỒM" key="excluded">
                    <ProForm.Item name="priceExclude">
                      <RichTextEditor height={300} />
                    </ProForm.Item>
                  </TabPane>
                  <TabPane tab="GIÁ VÀ QUY ĐỊNH TRẺ EM" key="childrenPolicy">
                    <ProForm.Item name="childTicket">
                      <RichTextEditor height={300} />
                    </ProForm.Item>
                  </TabPane>
                </Tabs>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card size="small" title="Hành động" style={{ marginBottom: "15px" }}>
            <Form.Item style={{ display: "flex", justifyContent: "end", marginBottom: 0 }}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Card>
          <Card size="small" title="Ảnh đại diện" style={{ marginBottom: "15px" }}>
            <ProForm.Item name="thumbnail">
              <OneImageUploader />
            </ProForm.Item>
          </Card>
          <Card size="small" title="Album ảnh" style={{ marginBottom: "15px" }}>
            <ProForm.Item name="images">
              <MultiImageUploader maxCount={5} />
            </ProForm.Item>
          </Card>
          <Card size="small" title="Danh mục tour" style={{ marginBottom: "15px" }}>
            <ProForm.Item name="categoryIds">
              <Checkbox.Group>
                {categoryList.map((cat: any) => (
                  <Checkbox key={cat.id} value={cat.id} style={{ marginLeft: cat.level * 20 }}>
                    {cat.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </ProForm.Item>
          </Card>
        </Col>
      </Row>
    </ProForm>
  );
};

export default TourDetailForm;
