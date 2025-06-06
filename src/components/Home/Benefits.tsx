"use client";

import React from "react";
import Image from "next/image";

const benefitsData = [
  {
    id: "1",
    icon: "/images/icons/icon1.webp",
    title: "Chuyến Đi Độc Quyền",
    shortText: "Trải nghiệm hành trình riêng, mang đến cảm giác mới lạ và đẳng cấp.",
  },
  {
    id: "2",
    icon: "/images/icons/icon2.webp",
    title: "Nhiều Lựa Chọn",
    shortText: "Đa dạng điểm đến và dịch vụ giúp bạn tự do chọn lựa theo sở thích của mình.",
  },
  {
    id: "3",
    icon: "/images/icons/icon3.webp",
    title: "Chuyên Nghiệp",
    shortText: "Đội ngũ am hiểu, thân thiện đồng hành cùng bạn suốt hành trình.",
  },
];

const Benefits: React.FC = () => {
  return (
    <>
      <div className="benefits-area pt-175 pb-150">
        <div className="container">
          <div className="section-title">
            <span className="top-title">LỢI ÍCH</span>
            <h2>BKC Travel - Nền Tảng Đặt Chỗ Trực Tuyến Hàng Đầu Việt Nam</h2>
          </div>
          {benefitsData && (
            <div className="row justify-content-center">
              {benefitsData &&
                benefitsData.map((value, i) => (
                  <div className="col-lg-4 col-sm-6 for-child" key={i}>
                    <div className="benefits-single-item me-lg-auto">
                      <Image src={value.icon} alt="icon" width={110} height={110} />
                      <h5>{value.title}</h5>
                      <p>{value.shortText}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Benefits;
