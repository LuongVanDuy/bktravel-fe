// components/TourItem.tsx
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarOutlined, QrcodeOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { DatePicker, message } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { addToCart } from "@/helper/cart";

type Tour = {
  id: number;
  title: string;
  thumbnail: string;
  priceAdult: number;
};

type Props = {
  tour: Tour;
};

const TourItem: React.FC<Props> = ({ tour }) => {
  const threeDaysLater = dayjs().add(3, "day").startOf("day");
  const [date, setDate] = useState<Dayjs | null>(threeDaysLater);

  const disabledDate = (current: Dayjs) => current.isBefore(threeDaysLater, "day");

  const handleAddToCart = () => {
    if (!date) return message.warning("Vui lòng chọn ngày khởi hành");
    addToCart({ tourId: tour.id, date: date.format("YYYY-MM-DD"), qtyAdult: 1 });
    message.success("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="col-xl-3 col-md-4 col-6">
      <div className="most-popular-single-item">
        <div className="most-popular-single-img position-relative">
          <Link href={`/tour-details/${tour.id}`}>
            <Image src={tour.thumbnail} alt={tour.title} width={300} height={200} style={{ objectFit: "cover", width: "100%" }} />
          </Link>
        </div>

        <div className="most-popular-single-content p-3">
          <h3 className="h5 mb-2">
            <Link href={`/tour-details/${tour.id}`}>{tour.title}</Link>
          </h3>
          <p className="price">{tour.priceAdult.toLocaleString("vi-VN")}₫</p>

          <div className="tour-info mb-3">
            <div className="tour-info-item d-flex align-items-center gap-2 mb-2">
              <CalendarOutlined className="icon" />
              <DatePicker
                size="small"
                placeholder="Chọn ngày khởi hành"
                suffixIcon={null}
                disabledDate={disabledDate}
                value={date}
                onChange={setDate}
                format="DD-MM-YYYY"
              />
            </div>

            <div className="tour-info-item d-flex align-items-center gap-2 mb-2">
              <QrcodeOutlined className="icon" />
              <p className="label mb-0">
                Mã tour: <span>NB{tour.id}</span>
              </p>
            </div>

            <div className="tour-info-item d-flex align-items-center gap-2">
              <EnvironmentOutlined className="icon" />
              <p className="label mb-0">
                Nơi khởi hành: <span>TP Hồ Chí Minh</span>
              </p>
            </div>
          </div>

          <div className="tour-button d-flex flex-wrap justify-content-between align-items-center gap-3">
            <a className="btn text-white fw-bold" href="https://zalo.me/2717575157339960397">
              Tư vấn ngay
            </a>
            <a className="btn text-white fw-bold is-red" onClick={handleAddToCart}>
              Đặt Tour <i className="fa-regular fa-arrow-right-long"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourItem;
