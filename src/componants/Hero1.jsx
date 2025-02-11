// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "swiper/css/zoom";
// import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";

// import img1 from "../assets/img1.webp";
// import img2 from "../assets/img2.webp";
// import img3 from "../assets/img5.jpg";
// import img4 from "../assets/img4.jpg";
// import img5 from "../assets/img5.jpg";

// function ImageZoom({ imgSrc, altText }) {
//   const [zoom, setZoom] = useState({ x: 50, y: 50, scale: 1 });
//   const [bgSize, setBgSize] = useState("100%");
//   const [touchStart, setTouchStart] = useState(null);
//   const [initialDistance, setInitialDistance] = useState(0);
//   const [initialTouchPos, setInitialTouchPos] = useState({ x: 0, y: 0 });

//   // Handle mouse move for desktop zoom
//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoom((prev) => ({ ...prev, x, y }));
//     setBgSize("200%"); // Zoomed in on hover
//   };

//   const handleMouseLeave = () => {
//     setZoom({ x: 50, y: 50, scale: 1 });
//     setBgSize("100%"); // Reset zoom on mouse leave
//   };

//   // Handle pinch-to-zoom on mobile
//   const handleTouchStart = (e) => {
//     if (e.touches.length === 1) {
//       const { clientX, clientY } = e.touches[0];
//       setInitialTouchPos({ x: clientX, y: clientY });
//     }
//     if (e.touches.length === 2) {
//       const distance = getDistance(e.touches[0], e.touches[1]);
//       setTouchStart(distance);
//       setInitialDistance(distance);
//     }
//   };

//   const handleTouchMove = (e) => {
//     if (e.touches.length === 1) {
//       const { clientX, clientY } = e.touches[0];
//       const dx = clientX - initialTouchPos.x;
//       const dy = clientY - initialTouchPos.y;
//       const newX = Math.min(Math.max(zoom.x + (dx / window.innerWidth) * 100, 0), 100);
//       const newY = Math.min(Math.max(zoom.y + (dy / window.innerHeight) * 100, 0), 100);
//       setZoom((prev) => ({
//         ...prev,
//         x: newX,
//         y: newY,
//       }));
//       setInitialTouchPos({ x: clientX, y: clientY });
//     }
//     if (e.touches.length === 2 && touchStart) {
//       const distance = getDistance(e.touches[0], e.touches[1]);
//       const scale = (distance / initialDistance).toFixed(2);
//       setZoom((prev) => ({
//         ...prev,
//         scale: Math.max(1, Math.min(scale, 2)), // limit scale between 1x and 2x
//       }));
//     }
//   };

//   const handleTouchEnd = () => {
//     setTouchStart(null);
//     setInitialDistance(0);
//   };

//   // Calculate the distance between two touch points
//   const getDistance = (touch1, touch2) => {
//     const xDiff = touch2.clientX - touch1.clientX;
//     const yDiff = touch2.clientY - touch1.clientY;
//     return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
//   };

//   return (
//     <div
//       className="relative overflow-hidden"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       style={{
//         backgroundImage: `url(${imgSrc})`,
//         backgroundPosition: `${zoom.x}% ${zoom.y}%`,
//         backgroundSize: `${bgSize} ${bgSize}`,
//         transform: `scale(${zoom.scale})`,
//         cursor: "zoom-in",
//         height: "100%",
//         touchAction: "none", // Prevent the default touch action (scrolling, etc.)
//       }}
//     >
//       <img
//         src={imgSrc}
//         alt={altText}
//         className="w-full h-full object-contain opacity-0"
//       />
//     </div>
//   );
// }

