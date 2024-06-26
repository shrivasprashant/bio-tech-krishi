import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Slider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://api.bhartiyabiotech.com/images');
      setImages(response.data); // Assuming the API returns an array of objects with 'id' and 'url' properties
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className=''>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className='w-full h-96 sm:h-[80vh]'>
              <img className='w-full h-full object-cover' src={image.url} alt={`Slide ${image.id}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
