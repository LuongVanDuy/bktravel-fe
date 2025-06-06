"use client";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPublicTours } from "@/store/actions/public";
import ListTour from "./ListTour";

const MostPopularPlaces: React.FC = (props: any) => {
  const { fetchPublicTours, tourList } = props;
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState(0);
  const [activeTab, setActiveTab] = useState<number>(0);

  function handleSearch(keyword: string, status: number, page = 1, itemsPerPage = 8) {
    const queryParams = {
      search: keyword,
      status,
      page,
      itemsPerPage,
    };

    fetchPublicTours(queryParams);
  }

  useEffect(() => {
    handleSearch(keyword, statusFilter);
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="most-popular-area bg-color-fff7ed ptb-175">
        <div className="container">
          <div className="d-md-flex justify-content-between align-items-center mb-70">
            <div className="section-title mb-0 left-title">
              <span className="top-title">FEATURED PLACES</span>
              <h2>Most Popular Places</h2>
            </div>

            <ul className="nav nav-tabs most-popular-tab mt-3 mt-md-0">
              <li className="nav-item">
                <button className={activeTab === 0 ? "active" : ""} onClick={() => handleTabClick(0)}>
                  ListTour
                </button>
              </li>
            </ul>
          </div>

          <div className="custom-tabs">
            <div className="tab-content">
              {activeTab === 0 && (
                <div>
                  <ListTour data={tourList} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  tourList: state.tours.list,
  tourTotal: state.tours.total,
  tourLoading: state.tours.loading,
});

const mapDispatchToProps = {
  fetchPublicTours: fetchPublicTours,
};

export default connect(mapStateToProps, mapDispatchToProps)(MostPopularPlaces);
