"use client";

import React from "react";
import { Form, message } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { connect } from "react-redux";
import { useSession } from "next-auth/react";
import { createUser } from "@/store/actions/users";
import { useRouter } from "next/navigation";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";
import UserProfileForm from "@/components/Admin/User/UserProfileForm";

const CreateUser = (props: any) => {
  const { createUser } = props;
  const { data: session } = useSession();
  const [form] = Form.useForm();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const breadcrumbItems = [
    { label: "Thành viên", href: "/admin/users/all/" },
    { label: "Tất cả người dùng", href: "/admin/users/all/" },
    { label: "Thêm người dùng mới" },
  ];

  const onSuccess = (messageContent: string) => {
    messageApi.success({
      content: messageContent,
    });
    router.push("/admin/users/all");
  };

  const onFailure = (error: any) => {
    messageApi.error({
      content: error,
    });
  };

  const handleFinish = async (values: any) => {
    const dateOfBirthValue = values.dateOfBirth ? new Date(values.dateOfBirth) : null;

    const payload = {
      ...values,
      avatar: values.avatar,
      dateOfBirth: dateOfBirthValue,
    };

    createUser(session?.user.accessToken, payload, () => onSuccess("Thêm người dùng thành công"), onFailure);
  };

  return (
    <LayoutAdmin>
      {contextHolder}
      <TopHeader items={breadcrumbItems} />
      <UserProfileForm form={form} onFinish={handleFinish} />;
    </LayoutAdmin>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  createUser: createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
