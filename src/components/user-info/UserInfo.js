import {useNavigate, useParams} from "react-router-dom";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../config/firebase";
import axios from "axios";


export default function UserInfo() {
    const {id} = useParams();
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed",
            () => {
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const imageDTO = { img: downloadURL };
                    axios.post(`http://localhost:8080/api/users/change-avatar/${id}`, imageDTO).then(() => {
                       navigate("/");
                    });
                });
            }
        );
    };


    return (
        <>

            <form>
                <h1>{id}</h1>
                <input type="file" id="img" onChange={handleFileChange}/>
            </form>
        </>
    );
}