import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../assets/image/zapchatlogo.png";
import { useContext, useEffect, useState } from "react";
import { TbEyeClosed } from "react-icons/tb";
import { LuEye } from "react-icons/lu";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthProvider";
import { BounceLoader } from "react-spinners";

const Login = () => {
  const { signInUser, user, sigInGoogle } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [onSubmitting, setOnSubmitting] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.pathname || '/';
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
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
      }
    }, [user, navigate, onSubmitting]);

  const onSubmit = (data) => {
    setOnSubmitting(true)
    signInUser(data.email, data.password)
      .then((result) => {
        reset()
        navigate(from, {replace:true});
        Swal.fire({
          title: "Login successfully!",
          icon: "success",
          background: "#ede9fe",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        setOnSubmitting(false)
        Swal.fire({
          title: error.code || 'Something went wrong',
          icon: "error",
          background: "#ede9fe",
          confirmButtonColor: "#6d28d9",
        });
      });
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <LazyLoadImage className="w-32" src={logo} alt="logo" />
          </div>
          <div className="text-center text-2xl mb-2">Login</div>
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
                {...register("password", { required: true })}
                name="password"
                className="w-80 bg-transparent focus:bg-deepPink outline-none border-2 border-neutral-500/70 rounded-md py-2 px-3"
                type={showPass ? "text" : "password"}
                placeholder="Your Password"
              />
              <div onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {!showPass ? <LuEye size={20} /> : <TbEyeClosed size={20} />}
              </div>
            </div>
            {errors.password && <div className="text-sm text-amber-600 pt-1">Password is required</div>}
          </div>
          <div className="">
            <button type="submit" className={` active:scale-[0.98] flex justify-center w-full bg-deepPink py-2 rounded-md`}>
              {onSubmitting ? <BounceLoader size={24} color="#6d28d9" /> : 'Login'}
            </button>
          </div>
          <div className="text-center">
            <div className="">
              New here?{" "}
              <Link className="text-blue-600 hover:underline" to="/register">
                Create a account
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
  );
};

export default Login;