// function Hero1() {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [swiperDirection, setSwiperDirection] = useState("vertical");
//   const [selectedImgIndex, setSelectedImgIndex] = useState(null);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 767) {
//         setSwiperDirection("horizontal");
//       } else {
//         setSwiperDirection("vertical");
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleImageClick = (index) => {
//     setSelectedImgIndex(index);
//   };

//   return (
//     <div className="w-[80vw] flex mx-auto mt-3">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
//           <div className="col-span-1 sm:col-span-2 md:col-span-1 order-last sm:order-second md:order-first">
//             <Swiper
//               onSwiper={setThumbsSwiper}
//               direction={swiperDirection}
//               spaceBetween={0}
//               slidesPerView={5}
//               freeMode={true}
//               watchSlidesProgress={false}
//               modules={[Navigation, Thumbs]}
//               className="mySwiper"
//             >
//               {[img1, img2, img3, img4, img5].map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="hover:scale-105 duration-500 mt-1 flex justify-center mr-1 ml-1">
//                     <img
//                       src={img}
//                       className={`w-20 sm:w-22 md:w-14 lg:w-16 sm:h-20 md:h-12 lg:h-14 object-cover cursor-pointer border-2 border-[#D8BFD8] rounded-md mb-[10%] ${
//                         selectedImgIndex === index ? "border-[#4B0082]" : ""
//                       } hover:border-[#4B0082]`}
//                       alt={`thumb${index + 1}`}
//                       onClick={() => handleImageClick(index)}
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Main image with dynamic zoom */}
//           <div className="col-span-1 sm:col-span-10 md:col-span-5 order-first sm:order-first md:order-second ">
//             <Swiper
//               style={{
//                 border: "2px solid #D8BFD8",
//                 borderRadius: "4%",
//               }}
//               spaceBetween={10}
//               navigation={false}
//               thumbs={{ swiper: thumbsSwiper }}
//               modules={[FreeMode, Navigation, Thumbs, Zoom]}
//               className="mySwiper2"
//             >
//               {[img1, img2, img3, img4, img5].map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <ImageZoom imgSrc={img} altText={`img-${index + 1}`} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Product info */}
//           <div className="col-span-1 sm:col-span-10 md:col-span-6 w-full order-last md:order-third p-2 md:p-0">
//             <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-[poppins]">
//               Mini Waffle Maker
//             </h2>
//             <p className="text-lg md:text-xl lg:text-2xl font-md font-[poppins]">
//               ₹ 1200.00
//             </p>
//             <div className="mt-2 md:mt-3">
//               <div className="items-center font-md font-[poppins] text-md md:text-base lg:text-xl border-2 border-[#D8BFD8] rounded-bl-xl rounded-br-xl p-2 md:p-3 w-full ">
//                 <li>Out Of India</li>
//                 <li>Wholesale</li>
//               </div>
//             </div>
//             <p className="mt-4 text-sm md:text-base lg:text-xl font-[poppins]">
//               Amazon Basics 800W Electric Sandwich Maker & Toaster | Non-Stick
//               Die Cast Aluminium Plates | Auto Temp Control | Grills Sandwiches,
//               Bread & Kebabs
//             </p>
//             <button className="bg-[#4B0082] w-[50%] text-white font-medium mt-4 p-2 border-0 rounded-tl-lg rounded-br-xl font-poppins hover:scale-105 duration-500">
//               Inquire Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero1;





// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "swiper/css/zoom";
// import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";

// import img1 from "../assets/img1.webp";
// import img2 from "../assets/img2.webp";
// import img3 from "../assets/img5.jpg";
// import img4 from "../assets/img4.jpg";
// import img5 from "../assets/img5.jpg";

// function ImageZoom({ imgSrc, altText }) {
//   const [zoom, setZoom] = useState({ x: 50, y: 50, scale: 1 });
//   const [bgSize, setBgSize] = useState("100%");
//   const [touchStart, setTouchStart] = useState(null);
//   const [initialDistance, setInitialDistance] = useState(0);
//   const [initialTouchPos, setInitialTouchPos] = useState({ x: 0, y: 0 });
//   const [zoomed, setZoomed] = useState(false); // New state for zoom status
//   const [lastTouchTime, setLastTouchTime] = useState(0); // For detecting double-tap

//   // Handle mouse move for desktop zoom
//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoom((prev) => ({ ...prev, x, y }));
//     setBgSize("200%"); // Zoomed in on hover
//   };

