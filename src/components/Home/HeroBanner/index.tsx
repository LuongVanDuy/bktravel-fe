"use client";

import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

import BookingSearchForm from "./BookingSearchForm";

import Link from "next/link";
import Image from "next/image";

import heroImg from "/public/images/banner/banner-img-1.jpg";
import heroImg2 from "/public/images/banner/banner-img-2.jpg";

import shapeImg1 from "/public/images/shape/shape-1.png";
import shapeImg2 from "/public/images/shape/shape-2.png";
import textCircle from "/public/images/text-circle.png";

const HeroBanner = () => {
  const [toggler, setToggler] = useState<boolean>(false);

  return (
    <>
      <FsLightbox toggler={toggler} sources={["https://www.youtube.com/embed/DLgrKBUwsBc?si=lo3B5zo4et1Zbtnl"]} />

      <div className="banner-area banner-bg-1 bg-color-f3f4f6 overflow-hidden">
        <div className="container-fluid mw-1640">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="banner-content">
                <h1 data-aos="fade-up" data-aos-delay="100" data-aos-duration="500" data-aos-once="true">
                  Khám Phá Cuộc Sống — <span className="text-shape">Du Lịch</span>
                </h1>
                <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="500" data-aos-once="true">
                  Có vô vàn hành trình đang chờ bạn khám phá — mỗi chuyến đi là một trải nghiệm tuyệt vời, dù hành trình có thể khác nhau.
                </p>
                <BookingSearchForm />
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="banner-img-wrap text-center text-sm-start"
                data-aos="fade-left"
                data-aos-delay="400"
                data-aos-duration="500"
                data-aos-once="true"
              >
                <div className="row align-items-end align-items-lg-center">
                  <div className="col-sm-6">
                    <div className="banner-img position-relative z-1">
                      <Image src={heroImg} alt="Hero Img" />
                      <Image src={shapeImg1} className="shape shape-1" alt="shape-1" />
                    </div>
                  </div>

                  <div className="col-sm-6 h-100">
                    <div className="banner-img-two position-relative z-1">
                      <div className="video-play position-absolute top-93 start-50 translate-middle" onClick={() => setToggler(!toggler)}>
                        <Image src={textCircle} className="text-circle" alt="text circle" />
                        <div className="play-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none">
                            <path d="M0.698242 4.10488C0.698242 2.5613 2.37267 1.59955 3.70598 2.37732L15.0743 9.00881C16.3973 9.78057 16.3973 11.6922 15.0743 12.4639L3.70599 19.0954C2.37267 19.8732 0.698242 18.9114 0.698242 17.3679V4.10488Z" />
                          </svg>
                        </div>
                      </div>
                      <Image src={heroImg2} alt="hero Img 2" />

                      <Image src={shapeImg2} className="shape shape-2" alt="shape" />

                      <h3 className="packages">
                        <Link href="/subscription">Best Packages</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
