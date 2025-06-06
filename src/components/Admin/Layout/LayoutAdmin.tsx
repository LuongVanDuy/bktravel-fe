import {
  AppstoreOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  SmileOutlined,
  TagsOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-components";
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { Avatar, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import "../../../../public/css/admin.css";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const LayoutAdmin = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: "mix",
  });

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const doLogout = () => {
    signOut();
  };

  if (!hasMounted) return null;

  return (
    <ProLayout
      avatarProps={{
        render: (props, dom) => (
          <Dropdown
            menu={{
              items: [
                {
                  key: "logout",
                  icon: <LogoutOutlined />,
                  label: "Đăng xuất",
                  onClick: doLogout,
                },
              ],
            }}
          >
            <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              {session?.user?.avatar ? (
                <>
                  {dom}
                  <span>{session.user.username}</span>
                </>
              ) : (
                <>
                  <Avatar style={{ backgroundColor: "#87d068" }} size="small" icon={<UserOutlined />}>
                    {session?.user?.username?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <span>{session?.user?.username}</span>
                </>
              )}
            </div>
          </Dropdown>
        ),
      }}
      logo="/images/logo.svg"
      title=""
      fixSiderbar
      fixedHeader
      layout="mix"
      pageTitleRender={false}
      menuDataRender={() => [
        {
          path: "/admin/dashboard",
          icon: <AppstoreOutlined />,
          name: "Trang quản trị",
        },
        {
          path: "/admin/tours/none",
          icon: <TagsOutlined />,
          name: "Tour",
          children: [
            {
              path: "/admin/tours/all",
              name: "Tất cả tour",
              icon: <UnorderedListOutlined />,
            },
            {
              path: "/admin/tours/create",
              name: "Thêm tour mới",
              icon: <PlusCircleOutlined />,
            },
          ],
        },
        {
          path: "/admin/categories/none",
          icon: <AppstoreOutlined />,
          name: "Danh mục tour",
          children: [
            {
              path: "/admin/categories/all",
              name: "Tất cả danh mục",
              icon: <UnorderedListOutlined />,
            },
            {
              path: "/admin/categories/create",
              name: "Thêm danh mục mới",
              icon: <PlusCircleOutlined />,
            },
          ],
        },
        {
          path: "/admin/orders/none",
          icon: <AppstoreOutlined />,
          name: "Quản lý đặt tour",
          children: [
            {
              path: "/admin/orders/all",
              name: "Tất cả tour đã đặt",
              icon: <UnorderedListOutlined />,
            },
            {
              path: "/admin/orders/create",
              name: "Thêm tour đã đặt",
              icon: <PlusCircleOutlined />,
            },
          ],
        },
        {
          path: "/admin/payments/none",
          icon: <AppstoreOutlined />,
          name: "Thanh toán",
          children: [
            {
              path: "/admin/payments/all",
              name: "Phương thức thanh toán",
              icon: <UnorderedListOutlined />,
            },
            {
              path: "/admin/payments/create",
              name: "Thêm phương thức thanh toán mới",
              icon: <PlusCircleOutlined />,
            },
          ],
        },
        {
          path: "/admin/users/none",
          icon: <TeamOutlined />,
          name: "Thành viên",
          children: [
            {
              path: "/admin/users/all",
              name: "Tất cả người dùng",
              icon: <UserOutlined />,
            },
            {
              path: "/admin/users/create",
              name: "Thêm người dùng mới",
              icon: <PlusCircleOutlined />,
            },
          ],
        },
      ]}
      menuItemRender={(item, dom) => (item.path ? <Link href={item.path}>{dom}</Link> : dom)}
    >
      <PageContainer style={{ backgroundColor: "#f0f0f1" }}>{children}</PageContainer>
    </ProLayout>
  );
};

type Props = {
  children: any;
};

export default LayoutAdmin;
