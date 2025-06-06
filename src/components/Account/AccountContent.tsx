"use client";

import React, { useEffect, useState } from "react";
import UserProfileForm from "../Admin/User/UserProfileForm";
import { Form, message, Skeleton } from "antd";
import { changePassword, fetchProfile, updateProfile } from "@/store/actions/auth";
import { connect } from "react-redux";
import { useSession } from "next-auth/react";
import ChangePasswordForm from "./ChangePassword";

const AccountContent = (props: any) => {
  const { fetchProfile, userDetail, userLoading, updateProfile, changePassword } = props;
  const [form] = Form.useForm();
  const [formPassword] = Form.useForm();
  const [formField, setFormField] = useState<any | undefined>();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [messageApi, contextHolder] = message.useMessage();

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const loadList = () => {
    fetchProfile(session?.user.accessToken);
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
    formPassword.resetFields();
  };

  const onFailure = (error: any) => {
    messageApi.error({
      content: error,
    });
  };

  const handleUpdate = async (values: any) => {
    const payload = {
      email: values.email,
      avatar: values.avatar,
      fullName: values.fullName,
      phone: values.phone,
      dateOfBirth: values.dateOfBirth ? new Date(values.dateOfBirth).toISOString() : undefined,
      address: values.address,
      about: values.about,
    };
    updateProfile(session?.user.accessToken, payload, () => onSuccess("Chỉnh sửa người dùng thành công"), onFailure);
  };

  const handleChanePassword = async (values: any) => {
    const payload = {
      password: values.password,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmNewPassword,
    };
    changePassword(session?.user.accessToken, payload, () => onSuccess("Đổi mật khẩu thành công"), onFailure);
  };
  return (
    <div className="account-area ptb-50">
      {contextHolder}
      <div className="container">
        <div className="account-content">
          <ul className="nav nav-tabs account-tabs">
            <li className="nav-item">
              <button className={activeTab === 0 ? "active" : ""} onClick={() => handleTabClick(0)}>
                Thông tin người dùng
              </button>
            </li>

            <li className="nav-item">
              <button className={activeTab === 1 ? "active" : ""} onClick={() => handleTabClick(1)}>
                Đổi mật khẩu
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === 0 && (
              <div className="form-client position-relative">
                <Skeleton active={userLoading} avatar />
                <div className="box-title">
                  <h3 className="mb-0">Thông tin người dùng</h3>
                </div>
                <UserProfileForm form={form} onFinish={handleUpdate} />
              </div>
            )}
            {activeTab === 1 && (
              <div className="form-client position-relative">
                <div className="box-title">
                  <h3 className="mb-0">Đổi mật khẩu</h3>
                </div>
                <ChangePasswordForm form={formPassword} onFinish={handleChanePassword} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userDetail: state.auth.detail,
  userLoading: state.auth.loading,
});

const mapDispatchToProps = {
  fetchProfile: fetchProfile,
  updateProfile: updateProfile,
  changePassword: changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContent);
