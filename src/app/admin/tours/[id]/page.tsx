"use client";

import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import LayoutAdmin from "@/components/Admin/Layout/LayoutAdmin";
import { connect } from "react-redux";
import { updateTour, fetchTour } from "@/store/actions/tours";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import TopHeader from "@/components/Admin/Layout/Breadcrumb";
import { fetchCategories } from "@/store/actions/categories";
import TourDetailForm from "@/components/Admin/Tour/TourForm";

const UpdateTour = (props: any) => {
  const { updateTour, fetchCategories, categoryList, fetchTour, tourDetail } = props;
  const { data: session } = useSession();
  const params = useParams();
  const tourId = Number(params.id);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [formField, setFormField] = useState<any | undefined>();

  const breadcrumbItems = [
    { label: "Tour", href: "/admin/users/all/" },
    { label: "Danh sách tour", href: "/admin/users/all/" },
    { label: "Chỉnh sửa tour" },
  ];

  const loadList = () => {
    fetchCategories(session?.user.accessToken, {});
    fetchTour(session?.user.accessToken, tourId);
  };

  useEffect(() => {
    if (session?.user.accessToken) {
      loadList();
    }
  }, [session?.user.accessToken]);

  useEffect(() => {
    if (tourDetail) {
      setFormField(tourDetail);
    }
  }, [tourDetail]);

  useEffect(() => {
    if (formField && Object.keys(formField).length) {
      form.setFieldsValue({
        title: formField.title,
        thumbnail: formField.thumbnail,
        description: formField.description,
        priceAdult: formField.priceAdult,
        priceChild: formField.priceChild,
        priceBaby: formField.priceBaby,
        locations: formField.locations,
        priceInclude: formField.priceInclude,
        priceExclude: formField.priceExclude,
        childTicket: formField.childTicket,
        transportInfo: formField.transportInfo,
        images: formField.images ? formField.images.map((img: any) => img.url) : [],
        schedules: formField.schedules,
        categoryIds: formField.categories?.map((cat: any) => cat.categoryId) || [],
      });
    }
  }, [formField]);

  const onSuccess = (messageContent: string) => {
    messageApi.success({
      content: messageContent,
    });
  };

  const onFailure = (error: any) => {
    messageApi.error({
      content: error,
    });
  };

  const handleFinish = async (values: any) => {
    const payload = {
      id: tourId,
      data: {
        ...values,
        images: (values.images || []).map((img: string) => ({
          url: img,
          alt: values.title || null,
        })),
        locations: (values.locations || []).map((loc: any) => ({
          title: loc.title,
          image: loc.image,
        })),
      },
    };
    updateTour(session?.user.accessToken, payload, () => onSuccess("Cập nhật tour thành công"), onFailure);
  };

  return (
    <LayoutAdmin>
      {contextHolder}
      <TopHeader items={breadcrumbItems} />
      <TourDetailForm form={form} onFinish={handleFinish} categoryList={categoryList} />
    </LayoutAdmin>
  );
};

const mapStateToProps = (state: any) => ({
  categoryList: state.categories.list,
  tourDetail: state.tours.detail,
  tourLoading: state.tours.loading,
});

const mapDispatchToProps = {
  fetchCategories: fetchCategories,
  fetchTour: fetchTour,
  updateTour: updateTour,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTour);
