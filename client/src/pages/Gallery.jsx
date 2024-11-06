import React, { useEffect, useState } from "react";
import { getAllGalleries } from "../services/operations/gallery";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchGalleryData = async () => {
      const data = await getAllGalleries();
      setGalleryData(data);
      setLoading(false);
    };

    fetchGalleryData();
  }, []);

  // Group images by type
  const groupedData = galleryData.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex mt-5 flex-col w-full items-center">
        <h3 className="text-4xl font-fjalla text-[#33536B]">Our Gallery</h3>
        <div className="flex items-center w-[75px]">
          <div className="h-0.5 bg-[#e2571a]"></div>
          <div className="h-1 w-1 bg-[#e2571a] rounded-full mx-1"></div>
          <div className="h-1 w-1 bg-[#e2571a] rounded-full mx-1"></div>
          <div className="h-1 w-1 bg-[#e2571a] rounded-full mx-1"></div>
          <div
            className="h-[4px] rounded-full w-[10px] flex-grow"
            style={{ backgroundColor: "#e2571a" }}
          ></div>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div> // Show loading indicator while fetching data
      ) : (
        Object.keys(groupedData).map((type) => (
          <div key={type} className="my-10">
            <h4 className="text-2xl font-bold text-center mb-4">{type}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto p-4">
              {groupedData[type].map((item) => (
                <Tile key={item.id} data={item} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const Tile = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const tileStyle = isOpen
    ? "fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10"
    : "relative w-full h-48 sm:h-64 lg:h-80";

  const imgStyle = isOpen
    ? "lg:w-[60vw] lg:h-[80vh] w-[80vw] h-[50vh] object-cover transition-all duration-300 ease-in-out"
    : "w-full h-full object-cover transition-all duration-300 ease-in-out";

  return (
    <div
      className={`tile ${tileStyle} cursor-pointer transition-all duration-300 ease-in-out`}
      onClick={handleClick}
    >
      <img
        src={data?.images?.[0]?.url}
        alt={data.title}
        className={imgStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {isHovered && !isOpen && (
        <div className="absolute bottom-2 left-2 bg-yellow-600 text-white text-sm px-2 py-1 rounded">
          {data.title}
        </div>
      )}
    </div>
  );
};

export default Gallery;
