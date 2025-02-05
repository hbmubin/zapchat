import { useContext, useState } from "react";
import logo from "../assets/image/zapchatlogo.png";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Swal from "sweetalert2";
import { BounceLoader } from "react-spinners";
const VerifyEmail = () => {
  const { user } = useContext(AuthContext);
  const [onSubmitting, setOnSubmitting] = useState(false);

    if (user?.emailVerified) {
      return <Navigate to='/' replace />
    }

  const resendVerificationEmail = () => {
    setOnSubmitting(true);
    sendEmailVerification(user)
      .then(() => {
        Swal.fire({
          title: "Email sent successfully!",
          icon: "success",
          background: "#ede9fe",
          showConfirmButton: false,
          timer: 1500,
        });
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
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <div className="mb-6">
        <img className="w-40" src={logo} alt="logo" />
      </div>
      <div className="text-xl text-amber-600 font-semibold mb-4">Please check your email and verify</div>
      <div className="text-sm text-gray-500 mb-4">Didn&#39;t receive the email? You can try refreshing or requesting a new verification link.</div>
      <div className="flex flex-col items-center space-y-3">
        <button onClick={() => window.location.reload()} className="default-btn text-white px-4 py-1 rounded bg-indigo-600 hover:bg-indigo-700 font-semibold duration-100">
          Refresh
        </button>
        <span className="text-gray-400">or</span>
        <button onClick={resendVerificationEmail} className="text-indigo-600 hover:text-indigo-800 font-medium default-btn">
        {onSubmitting ? <BounceLoader size={24} color="#6d28d9" /> : "Resend Email"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
