// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Slider from "react-slick";
import React from "react";
import Slide from "./slide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define the types for the slide data
interface SlideData {
    id: number;
    img: string;
    title: string;
    mainTitle: string;
    price: string;
}

const SliderBoxPro: React.FC = () => {
    // Slider settings with proper typing
    const settings: Record<string, any> = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    // Slide data array with appropriate type
    const slideData: SlideData[] = [
        {
            id: 0,
            img: "/images/demo-img.jpg",
            title: "Trending Item",
            mainTitle: "Vegetables for Good",
            price: "$20",
        },
        {
            id: 1,
            img: "/images/demo-2.jpg",
            title: "Trending Item",
            mainTitle: "Vegetables for Good",
            price: "$20",
        },
        {
            id: 2,
            img: "/images/demo-img.jpg",
            title: "Trending Item",
            mainTitle: "Vegetables for Good",
            price: "$20",
        },
    ];

    return (
        <>
            <Slider {...settings}>
                {slideData.map((item) => (
                    <Slide
                        key={item.id}
                        img={item.img}
                        title={item.title}
                        mainTitle={item.mainTitle}
                        price={item.price}
                    />
                ))}
            </Slider>
        </>
    );
}

export default SliderBoxPro;
