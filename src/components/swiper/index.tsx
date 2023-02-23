import React, { useState } from 'react';
import { FreeMode, Navigation, Pagination,Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import BookImageAnather from '../../assets/image/book-image-anather.png';

import './styles.css';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

interface ImageUrl{
  url: string,
}

interface Props{
  img: ImageUrl[],
  bookImages: string[],
}

export const Sswiper:React.FC<Props> = ({img, bookImages}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const date = new Date()



  return (

    <React.Fragment>

{


img === null  ?

<Swiper

data-test-id='slide-big'
  spaceBetween={10}
  modules={[FreeMode, Navigation, Thumbs,Pagination]}
  className="mySwiper2"
>

    <SwiperSlide>
    <img src={BookImageAnather} alt='book' />
  </SwiperSlide>

</Swiper>

:
<Swiper
      data-test-id='slide-big'
        spaceBetween={30}
        navigation={true}
        pagination={img.length > 1 ? true : false}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs,Pagination]}
        className='mySwiper2'
      >
        {img.map((imag:ImageUrl) =>
        (
          <SwiperSlide key={imag.url}>
          <img src={`https://strapi.cleverland.by${imag.url}`} alt='book' />
        </SwiperSlide>
        ))}
      </Swiper>


}






  {img === null ? '' : img.length !== 1 && img.length !== 0 &&  (
        <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={ 5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {img.map((bookImg) => (
            <SwiperSlide data-test-id='slide-mini' key={Math.random() * date.getMilliseconds()}>
            <img src={ `https://strapi.cleverland.by${bookImg.url}` } alt='book' />
          </SwiperSlide>
        ))}

      </Swiper>
      )}
    </React.Fragment>
  );
}



























