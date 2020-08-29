import React from "react";
import { useRouter } from "next/router";
import firebase from "../../../firebase/clientApp";
import { useUser } from "../../../context/userContext";
// import { useDebounce } from "use-debounce";

//  COMPONENT IMPORTS
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";
import SpinLoader from "../atoms/SpinLoader";
// CSS IMPORTS
import ContainersCSS from "../../../styles/containers.module.css";
import ButtonsCSS from "../../../styles/buttons.module.css";

export default function ProfileComponent() {
  const router = useRouter();
  React.useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);
  const { loadingUser, user, setUser } = useUser();
  const [displayName, setDisplayName] = React.useState(user.displayName);
  const [avatar, setAvatar] = React.useState(user.photoURL);
  const [isLoading, setIsLoading] = React.useState(false);

  async function uploadFile(event) {
    event.preventDefault();
    setIsLoading(true);
    console.log("uploading file...");
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "figure");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dx35aw3ub/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    setAvatar(file.secure_url);
    setIsLoading(false);
  }

  async function updateProfile() {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        displayName: displayName,
        photoURL: avatar,
      })
      .then(console.log("updating firestore - out"));
    await setUser({
      displayName: displayName,
      photoURL: avatar,
    });
  }

  function SignOut() {
    router.push("/");
    firebase.auth().signOut();
  }

  if (loadingUser) return <SpinLoader />;
  return (
    <div className={ContainersCSS.FlexColStartOnTop66WideContainer}>
      <img
        src={avatar}
        style={{
          borderRadius: "50%",
          maxWidth: "10rem",
          maxHeight: "10rem",
          minHeight: "10rem",
          minWidth: "10rem",
          //   alignSelf: "start",
          border: "0.1rem solid #C5BFAF",
        }}
      />
      <h1>Hello {user.displayName},</h1>
      <h2>You can adjust your profile settings here:</h2>
      <label htmlFor="displayName">Display name</label>
      <input
        type="text"
        name="displayName"
        id="displayName"
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
      />
      <label htmlFor="image" className={ButtonsCSS.file}>
        UPLOAD AVATAR
        <input
          type="file"
          id="image"
          name="image"
          disabled={isLoading}
          className={ButtonsCSS.customFileInput}
          onChange={(event) => uploadFile(event)}
        />
      </label>
      <PrimaryButton onClickFunction={updateProfile} buttonText={"SAVE"} />
      <div style={{ height: "3rem" }} />
      <SecondaryButton onClickFunction={SignOut} buttonText={"SIGN OUT"} />
    </div>
  );
}
