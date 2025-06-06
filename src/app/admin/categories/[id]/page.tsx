"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Col, Form, message, Row } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import RichTextEditor from "@/components/Admin/Form/RichTextEditor";
import { connect } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchCategories, fetchCategory, updateCategory } from "@/store/actions/categories";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";

const UpdateCategory = (props: any) => {
  const { fetchCategories, categoryList, fetchCategory, categoryDetail, updateCategory } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const categoryId = Number(params.id);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [formField, setFormField] = useState<any | undefined>();
  const [selectedParent, setSelectedParent] = useState<number[]>([]);

  const breadcrumbItems = [
    { label: "Danh mục", href: "/admin/categories/all/" },
    { label: "Tất cả danh mục", href: "/admin/categories/all/" },
    { label: "Chỉnh sửa danh mục" },
  ];

  const loadList = () => {
    fetchCategories(session?.user.accessToken, {});
    fetchCategory(session?.user.accessToken, categoryId);
  };

  useEffect(() => {
    if (session?.user.accessToken) {
      loadList();
    }
  }, [session?.user.accessToken]);

  useEffect(() => {
    if (categoryDetail) {
      setFormField(categoryDetail);
    }
  }, [categoryDetail]);

  useEffect(() => {
    if (formField && Object.keys(formField).length) {
      form.setFieldsValue({
        name: formField.name,
        description: formField.description,
        parentId: formField.parentId,
      });

      setSelectedParent(formField.parentId ? [formField.parentId] : []);
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
    let parentId = undefined;

    if (Array.isArray(values.parentId)) {
      if (values.parentId.length > 0) {
        parentId = values.parentId[0];
      }
    }

    const payload: any = {
      id: categoryId,
      data: {
        name: values.name,
        description: values.description,
      },
    };

    if (parentId !== undefined) {
      payload.data.parentId = parentId;
    }
    updateCategory(session?.user.accessToken, payload, () => onSuccess("Cập nhật danh mục thành công"), onFailure);
  };

  return (
    <LayoutAdmin>
      {contextHolder}
      <TopHeader items={breadcrumbItems} />
      <ProForm form={form} onFinish={handleFinish} submitter={false}>
        <Row gutter={16}>
          <Col span={18}>
            <Card size="small" title="Thông tin danh mục">
              <ProFormText name="name" placeholder="Nhập tên danh mục" rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]} />
              <ProForm.Item name="description">
                <RichTextEditor height={300} />
              </ProForm.Item>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="Hành động">
              <ProForm.Item name="parentId" label="Danh mục cha">
                <Checkbox.Group
                  value={selectedParent}
                  onChange={(checkedValues) => {
                    const latest = checkedValues.slice(-1);
                    setSelectedParent(latest);
                    form.setFieldValue("parentId", latest[0] ?? null);
                  }}
                >
                  {categoryList.map((cat: any) => {
                    if (cat.id === formField?.id) return null;

                    return (
                      <Checkbox key={cat.id} value={cat.id} style={{ marginLeft: cat.level * 20 }}>
                        {cat.name}
                      </Checkbox>
                    );
                  })}
                </Checkbox.Group>
              </ProForm.Item>
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
  categoryList: state.categories.list,
  categoryDetail: state.categories.detail,
});

const mapDispatchToProps = {
  fetchCategories: fetchCategories,
  fetchCategory: fetchCategory,
  updateCategory: updateCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCategory);
