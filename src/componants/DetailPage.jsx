// import React, { useEffect, useState, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// import { FaRegCheckCircle } from "react-icons/fa";
// import { CiCircleCheck } from "react-icons/ci";

// import mainImg from "../assets/img1.webp";
// import thumb1 from "../assets/img2.webp";
// import thumb2 from "../assets/img9.jpg";
// import thumb3 from "../assets/img7.webp";
// import thumb4 from "../assets/img3.jpg";
// import thumb5 from "../assets/img5.jpg";
// import { useSubdomain } from "../context/ContextApi";

// // ImageZoom component with pinch-to-zoom and double-tap-to-zoom functionality
// function ImageZoom({ imgSrc, altText }) {
//   const [zoom, setZoom] = useState({ x: 50, y: 50, scale: 1 });
//   const [bgSize, setBgSize] = useState("contain");
//   const [touchStart, setTouchStart] = useState(null);
//   const [initialDistance, setInitialDistance] = useState(0);
//   const [initialTouchPos, setInitialTouchPos] = useState({ x: 0, y: 0 });
//   const [lastTap, setLastTap] = useState(0); // Track double tap
//   const [zoomingIn, setZoomingIn] = useState(false); // Track zoom direction
  
//   const containerRef = useRef(null);

//   // Handle mouse move for zoom
//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoom({ ...zoom, x, y });
//     setBgSize(`${100 + zoom.scale * 50}%`);
//   };

//   const handleMouseLeave = () => {
//     setZoom({ x: 50, y: 50, scale: 1 });
//     setBgSize("contain");
//   };

//   // Handle touch events for pinch-to-zoom
//   const handleTouchStart = (e) => {
//     if (e.touches.length === 1) {
//       const { clientX, clientY } = e.touches[0];
//       setInitialTouchPos({ x: clientX, y: clientY });
      
//       // Detect double-tap
//       const currentTime = new Date().getTime();
//       if (currentTime - lastTap < 300) { // 300ms for double-tap detection
//         setZoomingIn(!zoomingIn); // Toggle zoom state
//         setZoom({ ...zoom, scale: zoomingIn ? 1 : 2 }); // Zoom in or out
//         setBgSize(`${zoomingIn ? 100 : 250}%`); // Adjust background size accordingly
//       }
//       setLastTap(currentTime);
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
//       setZoom({
//         ...zoom,
//         x: Math.min(Math.max(zoom.x + (dx / window.innerWidth) * 100, 0), 100),
//         y: Math.min(Math.max(zoom.y + (dy / window.innerHeight) * 100, 0), 100),
//       });
//       setInitialTouchPos({ x: clientX, y: clientY });
//     }
//     if (e.touches.length === 2 && touchStart) {
//       const distance = getDistance(e.touches[0], e.touches[1]);
//       const scale = Math.max(1, Math.min(distance / initialDistance, 2));
//       setZoom({ ...zoom, scale });
//       setBgSize(`${100 + scale * 100}%`); 
//     }
//   };

//   const handleTouchEnd = () => {
//     setTouchStart(null);
//     setInitialDistance(0);
//   };

//   // Calculate touch distance
//   const getDistance = (touch1, touch2) => {
//     const xDiff = touch2.clientX - touch1.clientX;
//     const yDiff = touch2.clientY - touch1.clientY;
//     return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="relative overflow-hidden object-contain"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       style={{
//         backgroundImage: `url(${imgSrc})`,
//         backgroundPosition: `${zoom.x}% ${zoom.y}%`,
//         backgroundSize: bgSize,
//         backgroundRepeat: "no-repeat",
//         cursor: "zoom-in",
//         touchAction: "pinch-zoom",
//         height: "100%",
//         width: "100%",
//       }}
//     >
//       <img
//         src={imgSrc}
//         alt={altText}
//         className="opacity-0 w-full h-full object-contain"
//       />
//     </div>
//   );
// }

// const DetailPage = () => {
//   const name = "Rbtv";
//   const { userData, loading, error } = useSubdomain();
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const [artworks, setArtWorks] = useState([]);
//   const [product, setProduct] = useState({
//     title: "",
//     mainImage: "",
//     additionalImage: [],
//     availability: {},
//     description: "",
//   });
//   const [images, setImages] = useState([]);

