
const Login = () => {
  return (
    <div className="bg-deepPink h-screen w-screen grid place-content-center">
      <div className="backdrop-blur-sm bg-white/5 py-10 px-16 border-2 border-neutral-500/70 rounded-md">
          <form>
            <div className="text-center text-2xl mb-6">Login</div>
            <div>
              <input className="w-80 bg-transparent focus:bg-deepPink outline-none border-2 border-neutral-500/70 rounded-md py-2 px-3" type="text" placeholder="Your Email" />
            </div>
            <div className="mt-4">
              <input className="w-80 bg-transparent focus:bg-deepPink outline-none border-2 border-neutral-500/70 rounded-md py-2 px-3" type="password" placeholder="Your Password" />
            </div>
            <div className="mt-4">
              <button type="submit" className="flex justify-center w-full bg-deepPink py-2 rounded-md active:scale-[0.98]">
                Login
              </button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default Login;
