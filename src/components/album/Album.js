import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Import the styles for the lightbox
import {IconButton, Tooltip, Typography} from "@material-tailwind/react";
import {PlusIcon} from "@heroicons/react/24/outline";
import "./Album.css"

export default function Album() {
    const {id} = useParams();
    const [album, setAlbum] = useState([]);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/albums/user/${id}`).then((response) => {
            setAlbum(response.data);
        });
    }, [id]);

    const openLightbox = (index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };
    const handleImageUpload = () => {
        const file = document.getElementById("image-upload").files;
        console.log(file)
    };

    return (
        <div className={"container"}>
            <Typography className={"text-center mt-10 mb-10"} variant={"h3"} color={"cyan"}>
                Danh sách ảnh
            </Typography>
            <div className={"row"}>
                {album.map((item, index) => (
                    <div key={index} className={"col-md-3"}>
                        <img
                            className={"h-60 w-60 mb-20 cursor-pointer"}
                            alt={"..."}
                            src={item.img}
                            onClick={() => openLightbox(index)}
                        />
                    </div>
                ))}
                <div className={"col-md-3"}>
                    <div className={"add-album-btn"}>
                        <label htmlFor="image-upload">
                            <a className={"btn btn-light h-18"}><PlusIcon className="h-14 w-14"/></a>
                        </label>
                        <input
                            type="file"
                            id="image-upload"
                            className={"hidden"}
                            accept="image/*"
                            onChange={handleImageUpload}
                            multiple={true}
                        />
                    </div>
                </div>
            </div>
            {/* Lightbox */}
            {isOpen && (
                <Lightbox
                    mainSrc={album[photoIndex].img}
                    nextSrc={album[(photoIndex + 1) % album.length].img}
                    prevSrc={album[(photoIndex + album.length - 1) % album.length].img}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + album.length - 1) % album.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % album.length)}
                />
            )}
        </div>
    );
}
