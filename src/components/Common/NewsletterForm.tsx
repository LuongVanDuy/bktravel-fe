"use client";

import React from "react";
import Image from "next/image";

import shape1 from "/public/images/shape/shape-8.png";
import shape2 from "/public/images/shape/shape-9.png";

const NewsletterForm = () => {
  return (
    <>
      <div className="subscribe-area ptb-175 bg-color-fff7ed position-relative z-1">
        <div className="container">
          <div className="section-title">
            <span className="top-title">NEWSLETTER</span>
            <h2>Subscribe For More Info And Update</h2>
          </div>

          <div className="subscribe-content">
            <form className="row g-3 justify-content-center">
              <div className="col-md-5 col-lg-4">
                <div className="form-group position-relative">
                  <input
                    type="email"
                    className="form-control"
                    id="yourEmail"
                    placeholder="Your email here..."
                  />
                  <div className="position-absolute top-50 start-0 translate-middle-y">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="18"
                      viewBox="0 0 21 18"
                      fill="none"
                    >
                      <path
                        d="M4 6L9.4 10.05C9.75556 10.3167 10.2444 10.3167 10.6 10.05L16 6"
                        stroke="#555555"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <rect
                        x="0.6"
                        y="0.6"
                        width="19.8"
                        height="16.8"
                        rx="4.4"
                        stroke="#555555"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-lg-3 col-xxl-2">
                <div className="h-100 objeit-fit-cover">
                  <button
                    type="submit"
                    className="default-btn border-0 h-100 objeit-fit-cover"
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Shapes */}
        <Image src={shape1} className="shape shape-8" alt="shape-8" />
        <Image src={shape2} className="shape shape-9" alt="shape-9" />
      </div>
    </>
  );
};

export default NewsletterForm;
