import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import {Badge, IconButton, Spinner, Tooltip, Typography} from "@material-tailwind/react";
import {PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
import "./Album.css"
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../config/firebase";
import Swal from "sweetalert2";

export default function Album() {
    const {id} = useParams();
    const [album, setAlbum] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [pressedDeleteIndex, setPressedDeleteIndex] = useState(null);
    const [loading, setLoading] = useState(false);
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
    const handleImageDelete = (index) => {
        Swal.fire({
            title: 'Bạn chắc chắn muốn xóa ?',
            text: "Lựa chọn của bạn sẽ không thể thay đổi !!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Thôi ! suy nghĩ lại rồi :D !',
            confirmButtonText: 'OK, Xóa luôn !'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(`http://localhost:8080/api/albums/${index}`)
                        .then(response => {
                            setAlbum(response.data);
                        });

                } catch (error) {
                    console.error(error);
                }
                Swal.fire({
                        title: 'Đã xóa !',
                        text: 'Ảnh đã được xóa khỏi album !',
                        icon: 'success',
                        timer: 1000
                    }
                )
            }
        })
    };

    const handleImageUpload = async () => {
        setLoading(true);
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
        const uploadAlbumDTO = {albumImg: listImg};
        try {
            await axios.post(`http://localhost:8080/api/albums/user/${id}`, uploadAlbumDTO)
                .then(response => {
                    setLoading(false)
                    setAlbum(response.data);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Tải ảnh lên thành công !!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <>
                <div className="ml-10 flex h-screen items-center justify-center">
                    <Spinner className="h-32 w-32 p-2 mb-32" color="pink"/>
                    <p className={"mb-32"}>Đang tải ảnh lên ...</p>
                </div>

            </>
        )
    }

    return (
        <div className={"container album-container"}>
            <Typography className={"text-center mt-10 mb-10"} variant={"h2"} color={"cyan"}>
                Danh sách ảnh
            </Typography>
            <div className={"row"}>
                {album.map((item, index) => (
                    <div
                        key={index}
                        className={"col-md-3 img-container"}
                        onMouseEnter={() => setHoveredIndex(item.id)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <img
                            className={"h-60 w-60 mb-20 cursor-pointer"}
                            alt={"..."}
                            src={item.img}
                            onClick={() => openLightbox(index)}
                        />
                        {(hoveredIndex === item.id || pressedDeleteIndex === item.id) && (
                            <div className="delete-button">
                                <Tooltip placement="top" content="Xóa ảnh">
                                    <IconButton
                                        onClick={() => handleImageDelete(item.id)}
                                        color="red"
                                        ripple="light"
                                        size="lg"
                                        className="delete-button"
                                        onMouseDown={() => setPressedDeleteIndex(item.id)}
                                        onMouseUp={() => setPressedDeleteIndex(null)}
                                        onMouseLeave={() => setPressedDeleteIndex(null)}
                                    >
                                        <XMarkIcon className={"h-10 w-10"}/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )}
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
