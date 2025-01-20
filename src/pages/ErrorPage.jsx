import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../assets/image/zapchatlogowithtext.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="grid place-items-center h-screen text-neutral-800 bg-white">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-medium text-red-600 mb-6">404 page is not found</div>
        <Link to="/" className="w-24">
          <LazyLoadImage src={logo} />
        </Link>
        <Link to="/" className="hover:text-mediumPink default-btn underline text-deepPink font-medium">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
