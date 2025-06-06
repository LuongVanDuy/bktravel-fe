"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";

import blackLogo from "/public/images/logo.svg";
import whiteLogo from "/public/images/white-logo.svg";
import { signOut, useSession } from "next-auth/react";
import { Button, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import { UserOutlined } from "@ant-design/icons";

const Navbar: React.FC = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const handleToggleSearchModal = () => {
    setActive(!isActive);
  };

  const currentRoute = usePathname();

  const [menu, setMenu] = useState<boolean>(true);

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        elementId?.classList.add("sticky");
      } else {
        elementId?.classList.remove("sticky");
      }
    });
  }, []);

  const items: MenuProps["items"] = [
    {
      key: "account",
      label: <Link href="/account">Thông tin cá nhân</Link>,
    },
    {
      key: "logout",
      label: (
        <span onClick={() => signOut()} style={{ cursor: "pointer" }}>
          Đăng xuất
        </span>
      ),
    },
  ];

  const classOne: string = menu ? "collapse navbar-collapse mean-menu" : "collapse navbar-collapse show";
  const classTwo: string = menu ? "navbar-toggler navbar-toggler-right collapsed" : "navbar-toggler navbar-toggler-right";

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-color-f3f4f6" id="navbar">
        <div className="container-fluid mw-1640">
          <Link className="navbar-brand" href="/">
            <Image src={blackLogo} className="main-logo" alt="Black logo" />
            <Image src={whiteLogo} className="white-logo d-none" alt="White logo" />
          </Link>

          {/* Toggle navigation */}
          <button
            onClick={toggleNavbar}
            className={classTwo}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </button>

          <div className={classOne} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto ms-70">
              <li className="nav-item">
                <Link className="nav-link dropdown-toggle" href="#" onClick={(e) => e.preventDefault()}>
                  Trang chủ
                </Link>
              </li>
            </ul>
          </div>

          {/* others-options */}
          <div className="others-options d-flex align-items-center gap-3">
            <button className="search-icon border-0 bg-transparent p-0" onClick={() => console.log("Tìm kiếm")}>
              <i className="flaticon-loupe"></i>
            </button>

            {isLoggedIn ? (
              <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <Button type="primary" icon={<UserOutlined />} className="default-btn d-none d-lg-inline-flex">
                  Tài khoản
                </Button>
              </Dropdown>
            ) : (
              <Link href="/authentication">
                <Button type="primary" className="default-btn d-none d-lg-inline-flex">
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Search Form */}
      <div className={`offcanvas offcanvas-top src-form-wrapper ${isActive ? "show" : ""}`}>
        <div className="container">
          <div className="offcanvas-body small">
            <form className="src-form">
              <input type="text" className="form-control" placeholder="Search Here..." />
              <button type="submit" className="src-btn">
                <i className="ri-search-line"></i>
              </button>
            </form>
          </div>
        </div>

        <button type="button" className="btn-close" onClick={handleToggleSearchModal}>
          <i className="ri-close-line"></i>
        </button>
      </div>
    </>
  );
};

export default Navbar;