//   const getImages = () => {
//     const artwork = artworks.find((art) => art.title.trim() === name);
//     console.log("art", artwork);

//     if (!artwork) {
//       console.error("Artwork not found");
//       return [];
//     }

//     setProduct(artwork);

//     const allImages = [artwork.mainImage, ...artwork.additionalImages];
//     console.log("all", allImages);

//     setImages(allImages);
//   };

//   useEffect(() => {
//     const fetchDetail = () => {
//       try {
//         const response = userData.data;
//         console.log("response", response.artworks);

//         setArtWorks(response.artworks);

//         console.log(artworks);
//       } catch (err) {
//         console.error("Error fetching detail page", err);
//       }
//     };
//     fetchDetail();
//     getImages();
//   }, [artworks, product, name, userData]);

//   return (
//     <div className="w-full md:w-[80vw] mx-auto flex flex-col md:flex-row justify-between gap-5 p-4">
//       {/* Left Side - Swipers */}
//       <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-2">
//         {/* Thumbnail Swiper */}
//         <div className="order-2 md:order-1 w-full mx-auto">
//           <Swiper
//             onSwiper={setThumbsSwiper}
//             direction="horizontal"
//             spaceBetween={10}
//             slidesPerView={4}
//             breakpoints={{ 768: { direction: "vertical" } }}
//             freeMode={true}
//             watchSlidesProgress={true}
//             modules={[FreeMode, Navigation, Thumbs]}
//             className="h-[20vw] md:h-[30vw] w-[90vw] md:w-[8vw] rounded-lg"
//           >
//             {images.map((image, index) => (
//               <SwiperSlide key={index} onClick={() => setSelectedIndex(index)}>
//                 <img
//                   className={`object-contain w-full h-full rounded-lg border-2 cursor-pointer transition duration-700 ease-in-out ${
//                     selectedIndex === index
//                       ? "border-[#4B0082] scale-95 opacity-100"
//                       : "border-[#D8BFD8] opacity-[0.4] hover:border-[#4B0082] hover:scale-100 hover:opacity-100"
//                   }`}
//                   src={`https://admin.artpallatte.com/${image}`}
//                   alt={image.altText}
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* Main Image Swiper */}
//         <div className="order-1 md:order-2 flex w-full">
//           <Swiper
//             style={{ "--swiper-navigation-color": "#000" }}
//             loop={true}
//             spaceBetween={10}
//             navigation={false}
//             thumbs={thumbsSwiper && { swiper: thumbsSwiper }}
//             modules={[FreeMode, Navigation, Thumbs]}
//             className="h-[80vw] md:h-[30vw] w-[90vw] md:w-[30vw] rounded-lg overflow-hidden border border-[#D8BFD8]"
//           >
//             {images.map((image, index) => (
//               <SwiperSlide key={index}>
//                 <ImageZoom
//                   imgSrc={`https://admin.artpallatte.com/${image}`}
//                   altText={image.altText}
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>

//       {/* Right Side - Details */}
//       <div className="w-full md:w-1/2 space-y-2">
//         <h3 className="text-2xl font-bold">{product.title}</h3>
//         <p className="text-gray-600">
//           {product.description}
//           Sculpture is a three-dimensional art form that involves shaping or
//           combining materials to create artistic structures. Unlike paintings or
//           drawings, sculptures have depth and can be viewed from multiple
//           angles.
//         </p>
//         <h4 className="text-xl font-semibold">₹ {product.price} </h4>

//         {product.availability.outOfIndia || product.availability.wholesale ? (
//           <div className="space-y-2">
//             <h5 className="text-xl font-bold">Availability</h5>
//             <div className="flex-col md:flex lg:flex-row bg-gray">
//               {product.availability.outOfIndia && (
//                 <div className="p-1 rounded-full mb-1 flex items-center">
//                   <div className="border border-black py-[2%] px-2 rounded-full flex items-center gap-3">
//                     <p className="text-sm font-semibold">Out Of India</p>
//                     <FaRegCheckCircle />
//                   </div>
//                 </div>
//               )}
//               {product.availability.wholesale && (
//                 <div className="p-1 rounded-full mb-1 flex items-center">
//                   <div className="border border-black py-[2%] px-2 rounded-full flex items-center gap-3">
//                     <p className="text-sm font-semibold">Wholesale</p>
//                     <FaRegCheckCircle />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           ""
//         )}
//         <button className="bg-[#4B0082] text-white w-[46vw] md:w-[20vw] px-6 py-2 rounded-tl-lg rounded-br-lg transition duration-700 ease-in-out hover:scale-110 hover:border-[#4B0082] ">
//           Inquire Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DetailPage;



