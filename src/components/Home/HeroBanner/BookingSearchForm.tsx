"use client";

const BookingSearchForm = () => {
  return (
    <>
      <form className="location-track" data-aos="fade-up" data-aos-delay="300" data-aos-duration="500" data-aos-once="true">
        <div className="row align-items-center">
          <div className="col-lg-3 col-sm-6 col-md-3">
            <div className="form-group d-flex align-items-center">
              <div className="flex-shrink-0">
                <i className="flaticon-placeholder"></i>
              </div>
              <div className="flex-grow-1 ms-3">
                <span className="title">Location</span>
                <select className="form-select">
                  <option defaultValue="0">Thailand</option>
                  <option defaultValue="1">Canada</option>
                  <option defaultValue="2">California</option>
                  <option defaultValue="3">United States</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-3">
            <div className="form-group d-flex align-items-center">
              <div className="flex-shrink-0">
                <i className="flaticon-calendar"></i>
              </div>
              <div className="flex-grow-1 ms-3">
                <span className="title">Booking Date</span>
                <input type="date" className="booking-date" />
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-3">
            <div className="form-group d-flex align-items-center">
              <div className="flex-shrink-0">
                <i className="flaticon-plane"></i>
              </div>
              <div className="flex-grow-1 ms-3">
                <span className="title">Travel Type</span>
                <select className="form-select">
                  <option defaultValue="0">Group Tour</option>
                  <option defaultValue="1">Family Tour</option>
                  <option defaultValue="2">Official Tour</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-md-3">
            <div className="form-group">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <i className="flaticon-account"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <span className="title">Guest</span>
                    <select className="form-select">
                      <option defaultValue="0">08</option>
                      <option defaultValue="1">10</option>
                      <option defaultValue="2">15</option>
                      <option defaultValue="3">20</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="src-btn">
                  <i className="flaticon-loupe"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BookingSearchForm;
