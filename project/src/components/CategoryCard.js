import React from "react";

function CategoryCard(props) {

    function handleClick(e) {
        console.log(e.target.innerText);
    }

    return (
        <div  key={props.index}  onClick={handleClick} className="category">
            <div className = "image">
                <img src={props.temp} alt={props.category} />
            </div>
            <div className = "slider-text">
                {props.category}
            </div>
        </div>
    );
}

export default CategoryCard;