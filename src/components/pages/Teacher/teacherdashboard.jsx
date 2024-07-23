import * as React from "react";
import Eventcalander from "./eventcalander";
import "../style.css"; // Make sure to include your stylesheet

function MyComponent() {
  return (
    <main>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          <div className="ag-courses_item">
            <a href="teacher" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/732f2097ee423512ed737963a30fb02d645170333ae420cd3fad7bf791fb3996?"
                  className="shrink-0 aspect-square w-[57px]"
                  alt="Total students icon"
                />
              </div>
              <div className="ag-courses-item_date-box">
                <span className="ag-courses-item_date">Total Students</span>
              </div>
            </a>
          </div>
          <div className="ag-courses_item">
            <a href="teacher" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/df4172d12601b118d5492fae11bf6705e269e1e2c27893dd0076aece43cd4dba?"
                  className="shrink-0 aspect-square w-[57px]"
                  alt="Student progress icon"
                />
              </div>
              <div className="ag-courses-item_date-box">
                <span className="ag-courses-item_date">Student Progress</span>
              </div>
            </a>
          </div>
          <div className="ag-courses_item">
            <a href="teacher" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/366badb233e84fc1f073b27648c36fcd07183e175310f11200fbf460e3aa8ddd?"
                  className="shrink-0 aspect-square w-[57px]"
                  alt="Total holidays icon"
                />
              </div>
              <div className="ag-courses-item_date-box">
                <span className="ag-courses-item_date">Total Holidays</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex col-md-12">
          <div className="col-md-8">
            <Eventcalander />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MyComponent;
