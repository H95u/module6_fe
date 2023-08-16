import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Import the styles for the lightbox
import {IconButton, Tooltip, Typography} from "@material-tailwind/react";
import {PlusIcon} from "@heroicons/react/24/outline";
import "./Album.css"
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../config/firebase";

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
    const handleImageUpload = async () => {
        const fileInput = document.getElementById("image-upload");
        const files = fileInput.files;
        const listImg = [];

        for (let i = 0; i < files.length; i++) {
            const storageRef = ref(storage, `albums/${files[i].name}`);
            const uploadTask = uploadBytesResumable(storageRef, files[i]);

            await new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    () => {
                    },
                    (error) => {
                        alert(error);
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            listImg.push(downloadURL);
                            resolve();
                        });
                    }
                );
            });
        }
        console.log(listImg)
        const uploadAlbumDTO = {albumImg: listImg};
        try {
            const response = await axios.post(`http://localhost:8080/api/albums/user/${id}`, uploadAlbumDTO);
            setAlbum(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className={"container-album"}>
            <div className={"heading-album"}>
                <h3>Danh Sách<span>Ảnh</span></h3>
            </div>
            <div className={"box-album"}>
                {album.map((item, index) => (
                    <div key={index} className={"dream-album"}>
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
