"use client";

import React, { useEffect, useState } from "react";
import { Form, message, Row, Typography, UploadProps } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { connect } from "react-redux";
import { useSession } from "next-auth/react";
import { fetchUser, updateUser } from "@/store/actions/users";
import { useParams, useRouter } from "next/navigation";

import TopHeader from "@/components/Admin/Layout/Breadcrumb";
import UserProfileForm from "@/components/Admin/User/UserProfileForm";

const UpdateUser = (props: any) => {
  const { fetchUser, userDetail, updateUser } = props;
  const { data: session } = useSession();
  const params = useParams();
  const userId = Number(params.id);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [formField, setFormField] = useState<any | undefined>();

  const breadcrumbItems = [
    { label: "Thành viên", href: "/admin/users/all/" },
    { label: "Tất cả người dùng", href: "/admin/users/all/" },
    { label: "Chỉnh sửa người dùng" },
  ];

  const loadList = () => {
    fetchUser(session?.user.accessToken, userId);
  };

  useEffect(() => {
    if (session?.user.accessToken) {
      loadList();
    }
  }, [session?.user.accessToken]);

  useEffect(() => {
    if (userDetail) {
      setFormField(userDetail);
    }
  }, [userDetail]);

  useEffect(() => {
    if (formField && Object.keys(formField).length) {
      form.setFieldsValue({
        username: formField.username,
        email: formField.email,
        fullName: formField.fullName,
        phone: formField.phone,
        dateOfBirth: formField.dateOfBirth,
        address: formField.address,
        about: formField.about,
        avatar: formField.avatar,
      });
    }
  }, [formField]);

  const onSuccess = (messageContent: string) => {
    messageApi.success({
      content: messageContent,
    });
    loadList();
  };

  const onFailure = (error: any) => {
    messageApi.error({
      content: error,
    });
  };

  const handleFinish = async (values: any) => {
    const payload = {
      id: userId,
      data: {
        email: values.email,
        avatar: values.avatar,
        fullName: values.fullName,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth ? new Date(values.dateOfBirth).toISOString() : undefined,
        address: values.address,
        about: values.about,
      },
    };
    updateUser(session?.user.accessToken, payload, () => onSuccess("Chỉnh sửa người dùng thành công"), onFailure);
  };

  return (
    <LayoutAdmin>
      {contextHolder}
      <TopHeader items={breadcrumbItems} />
      <UserProfileForm form={form} onFinish={handleFinish} />;
    </LayoutAdmin>
  );
};

const mapStateToProps = (state: any) => ({
  userDetail: state.users.detail,
  userLoading: state.users.loading,
});

const mapDispatchToProps = {
  fetchUser: fetchUser,
  updateUser: updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
