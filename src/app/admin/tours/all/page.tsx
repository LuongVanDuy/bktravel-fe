"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Space, Tooltip } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { connect } from "react-redux";
import { useSession } from "next-auth/react";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { useRouter } from "next/navigation";
import { deleteTour, fetchTours, hardDeleteTour, restoreTour } from "@/store/actions/tours";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";
import { EditOutlined, DeleteOutlined, RollbackOutlined } from "@ant-design/icons";

export type TableListItem = {
  id: number;
  thumbnail: string;
  title: string;
  priceAdult: number;
  categories: any;
  createdTime: any;
  action: any;
};

const Tours = (props: any) => {
  const { fetchTours, tourList, tourTotal, tourLoading, deleteTour, restoreTour, hardDeleteTour } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const breadcrumbItems = [{ label: "Tour", href: "/admin/users/all/" }, { label: "Danh sách tour" }];

  function handleSearch(keyword: string, status: number, page = 1, itemsPerPage = 5) {
    const queryParams = {
      search: keyword,
      status,
      page,
      itemsPerPage,
    };

    fetchTours(session?.user.accessToken, queryParams);
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (session?.user.accessToken) {
      handleSearch(keyword, statusFilter);
    }
  }, [session?.user.accessToken]);

  useEffect(() => {
    if (tourList.length === 0 && pageNumber > 1) {
      handleSearch(keyword, statusFilter, pageNumber - 1, pageSize);
    }
  }, [tourList]);

  const handleEdit = (record: any) => {
    router.push("/admin/tours/" + record.id);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc muốn xóa tour này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        deleteTour(
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
      content: "Bạn có chắc muốn khôi phục tour này không?",
      okText: "Khôi phục",
      okType: "primary",
      cancelText: "Hủy",
      onOk() {
        restoreTour(
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
      content: "Bạn có chắc chắn muốn xóa vĩnh viễn tour này? Hành động này không thể hoàn tác.",
      okText: "Xóa vĩnh viễn",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        hardDeleteTour(
          session?.user.accessToken,
          id,
          () => handleSearch(keyword, statusFilter, pageNumber, pageSize),
          (error: any) => console.error(error)
        );
      },
    });
  };

  const columns: ProColumns<any>[] = [
    {
      title: "Ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (url: any) => <img src={url} alt="thumbnail" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4 }} />,
      search: false,
    },
    {
      title: "Tên tour",
      dataIndex: "title",
      key: "title",
      render: (text) => <span style={{ fontWeight: "500", color: "#2271b1" }}>{text}</span>,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return <Input placeholder="Nhập tên tour" {...rest} />;
      },
    },
    {
      title: "Giá",
      dataIndex: "priceAdult",
      key: "priceAdult",
      render: (value: any) => `${value?.toLocaleString("vi-VN")}đ`,
      search: false,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      search: false,
      render: (value) => (value === 1 ? "Hoạt động" : "Ẩn"),
    },
    {
      title: "Danh mục",
      dataIndex: "categories",
      key: "categories",
      render: (categories: any) =>
        categories
          ?.map((c: any) => c.category?.name)
          .filter(Boolean)
          .join(", ") || "",
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
        dataSource={tourList}
        loading={tourLoading}
        headerTitle="Danh sách tour"
        toolbar={{
          search: {
            onSearch: (value) => {
              setKeyword(value);
              handleSearch(value, 0);
            },
            placeholder: "Nhập tên tour",
          },
        }}
        rowKey="id"
        search={false}
        options={false}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: tourTotal,
          showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} tour`,
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
              handleSearch(keyword, value);
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
  tourList: state.tours.list,
  tourTotal: state.tours.total,
  tourLoading: state.tours.loading,
});

const mapDispatchToProps = {
  fetchTours: fetchTours,
  deleteTour: deleteTour,
  restoreTour: restoreTour,
  hardDeleteTour: hardDeleteTour,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tours);
