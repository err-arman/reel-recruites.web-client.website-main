import { PromotionalVideo } from "@/_app/gql-types/graphql";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PromotionalVideoCard from "./PromotionalVideoCard";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import { Link } from "react-router-dom";

interface PromotionalVideoSectionProps {
  promotionalVideos: PromotionalVideo[];
}

const PromotionalVideoSection: React.FC<PromotionalVideoSectionProps> = ({
  promotionalVideos,
}) => {
  return (
    <>
      <Swiper
        modules={[Autoplay, FreeMode]}
        freeMode={true}
        autoHeight={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
        }}
        autoplay={{
          disableOnInteraction: false,
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        className="relative grid items-center justify-center grid-cols-1 md:grid-cols-3 h-[400px]"
      >
        {promotionalVideos?.map((video, idx) => (
          <SwiperSlide key={idx}>
            {/* <div className="py-10 bg-red-500">
            <h1>{video?.title}</h1>
          </div> */}
            <PromotionalVideoCard video={video} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-center">
        <Link className=" outline-button" to={"promotional-videos"}>
          View all promotional videos
        </Link>
      </div>
    </>
  );
};

export default PromotionalVideoSection;
