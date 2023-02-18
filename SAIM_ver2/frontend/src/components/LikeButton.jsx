import React, { useState } from "react";

const LikeButton = () => {
    const [likes, setLikes] = useState("♡ ");
    const [isClicked, setIsClicked] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const handleClick = () => {
        if (isClicked) {
            setLikes("♡ ");
        } else {
            setLikes("❤️");
            setClickCount(0 + 1)
        }
        setIsClicked(!isClicked);
    };

    return (
        <>
            <button className={`like-button ${isClicked && "liked"}`} onClick={handleClick} disabled={isClicked}>
            <span className="likes-counter">{`Like | ${likes}`}</span>
            </button>
            <p> {clickCount} like &#40;s&#41;</p>
        </>
    );
};

export default LikeButton;