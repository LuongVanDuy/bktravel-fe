"use client";

import Link from "next/link";
import Image from "next/image";

import blackLogo from "/public/images/logo.svg";
import whiteLogo from "/public/images/white-logo.svg";

// socialsLinkData
const socialsLinkData = [
  {
    iconName: "ri-facebook-fill",
    url: "https://www.facebook.com/",
  },
  {
    iconName: "ri-twitter-fill",
    url: "https://www.twitter.com/",
  },
  {
    iconName: "ri-instagram-line",
    url: "https://www.instagram.com/",
  },
  {
    iconName: "ri-linkedin-fill",
    url: "https://www.linkedin.com/",
  },
];

const Footer = () => {
  return (
    <>
      <div className="footer-area pt-175 pb-150">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="footer-single-widget mw-310">
                <Link href="/" className="logo d-inline-block">
                  <Image src={blackLogo} className="d-block dark-none" alt="logo" />
                  <Image src={whiteLogo} className="d-none dark-block" alt="logo" />
                </Link>

                <p>BKC Travel – Đồng hành cùng bạn trên mọi hành trình, mang đến trải nghiệm du lịch an toàn, thú vị và đáng nhớ.</p>

                {socialsLinkData && (
                  <ul className="d-flex align-items-center p-0 mb-0 list-unstyled follow-us">
                    {socialsLinkData &&
                      socialsLinkData.map((value, i) => (
                        <li key={i}>
                          <a href={value.url} target="_blank">
                            <i className={value.iconName}></i>
                          </a>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <div className="footer-single-widget">
                    <h3>Liên Kết Nhanh</h3>

                    <ul className="p-0 m-0 list-unstyled import-link">
                      <li>
                        <Link href="/stay">Đặt Khách Sạn</Link>
                      </li>
                      <li>
                        <Link href="/cars">Thuê Xe</Link>
                      </li>
                      <li>
                        <Link href="/stay">Vé Xe Khách</Link>
                      </li>
                      <li>
                        <Link href="/flight">Đặt Vé Máy Bay</Link>
                      </li>
                      <li>
                        <Link href="/stay">Nhà Hàng</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-4 col-sm-6">
                  <div className="footer-single-widget">
                    <h3>Thông Tin Chính Thức</h3>

                    <ul className="p-0 m-0 list-unstyled import-link">
                      <li>
                        <Link href="/experiences">Trải Nghiệm Pháp</Link>
                      </li>
                      <li>
                        <Link href="/experiences-details">Khám Phá La Mã Cổ Đại</Link>
                      </li>
                      <li>
                        <Link href="/stay-map">Khám Phá Đảo Naxos</Link>
                      </li>
                      <li>
                        <Link href="/experiences-map">Trải Nghiệm Đảo Việt Nam</Link>
                      </li>
                      <li>
                        <Link href="/stay">Thành Phố Du Lịch</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-4 col-sm-6">
                  <div className="footer-single-widget">
                    <h3>Thông Tin Liên Hệ</h3>

                    <ul className="p-0 m-0 list-unstyled info-official">
                      <li className="d-flex">
                        <i className="ri-map-pin-2-fill"></i>
                        <div className="ms-3">
                          <h4>Địa chỉ:</h4>
                          <span>P214, Tòa nhà A17 Bách Khoa, 17 Tạ Quang Bửu, Hai Bà Trưng, Hà Nội</span>
                        </div>
                      </li>
                      <li className="d-flex">
                        <i className="ri-mail-fill"></i>
                        <div className="ms-3">
                          <h4>Email:</h4>
                          <a href="mailto:support@bkc.travel.com">support@bkc.travel.com</a>
                        </div>
                      </li>
                      <li className="d-flex">
                        <i className="ri-phone-fill"></i>
                        <div className="ms-3">
                          <h4>Điện thoại:</h4>
                          <a href="tel:(+84)0386987693">(+84) 0386987693</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copy-right-area">
        <div className="container">
          <p>
            © <span>BKC Travel</span> – Thiết kế và phát triển bởi{" "}
            <a href="https://hibootstrap.com/" target="_blank">
              BKC Team
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
