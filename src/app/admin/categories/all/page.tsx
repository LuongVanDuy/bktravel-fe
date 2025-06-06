"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Space, Tooltip } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { connect } from "react-redux";
import { useSession } from "next-auth/react";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { useRouter } from "next/navigation";
import { deleteCategory, fetchCategories } from "@/store/actions/categories";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";
import { Modal } from "antd/lib";

export type TableListItem = {
  id: number;
  name: string;
  description: string;
  action: any;
};

const Categories = (props: any) => {
  const { fetchCategories, categoryList, categoryTotal, categoryLoading, deleteCategory } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const breadcrumbItems = [{ label: "Danh mục", href: "/admin/categories/all/" }, { label: "Tất cả danh mục" }];

  function handleSearch(keyword: string, status: number, page = 1, itemsPerPage = 8) {
    const queryParams = {
      search: keyword,
      status,
      page,
      itemsPerPage,
    };

    fetchCategories(session?.user.accessToken, queryParams);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.user.accessToken) {
      handleSearch(keyword, statusFilter);
    }
  }, [session?.user.accessToken]);

  useEffect(() => {
    if (categoryList.length === 0 && pageNumber > 1) {
      handleSearch(keyword, statusFilter, pageNumber - 1, pageSize);
    }
  }, [categoryList]);

  const handleEdit = (record: any) => {
    router.push("/admin/categories/" + record.id);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc muốn xóa danh mục này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        deleteCategory(
          session?.user.accessToken,
          id,
          () => handleSearch(keyword, statusFilter, pageNumber, pageSize),
          (error: any) => console.error(error)
        );
      },
    });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const columns: ProColumns<any>[] = [
    {
      title: "Danh mục",
      dataIndex: "name",
      key: "name",
      formItemProps: {
        style: { marginBottom: 0 },
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
      },
      render: (text, record) => {
        const prefix = Array(record.level).fill("—").join(" ");
        return (
          <span style={{ fontWeight: "500", color: "#2271b1" }}>
            {prefix ? `${prefix} ` : ""}
            {text}
          </span>
        );
      },
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return <Input placeholder="Nhập danh mục" {...rest} />;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      search: false,
      width: "40%",
      render: (text: any) => {
        if (!text) return null;
        const plainText = stripHtml(text);
        const truncated = plainText.length > 200 ? plainText.slice(0, 200) + "..." : plainText;
        return <span>{truncated}</span>;
      },
    },
    {
      title: "",
      key: "action",
      valueType: "option",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button size="small" type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>

          <Tooltip title="Xóa">
            <Button size="small" type="link" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <LayoutAdmin>
      <TopHeader items={breadcrumbItems} />
      <ProTable<TableListItem>
        columns={columns}
        dataSource={categoryList}
        loading={categoryLoading}
        headerTitle="Danh sách danh mục"
        toolbar={{
          search: {
            onSearch: (value) => {
              setKeyword(value);
              handleSearch(value, statusFilter, 1, pageSize);
            },
            placeholder: "Nhập tên danh mục",
          },
        }}
        rowKey="id"
        search={false}
        options={false}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: categoryTotal,
          showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} danh mục`,
          onChange: (page, pageSizeParam) => {
            setPageNumber(page);
            setPageSize(pageSizeParam);
            handleSearch(keyword, statusFilter, page, pageSizeParam);
          },
        }}
        toolBarRender={() => []}
      />
    </LayoutAdmin>
  );
};

const mapStateToProps = (state: any) => ({
  categoryList: state.categories.list,
  categoryTotal: state.categories.total,
  categoryLoading: state.categories.loading,
});

const mapDispatchToProps = {
  fetchCategories: fetchCategories,
  deleteCategory: deleteCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
