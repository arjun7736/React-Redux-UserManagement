import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
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
  return (
    <div className="flex flex-col items-center w-screen h-screen bg-slate-200 justify-center">
      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <Avatar
        className="w-40 h-40 cursor-pointer"
        onClick={() => fileRef.current.click()}
      >
        <AvatarImage src={formData.profilePicture || "https://cdn-icons-png.freepik.com/256/12225/12225773.png"}/>
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
      <h1 className="m-5 text-5xl">Hai{}</h1>
      <Button className="m-5 hover:scale-110 uppercase">Log Out</Button>
    </div>
  );
};

export default Home;
