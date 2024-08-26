import React, { Component } from "react";
import Slider from "react-slick";

import img1 from "../../../assets/images/slider-image-1.jpeg";
import img2 from "../../../assets/images/slider-image-2.jpeg";
import img3 from "../../../assets/images/slider-image-3.jpeg";
import img4 from "../../../assets/images/blog-img-1.jpeg";
import img5 from "../../../assets/images/blog-img-2.jpeg";

function SwipeToSlide() {
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 1,
        arrows: false,
        swipeToSlide: true,
        afterChange: function (index) {
            console.log(
                `Slider Changed to: ${
                    index + 1
                }, background: #222; color: #bada55`
            );
        },
    };
    return (
        <div className="flex h-[50vh] justify-center px-12 mb-10 overflow-hidden mt-10">
            <div className="w-3/5 slider-container">
                <Slider {...settings}>
                    <div className="h-full ">
                        <img
                            src={img1}
                            className="p-2 h-full object-cover object-bottom w-full"
                            alt=""
                        />
                    </div>
                    <div className="h-full">
                        <img
                            src={img2}
                            className=" p-2 h-full object-cover w-full"
                            alt=""
                        />
                    </div>
                    <div className="h-full">
                        <img
                            src={img3}
                            className=" p-2 h-full w-full object-cover"
                            alt=""
                        />
                    </div>
                </Slider>
            </div>
            <div className="w-2/5">
                <div className="h-1/2  img-container">
                    <img
                        src={img4}
                        className=" h-full w-full object-cover"
                        alt=""
                    />
                </div>
                <div className="mt-3  h-1/2 img-container">
                    <img
                        src={img5}
                        className="h-full w-full object-cover"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

export default SwipeToSlide;
