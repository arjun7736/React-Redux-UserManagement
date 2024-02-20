import { AvatarImage } from "@/components/ui/avatar";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "@/redux/user/userSlice";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { SpinnerCircular } from "spinners-react";
import React, { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [updateSuccess,setUpdateSuccess]=useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
     await axios
        .post(`/api/user/update/${currentUser.data._id}`, formData)
        .then((data) => {
          dispatch(updateUserSuccess(data));
          setUpdateSuccess(true)
        })
        .catch((data) => dispatch(updateUserFailure(data.message)));
    } catch (error) {}
  };
  return (
    <div className="flex flex-col items-center w-screen h-screen bg-slate-200 justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center ">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <Avatar
          className="w-40 h-40 cursor-pointer"
          onClick={() => fileRef.current.click()}
        >
          <AvatarImage
            src={
              formData.profilePicture ||
              currentUser.data.profilePicture
            }
          />
        </Avatar>
        <p>
          {imageError ? (
            <span className="text-red-700">Error Uploading Image</span>
          ) : progress > 0 && progress < 100 ? (
            <span className="text-slate-700">{`Uploading Image...${progress} %`}</span>
          ) : progress === 100 ? (
            <span className="text-green-700">Image Uploaded</span>
          ) : (
            ""
          )}
        </p>
        <p className="text-red-700 m-5">{error&&"Something Went Wrong"}</p>
        <p className="text-green-700 m-5">{updateSuccess&&"Updated Successfully"}</p>
        <input
          className="py-2 px-3 w-64 m-3"
          type="text"
          id="username"
          defaultValue={currentUser.data.username}
          onChange={handleChange}
        />
        <input
          className="py-2 px-3 w-64 m-3"
          type="email"
          id="email"
          defaultValue={currentUser.data.email}
          onChange={handleChange}
        />
        <Button className="m-5 hover:scale-110 uppercase"> {loading ? (
              <>
                <SpinnerCircular
                  size={30}
                  thickness={168}
                  speed={127}
                  color="rgba(255, 255, 255, 1)"
                  secondaryColor="rgba(0, 0, 0, 0.44)"
                />
                &nbsp; Loading...
              </>
            ) : (
              "update"
            )}</Button>
      </form>
    </div>
  );
};

export default Home;
