// import React from 'react'
// import styles from './Header.module.css'
// import Slider from 'assets/imgs/headerImg.jpeg'
// import SliderResponsive from 'assets/imgs/SliderResponsive.jpeg'
// import { useTranslation } from 'react-i18next'
// import { Container } from 'react-bootstrap'
// function Header() {
//     const {t} =useTranslation()
//   return (
//     <header className={styles['header-slider']}>
//         <img src={Slider} alt='Header Slider' className={`${styles['header-slider__img']} ${styles['header-slider__img--responsive']}`}/>
//         <div className={styles['header-slider__img-responsive-wrapper']}>
//           <img src={Slider} alt='Header Slider' className={`${styles['header-slider__img']} `}/>
//           <div className={styles['header-slider__img-responsive-content-wrapper']}>
//             <Container>
//               {/* <h2 className={styles['header-slider__img__title']}>
//                 {t('BRIGHT AND GLOWING.')}
//               </h2> */}
//               <h2 className={styles['header-slider__img__title']}>
//                 {t('RD Store presented one of its most beautiful aromatic scents with an Arabian scent, which is wood sticks, which is distinguished by its aroma Luxurious and elegant, as it gives the house an unparalleled scent. Based in the United Arab Emirates')}
//               </h2>
//             </Container>
//           </div>
//         </div>
//     </header>
//   )
// }

// export default Header
import React, { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { axiosConfig } from "utils/axiosConfig";

function Header() {
  const { t } = useTranslation();
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await axiosConfig.get("/slider/all-sliders"); 
        console.log("eeeeeeeeeeeeeeeeeeeeeee sliddderrr", res)
        if (res.data) {
          setSlides(res.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching sliders", err);
      }
    };
    fetchSliders();
  }, []);

  return (
    <header>
      <Carousel fade interval={4000} controls indicators>
        {slides.map((slide, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={slide.image}
              alt={`Slide ${idx + 1}`}
              style={{ objectFit: "cover", height: "80vh" }}
            />
            <Carousel.Caption>
              <Container>
                {slide.title && <h3>{t(slide.title)}</h3>}
                {slide.description && <p>{t(slide.description)}</p>}
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </header>
  );
}

export default Header;
