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

const Register = () => {
  const { createUser, user, updateUserProfile, sigInGoogle } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [onSubmitting, setOnSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  useEffect(() => {
    if (user && !onSubmitting) {
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

  const onSubmit = (data) => {
    setOnSubmitting(true);
    const captcha = data.captcha;
    if (validateCaptcha(captcha)) {
      createUser(data.email, data.password)
        .then((result) => {
          updateUserProfile(data.name, null)
            .then(() => {
              reset();
              navigate("/");
              Swal.fire({
                title: "Registered successfully!",
                icon: "success",
                background: "#ede9fe",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              reset();
              navigate("/");
              Swal.fire({
                title: "Registered successfully!",
                icon: "success",
                background: "#ede9fe",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        })
        .catch((error) => {
          console.log(error);
          setOnSubmitting(false);
          Swal.fire({
            title: "error",
            text: error.code || "something went wrong",
            icon: "error",
            background: "#ede9fe",
            confirmButtonColor: "#6d28d9",
          });
        });
    } else {
      setError("captcha", {
        type: "manual",
        message: "Invalid captcha",
      });
      setOnSubmitting(false);
    }
  };


  const handleGoogle = () =>{
      setOnSubmitting(true)
      sigInGoogle()
      .then((result) =>{
        navigate('/')
        Swal.fire({
          title: "Login successfully!",
          icon: "success",
          background: "#ede9fe",
          showConfirmButton: false,
          timer: 1500,
        });
       })
      .catch(error=>{
        Swal.fire({
          title: error.code || "Something went wrong",
          icon: "error",
          background: "#ede9fe",
          confirmButtonColor: "#6d28d9",
        });
        setOnSubmitting(false)})
    }


  return (
    <div className="bg-deepPink h-screen w-screen grid place-content-center">
      <div className="backdrop-blur-sm bg-white/5 py-10 px-16 border-2 border-neutral-500/70 rounded-md">
        <div className="grid grid-cols-2">
          <div className="text-center flex flex-col justify-center items-center">
            <div className="flex justify-center mb-6">
              <LazyLoadImage className="w-44" src={logo} />
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
              <div onClick={handleGoogle} className="flex items-center justify-center w-full border-2 border-neutral-500/70 rounded-md py-2.5 px-3 cursor-pointer gap-3 bg-deepPink hover:bg-mediumPink active:scale-[.98] duration-100">
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
