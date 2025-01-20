import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../assets/image/zapchatlogo.png";

const Register = () => {
  return (
    <div className="bg-deepPink h-screen w-screen grid place-content-center">
      <div className="backdrop-blur-sm bg-white/5 py-10 px-16 border-2 border-neutral-500/70 rounded-md">
        <div className="grid grid-cols-2">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <LazyLoadImage className="w-44" src={logo} />
            </div>
            <div className="font-light mb-2">Welcome to</div>
            <div className="roboto font-semibold text-4xl">ZapChat</div>
          </div>
          <form>
            <div className="text-center text-2xl mb-6">Register</div>
            <div>
              <input className="w-80 bg-transparent focus:bg-deepPink outline-none border-2 border-neutral-500/70 rounded-md py-2 px-3" type="text" placeholder="Your Name" />
            </div>
            <div className="mt-4">
              <input className="w-80 bg-transparent focus:bg-deepPink outline-none border-2 border-neutral-500/70 rounded-md py-2 px-3" type="email" placeholder="Your Email" />
            </div>
            <div className="mt-4">
              <input className="w-80 bg-transparent focus:bg-deepPink outline-none border-2 border-neutral-500/70 rounded-md py-2 px-3" type="password" placeholder="Your Password" />
            </div>
            <div className="mt-4">
              <button type="submit" className="flex uppercase justify-center w-full bg-deepPink py-2 rounded-md active:scale-[0.98]">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
