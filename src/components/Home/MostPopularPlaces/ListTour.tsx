import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarOutlined, QrcodeOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { Skeleton } from "antd";
import dayjs, { Dayjs } from "dayjs";
import TourItem from "@/components/TourList/TourItem";

interface ListTourProps {
  data: any;
}

const ListTour: React.FC<ListTourProps> = ({ data }) => {
  return (
    <div className="row justify-content-center">
      {data.map((tour: any) => (
        <TourItem key={tour.id} tour={tour} />
      ))}

      <div className="col-xl-12 text-center">
        <Link href="/stay" className="default-btn active mt-35">
          Show Me More
        </Link>
      </div>
    </div>
  );
};

export default ListTour;