//   const handleMouseLeave = () => {
//     setZoom({ x: 50, y: 50, scale: 1 });
//     setBgSize("100%"); // Reset zoom on mouse leave
//   };

//   // Handle pinch-to-zoom on mobile
//   const handleTouchStart = (e) => {
//     const currentTime = new Date().getTime();

//     // Double-tap detection
//     if (currentTime - lastTouchTime < 300) {
//       setZoomed(!zoomed); // Toggle zoom status
//       setZoom({ x: 50, y: 50, scale: zoomed ? 1 : 2 }); // Zoom in or reset
//     }
//     setLastTouchTime(currentTime);

//     if (e.touches.length === 1) {
//       const { clientX, clientY } = e.touches[0];
//       setInitialTouchPos({ x: clientX, y: clientY });
//     }
//     if (e.touches.length === 2) {
//       const distance = getDistance(e.touches[0], e.touches[1]);
//       setTouchStart(distance);
//       setInitialDistance(distance);
//     }
//   };

//   const handleTouchMove = (e) => {
//     if (e.touches.length === 1 && zoomed) {
//       const { clientX, clientY } = e.touches[0];
//       const dx = clientX - initialTouchPos.x;
//       const dy = clientY - initialTouchPos.y;
//       const newX = Math.min(Math.max(zoom.x + (dx / window.innerWidth) * 100, 0), 100);
//       const newY = Math.min(Math.max(zoom.y + (dy / window.innerHeight) * 100, 0), 100);
//       setZoom((prev) => ({
//         ...prev,
//         x: newX,
//         y: newY,
//       }));
//       setInitialTouchPos({ x: clientX, y: clientY });
//     }
//     if (e.touches.length === 2 && touchStart) {
//       const distance = getDistance(e.touches[0], e.touches[1]);
//       const scale = (distance / initialDistance).toFixed(2);
//       setZoom((prev) => ({
//         ...prev,
//         scale: Math.max(1, Math.min(scale, 2)), // limit scale between 1x and 2x
//       }));
//     }
//   };

//   const handleTouchEnd = () => {
//     setTouchStart(null);
//     setInitialDistance(0);
//   };

//   // Calculate the distance between two touch points
//   const getDistance = (touch1, touch2) => {
//     const xDiff = touch2.clientX - touch1.clientX;
//     const yDiff = touch2.clientY - touch1.clientY;
//     return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
//   };

//   return (
//     <div
//       className="relative overflow-hidden"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       style={{
//         backgroundImage: `url(${imgSrc})`,
//         backgroundPosition: `${zoom.x}% ${zoom.y}%`,
//         backgroundSize: `${bgSize} ${bgSize}`,
//         transform: `scale(${zoom.scale})`,
//         cursor: zoomed ? "grab" : "zoom-in",
//         height: "100%",
//         touchAction: "none", // Prevent the default touch action (scrolling, etc.)
//       }}
//     >
//       <img
//         src={imgSrc}
//         alt={altText}
//         className="w-full h-full object-contain opacity-0"
//       />
//     </div>
//   );
// }

