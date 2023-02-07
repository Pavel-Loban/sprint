import React, { useRef, useState } from "react";


import { Swiper, SwiperSlide } from "swiper/react";



import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

import "./styles.css";


import { FreeMode, Navigation, Thumbs, Pagination } from "swiper";
import BookImageAnather from '../../assets/image/book-image-anather.png';

export const Sswiper= ({img, bookImages}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const date = new Date()

  return (
    <React.Fragment>

{img !== '' ?
<Swiper
      data-test-id='slide-big'
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#000",
          "--swiper-pagination-bullet": "#eee",
        }}
        spaceBetween={30}
        navigation={true}
        pagination={bookImages.length > 1 ? true : false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs,Pagination]}
        className="mySwiper2"
      >
        {bookImages.map((imag,i, array) =>
        (
          <SwiperSlide key={Math.random() * date.getMilliseconds()}>
          <img src={imag} alt='book' />
        </SwiperSlide>
        ))}
      </Swiper>
      :
      <Swiper
      data-test-id='slide-big'
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#000",
          "--swiper-pagination-bullet": "#eee",
        }}
        spaceBetween={10}
        navigation={true}
        pagination={bookImages.length > 1 ? true : false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs,Pagination]}
        className="mySwiper2"
      >

          <SwiperSlide>
          <img src={BookImageAnather} alt='book' />
        </SwiperSlide>

      </Swiper>
}






      {bookImages.length !== 1 && bookImages.length !== 0 &&(
        <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={ bookImages.length}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {bookImages.map((img,i,array) => (
            <SwiperSlide data-test-id='slide-mini' key={Math.random() * date.getMilliseconds()}>
            <img src={ img } alt='book' />
          </SwiperSlide>
        ))}

      </Swiper>
      )}
    </React.Fragment>
  );
}



