// src/pages/DetailPage.js





import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { FaRegCheckCircle } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";

import mainImg from "../assets/img1.webp";
import thumb1 from "../assets/img2.webp";
import thumb2 from "../assets/img9.jpg";
import thumb3 from "../assets/img7.webp";
import thumb4 from "../assets/img3.jpg";
import thumb5 from "../assets/img5.jpg";
import { useSubdomain } from "../context/ContextApi";

// ImageZoom component with pinch-to-zoom and double-tap-to-zoom functionality
function ImageZoom({ imgSrc, altText }) {
  const [zoom, setZoom] = useState({ x: 50, y: 50, scale: 1 });
  const [bgSize, setBgSize] = useState("contain");
  const [touchStart, setTouchStart] = useState(null);
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialTouchPos, setInitialTouchPos] = useState({ x: 0, y: 0 });
  const [lastTap, setLastTap] = useState(0); // Track double tap
  const [zoomingIn, setZoomingIn] = useState(false); // Track zoom direction
  
  const containerRef = useRef(null);

  // Handle mouse move for zoom
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom({ ...zoom, x, y });
    setBgSize(`${100 + zoom.scale * 50}%`);
  };

  const handleMouseLeave = () => {
    setZoom({ x: 50, y: 50, scale: 1 }); 
    setBgSize("contain");
  };

  // Handle touch events for pinch-to-zoom and double-tap-to-zoom
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const { clientX, clientY } = e.touches[0];
      setInitialTouchPos({ x: clientX, y: clientY });
      
      // Detect double-tap
      const currentTime = new Date().getTime();
      if (currentTime - lastTap < 300) { 
        setZoomingIn(!zoomingIn);
        setZoom({ ...zoom, scale: zoomingIn ? 1 : 2 });
        setBgSize(`${zoomingIn ? 100 : 200}%`); 
      }
      setLastTap(currentTime);
    }
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      setTouchStart(distance);
      setInitialDistance(distance);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      const { clientX, clientY } = e.touches[0];
      const dx = clientX - initialTouchPos.x;
      const dy = clientY - initialTouchPos.y;

      // Adjust zoom position, ensuring it's within container bounds

      setZoom({
        ...zoom,
        x: Math.min(Math.max(zoom.x - (dx / containerRef.current.offsetWidth) * 100, 0), 100),
        y: Math.min(Math.max(zoom.y - (dy / containerRef.current.offsetHeight) * 100, 0), 100),
      });
      
      setInitialTouchPos({ x: clientX, y: clientY });
    }
    
    if (e.touches.length === 2 && touchStart) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      const scale = Math.max(1, Math.min(distance / initialDistance, 2)); // Scale range
      
      // Ensure scale is within bounds and apply
      setZoom({ ...zoom, scale });
      setBgSize(`${100 + scale * 100}%`);
    }
  };
  // console.log("Container width:", containerRef.current.offsetWidth);
  // console.log("Container height:", containerRef.current.offsetHeight);

  const handleTouchEnd = () => {
    setTouchStart(null);
    setInitialDistance(0);
  };

  // Calculate touch distance
  const getDistance = (touch1, touch2) => {
    const xDiff = touch2.clientX - touch1.clientX;
    const yDiff = touch2.clientY - touch1.clientY;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden object-contain"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundPosition: `${zoom.x}% ${zoom.y}%`,
        backgroundSize: bgSize,
        backgroundRepeat: "no-repeat",
        cursor: "zoom-in",
        touchAction: "pinch-zoom",
        height: "100%",
        width: "100%",
      }}
    >
      <img
        src={imgSrc}
        alt={altText}
        className="opacity-0 w-full h-full object-contain"
      />
    </div>
  );
}

