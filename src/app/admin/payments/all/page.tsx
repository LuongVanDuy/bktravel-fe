"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, Input, Modal, Space, Tooltip } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { connect } from "react-redux";
import { useSession } from "next-auth/react";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { useRouter } from "next/navigation";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deletePayment, fetchPayments } from "@/store/actions/payments";

export type TableListItem = {
  id: number;
  code: string;
  name: string;
  isActive: any;
  sortOrder: string;
  createdTime: number;
  action: any;
};

const Payments = (props: any) => {
  const { fetchPayments, paymentList, paymentTotal, paymentLoading, deletePayment } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const breadcrumbItems = [{ label: "Thanh toán", href: "/admin/payments/all/" }, { label: "Phương thức thanh toán" }];

  function handleSearch(page = 1, itemsPerPage = 8) {
    const queryParams = {
      page,
      itemsPerPage,
    };

    fetchPayments(session?.user.accessToken, queryParams);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.user.accessToken) {
      handleSearch();
    }
  }, [session?.user.accessToken]);

  useEffect(() => {
    if (paymentList.length === 0 && pageNumber > 1) {
      handleSearch(pageNumber - 1, pageSize);
    }
  }, [paymentList]);

  const handleEdit = (record: any) => {
    router.push("/admin/payments/" + record.id);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc muốn xóa phương thức này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        deletePayment(
          session?.user.accessToken,
          id,
          () => handleSearch(pageNumber, pageSize),
          (error: any) => console.error(error)
        );
      },
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: "Tên phương thức",
      dataIndex: "name",
      key: "name",
      render: (text) => <span style={{ color: "#2271b1", fontWeight: 500 }}>{text}</span>,
      search: false,
    },
    {
      title: "Mã phương thức",
      dataIndex: "code",
      key: "code",
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
      search: false,
    },
    {
      title: "Kích hoạt",
      dataIndex: "isActive",
      key: "isActive",
      valueType: "select",
      valueEnum: {
        true: { text: "Bật", status: "Success" },
        false: { text: "Tắt", status: "Default" },
      },
      render: (_, record) => (record.isActive ? "Bật" : "Tắt"),
      search: false,
    },
    {
      title: "Thứ tự",
      dataIndex: "sortOrder",
      key: "sortOrder",
      search: false,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdTime",
      key: "createdTime",
      valueType: "dateTime",
      search: false,
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
      search: false,
    },
  ];

  return (
    <LayoutAdmin>
      <TopHeader items={breadcrumbItems} />
      <ProTable<TableListItem>
        columns={columns}
        dataSource={paymentList}
        loading={paymentLoading}
        headerTitle="Danh sách người dùng"
        toolbar={{
          search: false,
        }}
        rowKey="id"
        search={false}
        options={false}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: paymentTotal,
          showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} phương thức`,
          onChange: (page, pageSizeParam) => {
            setPageNumber(page);
            setPageSize(pageSizeParam);
            handleSearch(page, pageSizeParam);
          },
        }}
        toolBarRender={() => []}
      />
    </LayoutAdmin>
  );
};

const mapStateToProps = (state: any) => ({
  paymentList: state.payments.list,
  paymentTotal: state.payments.total,
  paymentLoading: state.payments.loading,
});

const mapDispatchToProps = {
  fetchPayments: fetchPayments,
  deletePayment: deletePayment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
