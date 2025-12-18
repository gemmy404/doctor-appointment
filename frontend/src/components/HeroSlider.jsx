import React from "react";
import Slider from "react-slick";

function HeroSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const slides = [
        {
            image: "/img/hero-carousel/hero-carousel-1.jpg",
            title: "Your Health, Our Priority",
            text: "We provide advanced medical care with experienced doctors, modern technology, and a caring approach for every patient.",
        },
        {
            image: "/img/hero-carousel/hero-carousel-2.jpg",
            title: "Specialized Medical Services",
            text: "From cardiology to pediatrics, our expert teams are ready to help you and your family stay healthy and safe.",
        },
        {
            image: "/img/hero-carousel/hero-carousel-3.jpg",
            title: "Easy Online Appointments",
            text: "Book your appointment quickly and conveniently with top doctors at your preferred time.",
        }
    ];

    return (
        <section className='relative w-full h-[80vh] overflow-hidden'>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full h-[80vh]">
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover"/>

                        <div className='absolute inset-0 bg-black bg-opacity-60 flex flex-col
                            justify-center items-center text-center text-white px-4'>
                            <h2 className='text-4xl font-bold mb-4 text-[#46daea]'>{slide.title}</h2>
                            <p className='max-w-xl text-xl'>{slide.text}</p>
                            <button className='mt-6 inline-block py-3 rounded'>Read More</button>
                        </div>

                    </div>
                ))}
            </Slider>
            Hero Slider
        </section>
    );
}

export default HeroSlider;