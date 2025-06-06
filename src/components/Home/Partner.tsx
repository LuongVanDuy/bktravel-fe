"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import partnerLogo1 from "/public/images/partner/partner-1.png";
import partnerLogo2 from "/public/images/partner/partner-2.png";
import partnerLogo3 from "/public/images/partner/partner-3.png";
import partnerLogo4 from "/public/images/partner/partner-4.png";
import partnerLogo5 from "/public/images/partner/partner-5.png";

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

const Partner: React.FC = () => {
  return (
    <>
      <div className="partner-area overflow-hidden bg-color-f3f4f6 pb-115">
        <div className="container-fluid mw-1640">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <ul className="d-flex align-items-center p-0 mb-0 list-unstyled follow-us justify-content-center justify-content-lg-start">
                <li>
                  <span>Theo dõi chúng tôi:</span>
                </li>
                {socialsLinkData &&
                  socialsLinkData.map((value, i) => (
                    <li key={i}>
                      <a href={value.url} target="_blank">
                        <i className={value.iconName}></i>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="col-lg-8">
              <div className="partner-logo">
                <Swiper
                  spaceBetween={30}
                  autoplay={{
                    delay: 5000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: true,
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                    },
                    576: {
                      slidesPerView: 3,
                    },
                    768: {
                      slidesPerView: 4,
                    },
                    1200: {
                      slidesPerView: 5,
                    },
                  }}
                  modules={[Autoplay]}
                  className="partner-slide"
                >
                  <SwiperSlide>
                    <div className="text-center m-lg-auto">
                      <Image src={partnerLogo1} alt="partner" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="text-center m-lg-auto">
                      <Image src={partnerLogo2} alt="partner" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="text-center m-lg-auto">
                      <Image src={partnerLogo3} alt="partner" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="text-center m-lg-auto">
                      <Image src={partnerLogo4} alt="partner" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="text-center m-lg-auto">
                      <Image src={partnerLogo5} alt="partner" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="text-center m-lg-auto">
                      <Image src={partnerLogo3} alt="partner" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner;