// function Hero1() {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [swiperDirection, setSwiperDirection] = useState("vertical");
//   const [selectedImgIndex, setSelectedImgIndex] = useState(null);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 767) {
//         setSwiperDirection("horizontal");
//       } else {
//         setSwiperDirection("vertical");
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleImageClick = (index) => {
//     setSelectedImgIndex(index);
//   };

//   return (
//     <div className="w-[80vw] flex mx-auto mt-3">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
//           <div className="col-span-1 sm:col-span-2 md:col-span-1 order-last sm:order-second md:order-first">
//             <Swiper
//               onSwiper={setThumbsSwiper}
//               direction={swiperDirection}
//               spaceBetween={0}
//               slidesPerView={5}
//               freeMode={true}
//               watchSlidesProgress={false}
//               modules={[Navigation, Thumbs]}
//               className="mySwiper"
//             >
//               {[img1, img2, img3, img4, img5].map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="hover:scale-105 duration-500 mt-1 flex justify-center mr-1 ml-1">
//                     <img
//                       src={img}
//                       className={`w-20 sm:w-22 md:w-14 lg:w-16 sm:h-20 md:h-12 lg:h-14 object-cover cursor-pointer border-2 border-[#D8BFD8] rounded-md mb-[10%] ${
//                         selectedImgIndex === index ? "border-[#4B0082]" : ""
//                       } hover:border-[#4B0082]`}
//                       alt={`thumb${index + 1}`}
//                       onClick={() => handleImageClick(index)}
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Main image with dynamic zoom */}
//           <div className="col-span-1 sm:col-span-10 md:col-span-5 order-first sm:order-first md:order-second ">
//             <Swiper
//               style={{
//                 border: "2px solid #D8BFD8",
//                 borderRadius: "4%",
//               }}
//               spaceBetween={10}
//               navigation={false}
//               thumbs={{ swiper: thumbsSwiper }}
//               modules={[FreeMode, Navigation, Thumbs, Zoom]}
//               className="mySwiper2"
//             >
//               {[img1, img2, img3, img4, img5].map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <ImageZoom imgSrc={img} altText={`img-${index + 1}`} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Product info */}
//           <div className="col-span-1 sm:col-span-10 md:col-span-6 w-full order-last md:order-third p-2 md:p-0">
//             <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-[poppins]">
//               Mini Waffle Maker
//             </h2>
//             <p className="text-lg md:text-xl lg:text-2xl font-md font-[poppins]">
//               ₹ 1200.00
//             </p>
//             <div className="mt-2 md:mt-3">
//               <div className="items-center font-md font-[poppins] text-md md:text-base lg:text-xl border-2 border-[#D8BFD8] rounded-bl-xl rounded-br-xl p-2 md:p-3 w-full ">
//                 <li>Out Of India</li>
//                 <li>Wholesale</li>
//               </div>
//             </div>
//             <p className="mt-4 text-sm md:text-base lg:text-xl font-[poppins]">
//               Amazon Basics 800W Electric Sandwich Maker & Toaster | Non-Stick
//               Die Cast Aluminium Plates | Auto Temp Control | Grills Sandwiches,
//               Bread & Kebabs
//             </p>
//             <button className="bg-[#4B0082] w-[50%] text-white font-medium mt-4 p-2 border-0 rounded-tl-lg rounded-br-xl font-poppins hover:scale-105 duration-500">
//               Inquire Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero1;


import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";

import img1 from "../assets/img1.webp";
import img2 from "../assets/img2.webp";
import img3 from "../assets/img5.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";

function ImageZoom({ imgSrc, altText }) {
  const [zoom, setZoom] = useState({ x: 50, y: 50, scale: 1 });
  const [bgSize, setBgSize] = useState("100%");
  const [touchStart, setTouchStart] = useState(null);
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialTouchPos, setInitialTouchPos] = useState({ x: 0, y: 0 });
  const [zoomed, setZoomed] = useState(false); // New state for zoom status
  const [lastTouchTime, setLastTouchTime] = useState(0); // For detecting double-tap

  const [isMobile, setIsMobile] = useState(false); // Track whether it's a mobile screen

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Set as per your breakpoints
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle mouse move for desktop zoom
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom((prev) => ({ ...prev, x, y }));
    setBgSize("200%"); // Zoomed in on hover
  };

  const handleMouseLeave = () => {
    setZoom({ x: 50, y: 50, scale: 1 });
    setBgSize("100%"); // Reset zoom on mouse leave
  };

  // Handle pinch-to-zoom on mobile
  const handleTouchStart = (e) => {
    const currentTime = new Date().getTime();

    // Double-tap detection
    if (currentTime - lastTouchTime < 300) {
      setZoomed(!zoomed); // Toggle zoom status
      setZoom({ x: 50, y: 50, scale: zoomed ? 1 : 2 }); // Zoom in or reset
    }
    setLastTouchTime(currentTime);

    if (e.touches.length === 1) {
      const { clientX, clientY } = e.touches[0];
      setInitialTouchPos({ x: clientX, y: clientY });
    }
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      setTouchStart(distance);
      setInitialDistance(distance);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && zoomed) {
      const { clientX, clientY } = e.touches[0];
      const dx = clientX - initialTouchPos.x;
      const dy = clientY - initialTouchPos.y;
      const newX = Math.min(Math.max(zoom.x + (dx / window.innerWidth) * 100, 0), 100);
      const newY = Math.min(Math.max(zoom.y + (dy / window.innerHeight) * 100, 0), 100);
      setZoom((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }));
      setInitialTouchPos({ x: clientX, y: clientY });
    }
    if (e.touches.length === 2 && touchStart) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      const scale = (distance / initialDistance).toFixed(2);
      setZoom((prev) => ({
        ...prev,
        scale: Math.max(1, Math.min(scale, 2)), // Limit scale between 1x and 2x
      }));
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setInitialDistance(0);
  };

  // Calculate the distance between two touch points
  const getDistance = (touch1, touch2) => {
    const xDiff = touch2.clientX - touch1.clientX;
    const yDiff = touch2.clientY - touch1.clientY;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  };

  return (
    <div
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundPosition: `${zoom.x}% ${zoom.y}%`,
        backgroundSize: `${bgSize} ${bgSize}`,
        transform: `scale(${zoom.scale})`,
        cursor: zoomed ? "grab" : "zoom-in",
        height: "100%",
        touchAction: "none", // Prevent the default touch action (scrolling, etc.)
      }}
    >
      <img
        src={imgSrc}
        alt={altText}
        className="w-full h-full object-contain opacity-0"
      />
    </div>
  );
}

