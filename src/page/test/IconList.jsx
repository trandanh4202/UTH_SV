import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import "./FlipBook.css"; // Ensure this CSS file matches your provided CSS

const FlipBook = () => {
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleCoverClick = () => {
    setIsCoverOpen(!isCoverOpen);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage < 2 ? prevPage + 1 : prevPage));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };

  return (
    <div className="flipbook-container">
      <input
        type="checkbox"
        id="checkbox-cover"
        checked={isCoverOpen}
        onChange={handleCoverClick}
      />
      <input
        type="checkbox"
        id="checkbox-page1"
        checked={currentPage >= 1}
        readOnly
      />
      <input
        type="checkbox"
        id="checkbox-page2"
        checked={currentPage >= 2}
        readOnly
      />

      <div className="book">
        <div className="cover">
          <label htmlFor="checkbox-cover"></label>
        </div>

        <div className="page" id="page1">
          <div className="front-page">
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              magni laudantium beatae quia. Recusandae, fuga quas consectetur
              perferendis aperiam esse velit veniam ducimus? Quisquam
              consequatur perferendis quidem quia, recusandae ab!
            </Typography>
            <img src="./images/1.jpg" alt="Page 1" />
          </div>
          <div className="back-page">
            <img src="./images/1.jpg" alt="Page 1" />
            <IconButton className="prev" onClick={prevPage}>
              <ChevronLeft />
            </IconButton>
          </div>
        </div>

        <div className="page" id="page2">
          <div className="front-page">
            <Typography variant="h5">Page 2</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              magni laudantium beatae quia. Recusandae, fuga quas consectetur
              perferendis aperiam esse velit veniam ducimus? Quisquam
              consequatur perferendis quidem quia, recusandae ab!
            </Typography>
          </div>
          <div className="back-page">
            <img src="2.jpg" alt="Page 2" />
            <IconButton className="prev" onClick={prevPage}>
              <ChevronLeft />
            </IconButton>
          </div>
        </div>

        <div className="page" id="page3">
          <div className="front-page">
            <Typography variant="h5">Page 3</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              magni laudantium beatae quia. Recusandae, fuga quas consectetur
              perferendis aperiam esse velit veniam ducimus? Quisquam
              consequatur perferendis quidem quia, recusandae ab!
            </Typography>
          </div>
        </div>

        <div className="back-cover"></div>
      </div>
    </div>
  );
};

export default FlipBook;
