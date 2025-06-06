"use client";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCart, removeFromCart } from "@/helper/cart";
import Navbar from "@/components/Layout/Navbar";
import OrderItem from "@/components/Cart/OrderItem";
import { fetchPublicTourByIds } from "@/store/actions/public";

type CartItem = {
  tourId: number;
  date: string;
};

interface Tour {
  id: number;
  title: string;
  thumbnail: string;
  duration?: string;
  departure?: string;
  transport?: string;
  // bổ sung các trường cần thiết
}

interface CartPageProps {
  fetchPublicTourByIds: (params: { tourIds: number[] }) => void;
  tourList: Tour[];
}

const CartPage: React.FC<CartPageProps> = ({ fetchPublicTourByIds, tourList }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    const savedCart = getCart();
    setCart(savedCart);

    const tourIds = savedCart.map((item) => item.tourId);
    if (tourIds.length > 0) {
      fetchPublicTourByIds({ tourIds });
    }
  }, [fetchPublicTourByIds]);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Giỏ hàng</h2>
        {cart.length === 0 ? (
          <p>Chưa có tour nào trong giỏ.</p>
        ) : (
          cart.map(({ tourId, date }) => {
            const tour = tourList.find((t) => t.id === tourId);
            if (!tour) return null;

            return (
              <OrderItem
                key={tourId}
                tourId={tourId}
                title={tour.title}
                image={tour.thumbnail}
                startDate={date}
                tourCode={`TT${tour.id}2025`}
                duration={tour.duration ?? "4 ngày 3 đêm"}
                departure={tour.departure ?? "Hà Nội"}
                transport={tour.transport ?? "Máy bay - Vietnam Airlines"}
              />
            );
          })
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  tourList: state.tours.list,
});

const mapDispatchToProps = {
  fetchPublicTourByIds,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
