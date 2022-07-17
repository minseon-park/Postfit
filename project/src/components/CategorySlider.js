import React, { useState } from 'react';
import Carousel from "react-simply-carousel";
import imageCompression from 'browser-image-compression';

import "../css/CategorySlider.css"
import Yoga from '../images/Slider/Yoga.jpg';
import WeightLifting from '../images/Slider/WeightLifting.jpg';
import Pilates from '../images/Slider/Pilates.jpg';
import Boxing from '../images/Slider/Boxing.jpg';
import Dancing from '../images/Slider/Dancing.jpg';
import Aerobic from '../images/Slider/Aerobic.jpg';
import Anerobic from '../images/Slider/Anerobic.jpg';
import Golf from '../images/Slider/Golf.jpg';
import Basketball from '../images/Slider/Basketball.jpg';
import Football from '../images/Slider/Football.jpg';
import Soccer from '../images/Slider/Soccer.jpg';
import Misc from '../images/Slider/Misc.jpg';

function CategorySlider() {


    const listOfCategories =
        [
            "Yoga",
            "Weight Lifting",
            "Pilates",
            "Boxing",
            "Dancing",
            "Aerobics",
            "Anaerobics",
            "Golf",
            "Basketball",
            "Football",
            "Soccer",
            "Misc"
        ]

    const listOfImages = [
        Yoga,
        WeightLifting,
        Pilates,
        Boxing,
        Dancing,
        Aerobic,
        Anerobic,
        Golf,
        Basketball,
        Football,
        Soccer,
        Misc
    ];

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const change = (setIndex) => {
        setActiveSlideIndex(setIndex);
    }

 
    return (
        <Carousel
            activeSlideIndex={activeSlideIndex}
            onRequestChange={change}
            itemsToShow={3}
            itemsToScroll={1}
        >
          {listOfImages.map((image, i) => {
              return (
                <div className="list-of-image">
                    <img 
                        src={image}
                        alt="none"
                        style={{ width: '100%', height: 300,}}
                    />
                    <div className="list-of-category">{listOfCategories[i]}</div>
                </div>
              )
          })}
      </Carousel>
    );

}

export default CategorySlider;