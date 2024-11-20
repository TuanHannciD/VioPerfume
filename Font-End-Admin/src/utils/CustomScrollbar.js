import React, { useEffect, useRef, useState } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

const CustomScrollbar = ({ children, height = '65vh', suppressX = true }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Khởi tạo PerfectScrollbar khi component được mount
  useEffect(() => {
    const ps = new PerfectScrollbar(containerRef.current, {
      suppressScrollX: suppressX,  // Tắt thanh cuộn ngang
    });

    // Cleanup khi component bị unmount
    return () => {
      ps.destroy();
    };
  }, [suppressX]);

  // Inline styles cho container và thanh cuộn
  const containerStyle = {
    position: 'relative',
    maxHeight: height,
    overflow: 'hidden', // Ẩn phần overflow nếu không có cuộn
    width: '100%', // Đảm bảo chiều rộng là 100%
  };

  const thumbStyle = {
    opacity: isHovered ? 1 : 0, // Ẩn hoặc hiện thanh cuộn
    transition: 'opacity 0.3s ease', // Hiệu ứng chuyển động khi ẩn/hiện
  };

  const railStyle = {
    opacity: isHovered ? 1 : 0, // Ẩn hoặc hiện phần thanh cuộn (rail)
    transition: 'opacity 0.3s ease', // Hiệu ứng chuyển động khi ẩn/hiện
  };

  return (
    <div
      ref={containerRef}
      style={containerStyle} // Áp dụng style cho container
      onMouseEnter={() => setIsHovered(true)}  // Khi chuột vào, thanh cuộn hiện lên
      onMouseLeave={() => setIsHovered(false)} // Khi chuột ra, thanh cuộn ẩn đi
    >
      {/* Thanh cuộn dọc (rail và thumb) */}
      <div className="ps__rail-y" style={railStyle}>
        <div className="ps__thumb-y" style={thumbStyle}></div>
      </div>

      {/* Thanh cuộn ngang (rail và thumb) */}
      <div className="ps__rail-x" style={railStyle}>
        <div className="ps__thumb-x" style={thumbStyle}></div>
      </div>

      {children} {/* Hiển thị nội dung của bảng */}
    </div>
  );
};

export default CustomScrollbar;
