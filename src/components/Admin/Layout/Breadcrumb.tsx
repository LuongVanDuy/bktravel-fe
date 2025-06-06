// TopHeader.jsx
import React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TopHeaderProps {
  items: BreadcrumbItem[];
}

const TopHeader: React.FC<TopHeaderProps> = ({ items }) => {
  const breadcrumbItems = items.map((item) => ({
    title: item.href ? <Link href={item.href}>{item.label}</Link> : item.label,
  }));

  return <Breadcrumb items={breadcrumbItems} />;
};

export default TopHeader;
