"use client";

import store from "@/store/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import viVN from "antd/lib/locale/vi_VN";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AntdRegistry>
        <ConfigProvider locale={viVN}>
          <Provider store={store}>{children}</Provider>
        </ConfigProvider>
      </AntdRegistry>
    </SessionProvider>
  );
}
