import { useContext, useEffect, useRef, useState } from "react";
import { UtilitiesContext } from "../provider/UtilitiesProvider";
import { IoCamera, IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TbEdit } from "react-icons/tb";
import { ImCheckmark } from "react-icons/im";
import { MdDelete, MdLockReset } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import userMan from '../assets/image/user-man.png'
import { BounceLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_url= `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const MyProfile = () => {
  const { setMyProfile } = useContext(UtilitiesContext);
  const {logOut, reauthenticateAndDeleteUser, user, updateUserProfile, reauthenticatePopupAndDeleteUser} = useContext(AuthContext)
  const [nameEdit, setNameEdit] = useState(false);
  const [aboutEdit, setAboutEdit] = useState(false);
  const textAreaRef = useRef();
  const nameRef = useRef();
  const [previewImage, setPreviewImage] = useState(user?.photoURL);
  const [onImgSubmitting, setOnImgSubmitting] = useState(false)
  const [onNameSubmitting, setOnNameSubmitting] = useState(false)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleLogOut =()=>{
        logOut()
        .then(()=>{
          Swal.fire({
                    title: "Logout successfully!",
                    icon: "success",
                  });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: error.code,
            icon: 'error',
          });
        });
      }

      const handleDeleteUser = () =>{
        Swal.fire({
          title: user.providerData[0]?.providerId === "google.com" ? "Reauthenticate with Google" : "Re-enter your password",
          text: user.providerData[0]?.providerId === "google.com" ? "You need to reauthenticate using Google to delete your profile." : "Enter your password to delete profile",
          input: user.providerData[0]?.providerId === "google.com" ? undefined : "password",
          inputLabel: user.providerData[0]?.providerId === "google.com" ? undefined : "Password",
          inputPlaceholder: user.providerData[0]?.providerId === "google.com" ? undefined : "Password",
          inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
          },
          background: "#ede9fe",
          confirmButtonColor: "#6d28d9",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            if (user.providerData[0]?.providerId === "google.com"){
              reauthenticatePopupAndDeleteUser()
              .then(() => {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your profile has been deleted.",
                  icon: "success",
                  background: "#ede9fe",
                  showConfirmButton: false,
                  timer: 1500,
                });
              })
              .catch((error) => {
                console.error(error);
                Swal.fire({
                  title: error.code || "Something went wrong",
                  icon: "error",
                  background: "#ede9fe",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
            }
            else{
              reauthenticateAndDeleteUser(result.value)
              .then(() => {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your profile has been deleted.",
                  icon: "success",
                  background: "#ede9fe",
                  showConfirmButton: false,
                  timer: 1500,
                });
              })
              .catch((error) => {
                console.error(error);
                Swal.fire({
                  title: error.code || "Something went wrong",
                  icon: "error",
                  background: "#ede9fe",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
            }
            
          }
        });
      }


      const handleImageChange = async(e) => {
        setOnImgSubmitting(true)
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image);
        const imageResponse = await fetch(image_hosting_url, {
          method: "POST",
          body: formData,
        });
        const imageData = await imageResponse.json();
        const imageUrl = imageData.data.url

        if (imageData.success) {
          updateUserProfile( user.displayName, imageUrl)
          .then(result=>{
            toast.success('Successfully uploaded!')
            setPreviewImage(imageUrl)
          })
          .catch(error=>{
            toast.success( error.code|| 'Something went wrong!')
          })
        } else {
          toast.success( 'Something went wrong!')
        }
        setOnImgSubmitting(false)
      };

      const handleNameChange= () =>{
        const name = nameRef.current.value
        setNameEdit(false)
        setOnNameSubmitting(true)
        if(user.displayName != name){
          updateUserProfile( name, user?.photoURL)
          .then(result=>{
            toast.success('Successfully uploaded!')
          })
          .catch(error=>{
            toast.success( error.code|| 'Something went wrong!')
          })
        }
        setOnNameSubmitting(false)
      }

  return (
    <div className="bg-deepPink h-full overflow-hidden">
      <ToastContainer position="top-left" reverseOrder={false} />
      <div className="p-4 flex items-center gap-3 bg-deepPink sticky top-0 w-full justify-between">
        <div className="text-lg font-medium">User info</div>
        <div className="cursor-pointer default-btn" onClick={() => setMyProfile(false)}>
          <IoClose size={26} />
        </div>
      </div>
      <div className="overflow-y-auto myProfile-des h-[calc(100%-64px)]">
        <div className="py-10 px-4 border-b border-neutral-800">
          <div className="flex justify-center flex-col items-center w-full">
            <div className="size-52 rounded-full overflow-hidden group relative">
              {!onImgSubmitting ? (
                <>
                  <input onChange={handleImageChange} name="image" className="absolute z-10 top-0 left-0 opacity-0 size-full rounded-full cursor-pointer" type="file" required />
                  <div className="absolute size-full rounded-full bg-white bg-opacity-0 opacity-0 group-hover:bg-opacity-30 group-hover:opacity-100 flex justify-center items-center duration-100 cursor-pointer">
                    <IoCamera color="white" size={50} />
                  </div>
                </>
              ) : (
                <div className="absolute size-full top-0 left-0 flex justify-center items-center">
                  <BounceLoader size={50} color="#6d28d9" />
                </div>
              )}
              <LazyLoadImage className="size-full object-cover" src={previewImage || userMan} alt={user.displayName} />
            </div>
            <div className="mt-5 text-neutral-400">{user.email}</div>
          </div>
          <div className="mt-6 text-small mb-2">Your Name</div>
          <div>
            <div className={`${nameEdit && "border-b"} w-full flex gap-1 py-1`}>
              <input maxLength={25} minLength={6} ref={nameRef} className="bg-deepPink outline-none flex-grow " readOnly={!nameEdit} type="text" defaultValue={user?.displayName} />
                {nameEdit ? <div className="cursor-pointer h-min default-btn w-min default-btn active:text-neutral-400 duration-100" onClick={ handleNameChange}><ImCheckmark size={15} /></div> : <div onClick={()=>{if(!onNameSubmitting){setNameEdit(true)}}} className="cursor-pointer h-min default-btn w-min default-btn active:text-neutral-400 duration-100"><TbEdit size={20} /></div>}
            </div>
          </div>
          <div className="mt-10 text-small mb-2">About</div>
          <div>
            <div className={`${aboutEdit && "border-b"} w-full flex gap-1 py-1`}>
              <textarea
                className="bg-deepPink outline-none flex-grow resize-none overflow-hidden"
                readOnly={!aboutEdit}
                type="text"
                defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, minus!"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                rows={1}
                ref={textAreaRef}
              />
              <div className="cursor-pointer h-min default-btn w-min active:text-neutral-400 duration-100" onClick={() => setAboutEdit(!aboutEdit)}>
                {aboutEdit ? <ImCheckmark size={15} /> : <TbEdit size={20} />}
              </div>
            </div>
          </div>
        </div>
        <div className="py-10 px-4 flex flex-col gap-3">
          <Link to="/forget-password" className="text-amber-500 flex items-center gap-2 cursor-pointer">
            <MdLockReset size={20} />
            Reset password
          </Link>
          <div onClick={handleLogOut} className="text-amber-500 flex items-center gap-2 cursor-pointer">
            <CgLogOut size={20} />
            Log out
          </div>
          <div onClick={handleDeleteUser} className="text-red-500 flex items-center gap-2 cursor-pointer">
            <MdDelete size={20} />
            Delete account
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
