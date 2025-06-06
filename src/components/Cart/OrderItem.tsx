import React, { useState } from "react";
import Image from "next/image";
import { Button, InputNumber, Space } from "antd";
import { getCart, setCart } from "@/helper/cart";

type OrderItemProps = {
  tourId: number;
  title: string;
  image: string;
  startDate: string;
  tourCode: string;
  duration: string;
  departure: string;
  transport: string;
};

const OrderItem: React.FC<OrderItemProps> = ({ tourId, title, image, startDate, tourCode, duration, departure, transport }) => {
  const [qtyAdult, setQtyAdult] = useState(0);
  const [qtyChild, setQtyChild] = useState(0);
  const [qtyBaby, setQtyBaby] = useState(0);

  const updateQtyInLocalStorage = (newQtyAdult: number, newQtyChild: number, newQtyBaby: number) => {
    const cart = getCart();
    const updatedCart = cart.map((item: any) => {
      if (item.tourId === tourId) {
        return {
          ...item,
          qtyAdult: newQtyAdult,
          qtyChild: newQtyChild,
          qtyBaby: newQtyBaby,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const onChangeAdult = (value: number | null) => {
    const newQty = value ?? 0;
    setQtyAdult(newQty);
    updateQtyInLocalStorage(newQty, qtyChild, qtyBaby);
  };

  const onChangeChild = (value: number | null) => {
    const newQty = value ?? 0;
    setQtyChild(newQty);
    updateQtyInLocalStorage(qtyAdult, newQty, qtyBaby);
  };

  const onChangeBaby = (value: number | null) => {
    const newQty = value ?? 0;
    setQtyBaby(newQty);
    updateQtyInLocalStorage(qtyAdult, qtyChild, newQty);
  };

  return (
    <div className="d-flex flex-column flex-md-row gap-3 p-4 bg-white rounded shadow-sm">
      <div className="col-md-3">
        <div className="ratio ratio-16x9 rounded overflow-hidden">
          <Image src={image} alt={title} width={640} height={422} className="img-fluid object-fit-cover" />
        </div>
      </div>
      <div className="flex-fill">
        <h2 className="h5 fw-bold text-primary">{title}</h2>

        <div className="mt-3">
          <div className="mb-2 d-flex align-items-center">
            <i className="me-2 fa-regular fa-calendar-week" />
            <span>
              <strong>Ngày khởi hành:</strong> {startDate}
            </span>
          </div>
          <div className="mb-2 d-flex align-items-center">
            <i className="me-2 fa-regular fa-qrcode" />
            <span>
              <strong>Mã tour:</strong> {tourCode}
            </span>
          </div>
          <div className="mb-2 d-flex align-items-center">
            <i className="me-2 fa-regular fa-timer" />
            <span>
              <strong>Thời gian:</strong> {duration}
            </span>
          </div>
          <div className="mb-2 d-flex align-items-center">
            <i className="me-2 fa-regular fa-location-dot" />
            <span>
              <strong>Nơi khởi hành:</strong> {departure}
            </span>
          </div>
        </div>
      </div>
      <div className="col-md-3 qty-list">
        <Space direction="vertical" style={{ width: "100%" }}>
          <div>
            <label>Adult:</label>
            <InputNumber min={0} value={qtyAdult} onChange={onChangeAdult} />
          </div>
          <div>
            <label>Child:</label>
            <InputNumber min={0} value={qtyChild} onChange={onChangeChild} />
          </div>
          <div>
            <label>Baby:</label>
            <InputNumber min={0} value={qtyBaby} onChange={onChangeBaby} />
          </div>
        </Space>
      </div>
    </div>
  );
};

export default OrderItem;
