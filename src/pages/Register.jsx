import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../assets/image/zapchatlogo.png";
import { useContext, useEffect, useState } from "react";
import { TbEyeClosed } from "react-icons/tb";
import { LuEye } from "react-icons/lu";
import Swal from "sweetalert2";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthProvider";
import { BounceLoader } from "react-spinners";
import { sendEmailVerification } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, user, updateUserProfile, sigInGoogle } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [onSubmitting, setOnSubmitting] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  useEffect(() => {
    if (user && !onSubmitting && user.emailVerified) {
      Swal.fire({
        title: "You must logout first",
        icon: "warning",
        confirmButtonColor: "#6d28d9",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        background: "#ede9fe",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } else {
      loadCaptchaEnginge(6);
    }
  }, [user, navigate, onSubmitting]);

  const onSubmit = async (data) => {
    try {
      setOnSubmitting(true);
  
      if (!validateCaptcha(data.captcha)) {
        setError("captcha", {
          type: "manual",
          message: "Invalid captcha",
        });
        setOnSubmitting(false);
        return;
      }
  
      // Create user account
      const result = await createUser(data.email, data.password);
      await sendEmailVerification(result.user);
      await updateUserProfile(data.name, null);
  
      // Save user info in the database
      const userInfo = {
        photoUrl: null,
        userId: result.user.uid,
        name: data.name,
        email: data.email,
        status: "active",
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        friends: [],
        request: [],
        sent: [],
      };
  
      await axiosPublic.post("/users", userInfo);
  
      // Reset form and navigate
      reset();
      navigate("/");
      
      Swal.fire({
        title: "Registered successfully!",
        icon: "success",
        background: "#ede9fe",
        showConfirmButton: false,
        timer: 1500,
      });
  
    } catch (error) {
      console.error(error);
      setOnSubmitting(false);
  
      Swal.fire({
        title: "Error",
        text: error.code || "Something went wrong",
        icon: "error",
        background: "#ede9fe",
        confirmButtonColor: "#6d28d9",
      });
    }
  };
  

  const handleGoogle = async () => {
    try {
      setOnSubmitting(true);
  
      const result = await sigInGoogle();
      const user = result.user;
  
      // Prepare user info
      const userInfo = {
        photoUrl: user.photoURL,
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        status: "active",
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        friends: [],
        request: [],
        sent: [],
      };
  
      // Save user info in the database
      await axiosPublic.post("/users", userInfo);
  
      // Navigate and show success message
      navigate("/");
      Swal.fire({
        title: "Login successfully!",
        icon: "success",
        background: "#ede9fe",
        showConfirmButton: false,
        timer: 1500,
      });
  
    } catch (error) {
      console.error(error);
      setOnSubmitting(false);
  
      Swal.fire({
        title: error.code || "Something went wrong",
        icon: "error",
        background: "#ede9fe",
        confirmButtonColor: "#6d28d9",
      });
    }
  };
  

  return (
    <div className="bg-deepPink sm:h-screen w-screen grid place-content-center">
      <div className="backdrop-blur-sm bg-white/5 py-10 sm:px-16 px-3 sm:my-0 my-6 border-2 border-neutral-500/70 rounded-md">
        <div className="grid sm:grid-cols-2">
          <div className="text-center flex flex-col justify-center items-center sm:mb-0 mb-6">
            <div className="flex justify-center sm:mb-6">
              <LazyLoadImage className="sm:w-44 w-32" src={logo} />
            </div>
            <div className="font-light mb-2">Welcome to</div>
            <div className="roboto font-semibold text-4xl">ZapChat</div>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center text-2xl mb-2">Register</div>
            <div>
              <input
                {...register("name", { required: true, minLength: 6, maxLength: 20 })}
                name="name"
                className="w-80 bg-transparent focus:bg-deepPink outline-none border-2 border-neutral-500/70 rounded-md py-2 px-3"
                type="text"
                placeholder="Your Name"
              />
              {errors.name && errors.name.type == "required" && <div className="text-sm text-amber-600 pt-1">Name is required</div>}
              {errors.name && errors.name.type !== "required" && <div className="text-sm text-amber-600 pt-1">Name must be between 6 to 20 characters</div>}
            </div>
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
              <div className="relative">
                <input
                  {...register("password", { required: true, minLength: 6, maxLength: 20 })}
                  name="password"
                  className="w-80 bg-transparent focus:bg-deepPink outline-none border-2 border-neutral-500/70 rounded-md py-2 px-3"
                  type={showPass ? "text" : "password"}
                  placeholder="Your Password"
                />
                <div onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {!showPass ? <LuEye size={20} /> : <TbEyeClosed size={20} />}
                </div>
              </div>
              {errors.password && errors.password.type == "required" && <div className="text-sm text-amber-600 pt-1">Password is required</div>}
              {errors.password && errors.password.type !== "required" && <div className="text-sm text-amber-600 pt-1">Password must be between 6 to 20 characters</div>}
            </div>
            <div className="">
              <div className="captcha mb-2">
                <LoadCanvasTemplate />
              </div>
              <input
                {...register("captcha", { required: true })}
                className="w-80 bg-transparent focus:bg-deepPink outline-none border-2 border-neutral-500/70 rounded-md py-2 px-3"
                type="text"
                placeholder="Type Captcha"
              />
              {errors.captcha && errors.captcha.type !== "manual" && <div className="text-sm text-amber-600 pt-1">Captcha is required</div>}
              {errors.captcha && errors.captcha.type == "manual" && <div className="text-sm text-amber-600 pt-1">Invalid captcha</div>}
            </div>
            <div className="">
              <button type="submit" className={`active:scale-[0.98] flex justify-center w-full bg-deepPink py-2 rounded-md`}>
                {onSubmitting ? <BounceLoader size={24} color="#6d28d9" /> : "Register"}
              </button>
            </div>
            <div className="text-center">
              <div className="">
                Already have an account?{" "}
                <Link className="text-blue-600 hover:underline" to="/login">
                  Login
                </Link>
              </div>
              <div className="mb-2">or</div>
              <div
                onClick={handleGoogle}
                className="flex items-center justify-center w-full border-2 border-neutral-500/70 rounded-md py-2.5 px-3 cursor-pointer gap-3 bg-deepPink hover:bg-mediumPink active:scale-[.98] duration-100"
              >
                <FcGoogle size={20} />
                <div>Sign in with Google</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
