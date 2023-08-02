export default function Banner() {
    return (
        <div className={"banner"}>
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img style={{height:200}} src={"/banner/035964677003eef.jpg_wh860.jpg"} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img style={{height:200}} src={"/banner/035964677003eef.jpg_wh860.jpg"} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img style={{height:200}} src={"/banner/035964677003eef.jpg_wh860.jpg"} className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}