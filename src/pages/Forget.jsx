import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../assets/image/zapchatlogo.png";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthProvider";
import { BounceLoader } from "react-spinners";

const Forget = () => {
  const {resetPassword } = useContext(AuthContext);
  const [onSubmitting, setOnSubmitting] = useState(false)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();


  const onSubmit = (data) => {
    setOnSubmitting(true)
    resetPassword(data.email)
    .then(() => {
            Swal.fire({
              title: "Check your email and reset password!",
              icon: "success",
              background: "#ede9fe",
              showConfirmButton: false,
              timer: 1500,
            });
            reset()
            navigate('/')
            setOnSubmitting(false);
          })
          .catch((error) => {
            console.log(error);
            setOnSubmitting(false);
            Swal.fire({
              title: error.code || "Something went wrong",
              icon: "error",
              background: "#ede9fe",
              showConfirmButton: false,
              timer: 1500,
            });
          });
  };


  return (
    <div className="bg-deepPink h-screen w-screen grid place-content-center">
      <div className="backdrop-blur-sm bg-white/5 py-10 px-16 border-2 border-neutral-500/70 rounded-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <LazyLoadImage className="w-32" src={logo} alt="logo" />
          </div>
          <div className="text-center text-2xl mb-2">Forget Password</div>
          <div className="">
            <input
              {...register("email", {
                required: true,
              })}
              name="email"
              className="w-80 bg-transparent focus:bg-deepPink outline-none border-2 border-neutral-500/70 rounded-md py-2 px-3"
              type="email"
              placeholder="Your Email"
            />
            {errors.email && <div className="text-sm text-amber-600 pt-1">Email is required</div>}
          </div>
          <div className="">
            <button type="submit" className={` active:scale-[0.98] flex justify-center w-full bg-deepPink py-2 rounded-md`}>
              {onSubmitting ? <BounceLoader size={24} color="#6d28d9" /> : 'Send Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forget;