function Hero1() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [swiperDirection, setSwiperDirection] = useState("vertical");
  const [selectedImgIndex, setSelectedImgIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setSwiperDirection("horizontal");
      } else {
        setSwiperDirection("vertical");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageClick = (index) => {
    setSelectedImgIndex(index);
  };

  return (
    <div className="w-[80vw] flex mx-auto mt-3">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="col-span-1 sm:col-span-2 md:col-span-1 order-last sm:order-second md:order-first">
            <Swiper
              onSwiper={setThumbsSwiper}
              direction={swiperDirection}
              spaceBetween={0}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={false}
              modules={[Navigation, Thumbs]}
              className="mySwiper"
            >
              {[img1, img2, img3, img4, img5].map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="hover:scale-105 duration-500 mt-1 flex justify-center mr-1 ml-1">
                    <img
                      src={img}
                      className={`w-20 sm:w-22 md:w-14 lg:w-16 sm:h-20 md:h-12 lg:h-14 object-cover cursor-pointer border-2 border-[#D8BFD8] rounded-md mb-[10%] ${
                        selectedImgIndex === index ? "border-[#4B0082]" : ""
                      } hover:border-[#4B0082]`}
                      alt={`thumb${index + 1}`}
                      onClick={() => handleImageClick(index)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Main image with dynamic zoom */}
          <div className="col-span-1 sm:col-span-10 md:col-span-5 order-first sm:order-first md:order-second">
            <Swiper
              style={{
                border: "2px solid #D8BFD8",
                borderRadius: "4%",
              }}
              spaceBetween={10}
              navigation={false}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs, Zoom]}
              className="mySwiper2"
            >
              {[img1, img2, img3, img4, img5].map((img, index) => (
                <SwiperSlide key={index}>
                  <ImageZoom imgSrc={img} altText={`img-${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product info */}
          <div className="col-span-1 sm:col-span-10 md:col-span-6 w-full order-last md:order-third p-2 md:p-0">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-[poppins]">
              Mini Waffle Maker
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl font-md font-[poppins]">
              ₹ 1200.00
            </p>
            <div className="mt-2 md:mt-3">
              <div className="items-center font-md font-[poppins] text-md md:text-base lg:text-xl border-2 border-[#D8BFD8] rounded-bl-xl rounded-br-xl p-2 md:p-3 w-full ">
                <li>Out Of India</li>
                <li>Wholesale</li>
              </div>
            </div>
            <p className="mt-4 text-sm md:text-base lg:text-xl font-[poppins]">
              Amazon Basics 800W Electric Sandwich Maker & Toaster | Non-Stick
              Die Cast Aluminium Plates | Auto Temp Control | Grills Sandwiches,
              Bread & Kebabs
            </p>
            <button className="bg-[#4B0082] w-[50%] text-white font-medium mt-4 p-2 border-0 rounded-tl-lg rounded-br-xl font-poppins hover:scale-105 duration-500">
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero1;



// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "swiper/css/zoom";
// import "swiper/css/scrollbar"; // Import Scrollbar styles
// import { FreeMode, Navigation, Thumbs, Zoom, Scrollbar } from "swiper/modules";

// import img1 from "../assets/img1.webp";
// import img2 from "../assets/img2.webp";
// import img3 from "../assets/img5.jpg";
// import img4 from "../assets/img4.jpg";
// import img5 from "../assets/img5.jpg";
// import img6 from "../assets/img4.jpg";

// function ImageZoom({ imgSrc, altText }) {
//   const [zoom, setZoom] = useState({ x: 50, y: 50, scale: 1 });
//   const [bgSize, setBgSize] = useState("100%");
//   const [touchStart, setTouchStart] = useState(null);
//   const [initialDistance, setInitialDistance] = useState(0);
//   const [initialTouchPos, setInitialTouchPos] = useState({ x: 0, y: 0 });

//   // Handle mouse move for desktop zoom
//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoom((prev) => ({ ...prev, x, y }));
//     setBgSize("200%"); // Zoomed in on hover
//   };

//   const handleMouseLeave = () => {
//     setZoom({ x: 50, y: 50, scale: 1 });
//     setBgSize("100%"); // Reset zoom on mouse leave
//   };

//   // Handle pinch-to-zoom on mobile
//   const handleTouchStart = (e) => {
//     if (e.touches.length === 1) {
//       const { clientX, clientY } = e.touches[0];
//       setInitialTouchPos({ x: clientX, y: clientY });
//     }
//     if (e.touches.length === 2) {
//       const distance = getDistance(e.touches[0], e.touches[1]);
//       setTouchStart(distance);
//       setInitialDistance(distance);
//     }
//   };

//   const handleTouchMove = (e) => {
//     if (e.touches.length === 1) {
//       const { clientX, clientY } = e.touches[0];
//       const dx = clientX - initialTouchPos.x;
//       const dy = clientY - initialTouchPos.y;
//       const newX = Math.min(Math.max(zoom.x + (dx / window.innerWidth) * 100, 0), 100);
//       const newY = Math.min(Math.max(zoom.y + (dy / window.innerHeight) * 100, 0), 100);
//       setZoom((prev) => ({
//         ...prev,
//         x: newX,
//         y: newY,
//       }));
//       setInitialTouchPos({ x: clientX, y: clientY });
//     }
//     if (e.touches.length === 2 && touchStart) {
//       const distance = getDistance(e.touches[0], e.touches[1]);
//       const scale = (distance / initialDistance).toFixed(2);
//       setZoom((prev) => ({
//         ...prev,
//         scale: Math.max(1, Math.min(scale, 2)), // limit scale between 1x and 2x
//       }));
//     }
//   };

//   const handleTouchEnd = () => {
//     setTouchStart(null);
//     setInitialDistance(0);
//   };

//   // Calculate the distance between two touch points
//   const getDistance = (touch1, touch2) => {
//     const xDiff = touch2.clientX - touch1.clientX;
//     const yDiff = touch2.clientY - touch1.clientY;
//     return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
//   };

//   return (
//     <div
//       className="relative overflow-hidden"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       style={{
//         backgroundImage: `url(${imgSrc})`,
//         backgroundPosition: `${zoom.x}% ${zoom.y}%`,
//         backgroundSize: `${bgSize} ${bgSize}`,
//         transform: `scale(${zoom.scale})`,
//         cursor: "zoom-in",
//         height: "100%",
//         touchAction: "none", // Prevent the default touch action (scrolling, etc.)
//       }}
//     >
//       <img
//         src={imgSrc}
//         alt={altText}
//         className="w-full h-full object-contain opacity-0"
//       />
//     </div>
//   );
// }

// function Hero1() {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [swiperDirection, setSwiperDirection] = useState("vertical");
//   const [selectedImgIndex, setSelectedImgIndex] = useState(null);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 767) {
//         setSwiperDirection("horizontal");
//       } else {
//         setSwiperDirection("vertical");
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleImageClick = (index) => {
//     setSelectedImgIndex(index);
//   };
// 3
//   return (
//     <div className="w-[80vw] flex mx-auto mt-3">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
//           <div
//             className="col-span-1 sm:col-span-2 md:col-span-1 order-last sm:order-second md:order-first "
//             style={{
//               minHeight: swiperDirection === "vertical" ? "400px" : "auto", // Ensure the height when vertical
//             }}
//           >
//             <Swiper
//               onSwiper={setThumbsSwiper}
//               direction={swiperDirection}
//               spaceBetween={0} // Adjust the space between the thumbnails
//               slidesPerView={5} // Shows 5 images at once
//               freeMode={true} // Enable free scroll
//               watchSlidesProgress={true} // Ensures smooth scrolling
//               modules={[Navigation, Thumbs, Scrollbar]} // Add Scrollbar module for smooth scrolling
//               scrollbar={{ draggable: true }} // Enable draggable scrollbar
//               className="mySwiper"
//             >
//               {[img1, img2, img3, img4, img5, img6].map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="hover:scale-105 duration-500 mt-1 flex justify-center mr-1 ml-1 mb-1">
//                     <img
//                       src={img}
//                       className={`w-20 sm:w-22 md:w-14 lg:w-16 sm:h-20 md:h-12 lg:h-14 object-cover cursor-pointer border-2 border-[#D8BFD8] rounded-md mb-[10%] ${
//                         selectedImgIndex === index ? "border-[#4B0082]" : ""
//                       } hover:border-[#4B0082]`}
//                       alt={`thumb${index + 1}`}
//                       onClick={() => handleImageClick(index)}
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Main image with dynamic zoom */}
//           <div
//             className="col-span-1 sm:col-span-10 md:col-span-5 order-first sm:order-first md:order-second"
//             style={{
//               minHeight: swiperDirection === "vertical" ? "400px" : "auto", // Ensure height for main image
//             }}
//           >
//             <Swiper
//               style={{
//                 border: "2px solid #D8BFD8",
//                 borderRadius: "4%",
//               }}
//               spaceBetween={10}
//               navigation={false}
//               thumbs={{ swiper: thumbsSwiper }}
//               modules={[FreeMode, Navigation, Thumbs, Zoom]}
//               className="mySwiper2"
//             >
//               {[img1, img2, img3, img4, img5].map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <ImageZoom imgSrc={img} altText={`img-${index + 1}`} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Product info */}
//           <div className="col-span-1 sm:col-span-10 md:col-span-6 w-full order-last md:order-third p-2 md:p-0">
//             <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-[poppins]">
//               Mini Waffle Maker
//             </h2>
//             <p className="text-lg md:text-xl lg:text-2xl font-md font-[poppins]">
//               ₹ 1200.00
//             </p>
//             <div className="mt-2 md:mt-3">
//               <div className="items-center font-md font-[poppins] text-md md:text-base lg:text-xl border-2 border-[#D8BFD8] rounded-bl-xl rounded-br-xl p-2 md:p-3 w-full">
//                 <li>Out Of India</li>
//                 <li>Wholesale</li>
//               </div>
//             </div>
//             <p className="mt-4 text-sm md:text-base lg:text-xl font-[poppins]">
//               Amazon Basics 800W Electric Sandwich Maker & Toaster | Non-Stick
//               Die Cast Aluminium Plates | Auto Temp Control | Grills Sandwiches,
//               Bread & Kebabs
//             </p>
//             <button className="bg-[#4B0082] w-[50%] text-white font-medium mt-4 p-2 border-0 rounded-tl-lg rounded-br-xl font-poppins hover:scale-105 duration-500">
//               Inquire Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero1;
