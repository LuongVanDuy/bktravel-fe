"use client";

import React, { useEffect, useState } from "react";
import { message } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { connect } from "react-redux";
import { createTour } from "@/store/actions/tours";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";
import { fetchCategories } from "@/store/actions/categories";
import TourDetailForm from "@/components/Admin/Tour/TourForm";

const CreateTour = (props: any) => {
  const { createTour, fetchCategories, categoryList } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const breadcrumbItems = [
    { label: "Tour", href: "/admin/users/all/" },
    { label: "Danh sách tour", href: "/admin/users/all/" },
    { label: "Thêm tour mới" },
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
    router.push("/admin/tours/all");
  };

  const onFailure = (error: any) => {
    messageApi.error({
      content: error,
    });
  };

  const handleFinish = async (values: any) => {
    const payload = {
      ...values,
      images: (values.images || []).map((img: string) => ({
        url: img,
        alt: values.title || null,
      })),
    };

    console.log(payload);
    createTour(session?.user.accessToken, payload, () => onSuccess("Thêm tour thành công"), onFailure);
  };

  return (
    <LayoutAdmin>
      {contextHolder}
      <TopHeader items={breadcrumbItems} />
      <TourDetailForm onFinish={handleFinish} categoryList={categoryList} />
    </LayoutAdmin>
  );
};

const mapStateToProps = (state: any) => ({
  categoryList: state.categories.list,
});

const mapDispatchToProps = {
  fetchCategories: fetchCategories,
  createTour: createTour,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTour);
