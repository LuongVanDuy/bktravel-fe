"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, Input, Modal, Select, Space, Tooltip } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { connect } from "react-redux";
import { deleteUser, fetchUsers, hardDeleteUser, restoreUser } from "@/store/actions/users";
import { useSession } from "next-auth/react";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { useRouter } from "next/navigation";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";
import { EditOutlined, DeleteOutlined, DownOutlined, UnorderedListOutlined, RollbackOutlined } from "@ant-design/icons";

export type TableListItem = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  avatar?: string;
  isSuperAdmin: number;
  action: any;
};

const Users = (props: any) => {
  const { fetchUsers, userList, userTotal, userLoading, deleteUser, restoreUser, hardDeleteUser } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const breadcrumbItems = [{ label: "Thành viên", href: "/admin/users/all/" }, { label: "Tất cả người dùng" }];

  function handleSearch(keyword: string, status: number, page = 1, itemsPerPage = 8) {
    const queryParams = {
      search: keyword,
      status,
      page,
      itemsPerPage,
    };

    fetchUsers(session?.user.accessToken, queryParams);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.user.accessToken) {
      handleSearch(keyword, statusFilter);
    }
  }, [session?.user.accessToken]);

  useEffect(() => {
    if (userList.length === 0 && pageNumber > 1) {
      handleSearch(keyword, statusFilter, pageNumber - 1, pageSize);
    }
  }, [userList]);

  const handleEdit = (record: any) => {
    router.push("/admin/users/" + record.id);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc muốn xóa user này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        deleteUser(
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
      content: "Bạn có chắc muốn khôi phục người dùng này không?",
      okText: "Khôi phục",
      okType: "primary",
      cancelText: "Hủy",
      onOk() {
        restoreUser(
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
      content: "Bạn có chắc chắn muốn xóa vĩnh viễn người dùng này? Hành động này không thể hoàn tác.",
      okText: "Xóa vĩnh viễn",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        hardDeleteUser(
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
      title: "Tên Người Dùng",
      dataIndex: "username",
      key: "username",
      formItemProps: {
        style: { marginBottom: 0 },
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
      },
      render: (text) => {
        return <span style={{ fontWeight: "500", color: "#2271b1" }}>{text}</span>;
      },
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return <Input placeholder="Nhập tên người dùng" {...rest} />;
      },
    },
    {
      title: "Tên đầy đủ",
      dataIndex: "fullName",
      key: "fullName",
      search: false,
      render: (text: any, record: any) => (
        <Space>
          <Avatar src={record.avatar} alt={text} size="small" style={{ backgroundColor: "#87d068" }}>
            {record.avatar ? null : text?.charAt(0).toUpperCase()}
          </Avatar>
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      search: false,
      render: (text) => {
        return <span style={{ fontWeight: "500", color: "#2271b1" }}>{text}</span>;
      },
    },
    {
      title: "Vai trò",
      dataIndex: "isSuperAdmin",
      key: "isSuperAdmin",
      render: (_, record) => (record.isSuperAdmin === 1 ? "Admin" : "Customer"),
      valueEnum: {
        0: { text: "Customer" },
        1: { text: "Admin" },
      },
      search: false,
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
                {record.id !== session?.user?.id && (
                  <Tooltip title="Xóa">
                    <Button size="small" type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
                  </Tooltip>
                )}
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
        dataSource={userList}
        loading={userLoading}
        headerTitle="Danh sách người dùng"
        toolbar={{
          search: {
            onSearch: (value) => {
              setKeyword(value);
              handleSearch(value, statusFilter, 1, pageSize);
            },
            placeholder: "Nhập tên người dùng",
          },
        }}
        rowKey="id"
        search={false}
        options={false}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: userTotal,
          showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} người dùng`,
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
  userList: state.users.list,
  userTotal: state.users.total,
  userLoading: state.users.loading,
});

const mapDispatchToProps = {
  fetchUsers: fetchUsers,
  deleteUser: deleteUser,
  restoreUser: restoreUser,
  hardDeleteUser: hardDeleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
