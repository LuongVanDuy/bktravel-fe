"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Col, Form, message, Row } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import RichTextEditor from "@/components/Admin/Form/RichTextEditor";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createCategory, fetchCategories } from "@/store/actions/categories";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";

const CreateCategory = (props: any) => {
  const { fetchCategories, categoryList, createCategory } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedParent, setSelectedParent] = useState<number[]>([]);

  const breadcrumbItems = [
    { label: "Danh mục", href: "/admin/categories/all/" },
    { label: "Tất cả danh mục", href: "/admin/categories/all/" },
    { label: "Thêm danh mục mới" },
  ];

  const loadList = () => {
    fetchCategories(session?.user.accessToken, {});
  };

  useEffect(() => {
    if (session?.user.accessToken) {
      loadList();
    }
  }, [session?.user.accessToken]);

  const onSuccess = (messageContent: string) => {
    messageApi.success({
      content: messageContent,
    });
    router.push("/admin/categories/all");
  };

  const onFailure = (error: any) => {
    messageApi.error({
      content: error,
    });
  };

  const handleFinish = async (values: any) => {
    if (Array.isArray(values.parentId)) {
      if (values.parentId.length === 0) {
        delete values.parentId;
      } else {
        values.parentId = values.parentId[0];
      }
    }
    createCategory(session?.user.accessToken, values, () => onSuccess("Thêm danh mục thành công"), onFailure);
  };

  return (
    <LayoutAdmin>
      {contextHolder}
      <TopHeader items={breadcrumbItems} />
      <ProForm onFinish={handleFinish} submitter={false}>
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
                  }}
                >
                  {categoryList.map((cat: any) => {
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
});

const mapDispatchToProps = {
  fetchCategories: fetchCategories,
  createCategory: createCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);
