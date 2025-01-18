import logo from '../assets/image/zapchatlogowithtext.png';
const Welcome = () => {
    return (
        <div className="flex-grow bg-lightPink h-screen grid place-items-center">
            <div><img className='w-72' src={logo} alt="logo" /></div>
        </div>
    );
};

export default Welcome;