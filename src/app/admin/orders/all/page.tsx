"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Space, Tag, Tooltip } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { connect } from "react-redux";
import { useSession } from "next-auth/react";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { useRouter } from "next/navigation";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";
import { EditOutlined, DeleteOutlined, EyeOutlined, RollbackOutlined } from "@ant-design/icons";
import { deleteOrder, fetchOrders, hardDeleteOrder, restoreOrder } from "@/store/actions/orders";

export type TableListItem = {
  id: number;
  fullName: string;
  billingEmail: string;
  email: string;
  totalPrice?: string;
  status: number;
  createdTime: any;
  action: any;
};

const statusOptions = [
  { label: "Pending", value: 0, color: "default" },
  { label: "Confirmed", value: 1, color: "blue" },
  { label: "Processing", value: 2, color: "orange" },
  { label: "Completed", value: 3, color: "green" },
  { label: "Cancelled", value: 4, color: "red" },
  { label: "Failed", value: 5, color: "volcano" },
  { label: "Refunded", value: 6, color: "purple" },
];

const Orders = (props: any) => {
  const { fetchOrders, orderList, orderTotal, orderLoading, deleteOrder, restoreOrder, hardDeleteOrder } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const breadcrumbItems = [{ label: "Quản lý đặt tour", href: "/admin/orders/all/" }, { label: "Danh sách đặt tour" }];

  function handleSearch(keyword: string, status: number, page = 1, itemsPerPage = 8) {
    const queryParams = {
      search: keyword,
      status,
      page,
      itemsPerPage,
    };

    fetchOrders(session?.user.accessToken, queryParams);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.user.accessToken) {
      handleSearch(keyword, statusFilter);
    }
  }, [session?.user.accessToken]);

  useEffect(() => {
    if (orderList.length === 0 && pageNumber > 1) {
      handleSearch(keyword, statusFilter, pageNumber - 1, pageSize);
    }
  }, [orderList]);

  const handleEdit = (record: any) => {
    router.push("/admin/orders/" + record.id);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc muốn xóa bản ghi này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        deleteOrder(
          session?.user.accessToken,
          id,
          () => handleSearch(keyword, statusFilter, pageNumber, pageSize),
          (error: any) => console.error(error)
        );
      },
    });
  };

  const handleRestore = (id: number) => {
    Modal.confirm({
      title: "Xác nhận khôi phục",
      content: "Bạn có chắc muốn khôi phục bản ghi này không?",
      okText: "Khôi phục",
      okType: "primary",
      cancelText: "Hủy",
      onOk() {
        restoreOrder(
          session?.user.accessToken,
          id,
          () => handleSearch(keyword, statusFilter, pageNumber, pageSize),
          (error: any) => console.error(error)
        );
      },
    });
  };

  const handlePermanentDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận xóa vĩnh viễn",
      content: "Bạn có chắc chắn muốn xóa vĩnh viễn bản ghi này? Hành động này không thể hoàn tác.",
      okText: "Xóa vĩnh viễn",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        hardDeleteOrder(
          session?.user.accessToken,
          id,
          () => handleSearch(keyword, statusFilter, pageNumber, pageSize),
          (error: any) => console.error(error)
        );
      },
    });
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      formItemProps: {
        style: { marginBottom: 0 },
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
      },
      render: (text) => <span style={{ fontWeight: "500", color: "#2271b1" }}>{text}</span>,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return <Input placeholder="Nhập tên khách hàng" {...rest} />;
      },
    },
    {
      title: "Email",
      dataIndex: "billingEmail",
      key: "billingEmail",
      search: false,
      render: (text) => <span style={{ fontWeight: "500", color: "#2271b1" }}>{text}</span>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      search: false,
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      search: false,
      render: (value: any) => value?.toLocaleString("vi-VN") + " ₫",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      search: false,
      render: (value) => {
        const status = statusOptions.find((s) => s.value === value);
        return status ? <Tag color={status.color}>{status.label}</Tag> : <Tag color="default">Unknown</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdTime",
      key: "createdTime",
      search: false,
      render: (text: any) => new Date(text).toLocaleString("vi-VN"),
    },
    {
      title: "",
      key: "action",
      valueType: "option",
      render: (_, record: any) => {
        const isDeleted = record.deleteFlg !== 0;

        return (
          <Space>
            {isDeleted ? (
              <>
                <Tooltip title="Khôi phục">
                  <Button size="small" type="link" icon={<RollbackOutlined />} onClick={() => handleRestore(record.id)} />
                </Tooltip>
                <Tooltip title="Xóa vĩnh viễn">
                  <Button size="small" type="link" danger icon={<DeleteOutlined />} onClick={() => handlePermanentDelete(record.id)} />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Chỉnh sửa">
                  <Button size="small" type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                </Tooltip>

                <Tooltip title="Xóa">
                  <Button size="small" type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
                </Tooltip>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <LayoutAdmin>
      <TopHeader items={breadcrumbItems} />
      <ProTable<TableListItem>
        columns={columns}
        dataSource={orderList}
        loading={orderLoading}
        headerTitle="Danh sách đặt tour"
        toolbar={{
          search: {
            onSearch: (value) => {
              setKeyword(value);
              handleSearch(value, statusFilter, 1, pageSize);
            },
            placeholder: "Nhập tên khách hàng",
          },
        }}
        rowKey="id"
        search={false}
        options={false}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: orderTotal,
          showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} bản ghi`,
          onChange: (page, pageSizeParam) => {
            setPageNumber(page);
            setPageSize(pageSizeParam);
            handleSearch(keyword, statusFilter, page, pageSizeParam);
          },
        }}
        toolBarRender={() => [
          <Select
            key="statusFilter"
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value);
              handleSearch(keyword, value, 1, pageSize);
              setPageNumber(1);
            }}
            options={[
              { value: 0, label: <span>Tất cả</span> },
              { value: 1, label: <span>Đã xóa</span> },
            ]}
          />,
        ]}
      />
    </LayoutAdmin>
  );
};

const mapStateToProps = (state: any) => ({
  orderList: state.orders.list,
  orderTotal: state.orders.total,
  orderLoading: state.orders.loading,
});

const mapDispatchToProps = {
  fetchOrders: fetchOrders,
  deleteOrder: deleteOrder,
  restoreOrder: restoreOrder,
  hardDeleteOrder: hardDeleteOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
