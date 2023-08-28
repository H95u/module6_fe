import "./Banner.css"
import {useEffect} from "react";
export default function Banner() {
    useEffect(() => {
        let counter = 1;
        const interval = setInterval(() => {
            const radioBtn = document.getElementById('radio' + counter);
            if (radioBtn) {
                radioBtn.checked = true;
                counter++;
                if (counter > 4) {
                    counter = 1;
                }
            }
        }, 3000);

        // Xóa interval khi component unmount
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <div className={"carousel"}>
            <div className={"slider"}>
                <div className={"slides"}>
                    <input type="radio" name={"radio-btn"} id={"radio1"}/>
                    <input type="radio" name={"radio-btn"} id={"radio2"}/>
                    <input type="radio" name={"radio-btn"} id={"radio3"}/>
                    <input type="radio" name={"radio-btn"} id={"radio4"}/>

                    <div className={"slide first"}>
                        <img src={'/banner/banner1.jpg'} alt="heart"/>
                    </div>
                    <div className={"slide"}>
                        <img src={'/banner/banner2.jpg'} alt="valentines"/>
                    </div>
                    <div className={"slide"}>
                        <img src={'/banner/banner3.jpg'} alt="valentines day"/>
                    </div>
                    <div className={"slide"}>
                        <img src={'/banner/banner4.jpg'} alt="love you"/>
                    </div>

                    <div className={"navigation-auto"}>
                        <div className={"auto-btn1"}></div>
                        <div className={"auto-btn2"}></div>
                        <div className={"auto-btn3"}></div>
                        <div className={"auto-btn4"}></div>
                    </div>
                </div>

                <div className={"navigation-manual"}>
                    <label htmlFor={"radio1"} className={"manual-btn"} ></label>
                    <label htmlFor={"radio2"} className={"manual-btn"} ></label>
                    <label htmlFor={"radio3"} className={"manual-btn"} ></label>
                    <label htmlFor={"radio4"} className={"manual-btn"} ></label>
                </div>
            </div>
            </div>
        </>
    )
}