const DetailPage = () => {
  const name = "Turtle bronze coin"
  const { userData, loading, error } = useSubdomain();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [artworks, setArtWorks] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    mainImage: "",
    additionalImage: [],
    availability: {},
    description: "",
  });
  const [images, setImages] = useState([]);

  const getImages = () => {
    const artwork = artworks.find((art) => art.title.trim() == name);
    artworks.map((art) => {
      console.log("arts title: " + art.title, name);
    });
    console.log("art",artwork);

    if (!artwork) {
      console.error("Artwork not found");
      return [];
    }

    setProduct(artwork);

    const allImages = [artwork.mainImage, ...artwork.additionalImages];
    console.log("all", allImages);

    setImages(allImages);
  };

  useEffect(() => {
    const fetchDetail = () => {
      try {
        const response = userData.data;
        console.log("response", response.artworks);

        setArtWorks(response.artworks);

        console.log(artworks);
      } catch (err) {
        console.error("Error fetching detail page", err);
      }
    };
    fetchDetail();
    getImages();
  }, [artworks, product, name, userData]);

  return (
    <div className="w-full md:w-[80vw] mx-auto flex flex-col md:flex-row justify-between gap-5 p-4">
      {/* Left Side - Swipers */}
      <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-2">
        {/* Thumbnail Swiper */}
        <div className="order-2 md:order-1 w-full mx-auto">
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="horizontal"
            spaceBetween={10}
            slidesPerView={4}
            breakpoints={{ 768: { direction: "vertical" } }}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-[20vw] md:h-[30vw] w-[90vw] md:w-[8vw] rounded-lg"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} onClick={() => setSelectedIndex(index)}>
                <img
                  className={`object-contain w-full h-full rounded-lg border-2 cursor-pointer transition duration-700 ease-in-out ${
                    selectedIndex === index
                      ? "border-[#4B0082] scale-95 opacity-100"
                      : "border-[#D8BFD8] opacity-[0.4] hover:border-[#4B0082] hover:scale-100 hover:opacity-100"
                  }`}
                  src={`https://admin.artpallatte.com/${image}`}
                  alt={image.altText}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Main Image Swiper */}
        <div className="order-1 md:order-2 flex w-full">
          <Swiper
            style={{ "--swiper-navigation-color": "#000" }}
            loop={true}
            spaceBetween={10}
            navigation={false}
            thumbs={thumbsSwiper && { swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-[80vw] md:h-[30vw] w-[90vw] md:w-[30vw] rounded-lg overflow-hidden border border-[#D8BFD8]"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <ImageZoom
                  imgSrc={`https://admin.artpallatte.com/${image}`}
                  altText={image.altText}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Right Side - Details */}
      <div className="w-full md:w-1/2 space-y-2">
        <h3 className="text-2xl font-bold">{product.title}</h3>
        <p className="text-gray-600">
          {product.description}
          Sculpture is a three-dimensional art form that involves shaping or
          combining materials to create artistic structures. Unlike paintings or
          drawings, sculptures have depth and can be viewed from multiple
          angles.
        </p>
        <h4 className="text-xl font-semibold">₹ {product.price} </h4>

        {product.availability.outOfIndia || product.availability.wholesale ? (
          <div className="space-y-2">
            <h5 className="text-xl font-bold">Availability</h5>
            <div className="flex-col md:flex lg:flex-row bg-gray">
              {product.availability.outOfIndia && (
                <div className="p-1 rounded-full mb-1 flex items-center">
                  <div className="border border-black py-[2%] px-2 rounded-full flex items-center gap-3">
                    <p className="text-sm font-semibold">Out Of India</p>
                    <FaRegCheckCircle />
                  </div>
                </div>
              )}
              {product.availability.wholesale && (
                <div className="p-1 rounded-full mb-1 flex items-center">
                  <div className="border border-black py-[2%] px-2 rounded-full flex items-center gap-3">
                    <p className="text-sm font-semibold">Wholesale</p>
                    <FaRegCheckCircle />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        <button className="bg-[#4B0082] text-white w-[46vw] md:w-[20vw] px-6 py-2 rounded-tl-lg rounded-br-lg transition duration-700 ease-in-out hover:scale-110 hover:border-[#4B0082] ">
          Inquire Now
        </button>
      </div>
    </div>
  );
};

export default DetailPage;







