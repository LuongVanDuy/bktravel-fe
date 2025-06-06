"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import mokaup from "/public/images/mokaup/mokup-11.png";

interface PageBannerTitleProps {
  title: string;
  homeText: string;
  homeUrl: string;
  image?: string;
}

const PageBannerTitle: React.FC<PageBannerTitleProps> = ({ title, homeText, homeUrl, image }) => {
  return (
    <div className="page-banner-area overflow-hidden">
      <div className="container-fluid mw-1640">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6">
            <div className="page-banner-content">
              <h2>{title}</h2>

              <ul className="p-0 mb-0 list-unstyled d-flex align-items-center justify-content-center justify-content-md-start">
                <li>
                  <Link href={homeUrl}>{homeText}</Link>
                </li>
                <li>{title}</li>
              </ul>
            </div>
          </div>

          {image && (
            <div className="col-lg-6 col-md-6">
              <div className="page-banner-img position-relative z-1">
                <Image src={image} alt="Page banner" width={1100} height={520} />
                <Image src={mokaup} className="mokup-11 position-absolute top-0 start-0 end-0 w-100 h-100" alt="mokup" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageBannerTitle;
