import { FaInstagram, FaTwitter } from "react-icons/fa";
import johnImage from "../../assets/ismail-profile.jpg";

const Profile = () => {
  const userData = {
    name: "ismail",
    email: "ismail@example.com",
    phone: "9949722501",
    address: "Hyderabad Telangana",
    dateOfBirth: "march 3, 2000",
    occupation: "Software Engineer",
    socialMedia: {
      linkedin: "https://www.linkedin.com",
      twitter: "https://x.com/impossible_br03",
    },
    profilePicture: johnImage,
  };



  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="bg-white-400 border border-gray-300 rounded-lg w-full lg:max-w-4xl sm:max-w-xl p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <img
            src={userData.profilePicture}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-green-400 object-cover shadow-lg"
          />
          <h2 className="text-3xl font-bold text-green-600 mt-4">
            {userData.name}
          </h2>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Email */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-medium text-green-600">Email</h3>
            <p className="text-gray-700 mt-2">{userData.email}</p>
          </div>
          {/* Phone */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-medium text-green-600">Phone</h3>
            <p className="text-gray-700 mt-2">{userData.phone}</p>
          </div>
          {/* Address */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-medium text-green-600">Address</h3>
            <p className="text-gray-700 mt-2">{userData.address}</p>
          </div>
          {/* Date of Birth */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-medium text-green-600">
              Date of Birth
            </h3>
            <p className="text-gray-700 mt-2">{userData.dateOfBirth}</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-gray-100 rounded-lg p-6 shadow-md mt-6">
          <h3 className="text-lg font-medium text-green-600">Social Media</h3>
          <div className="flex items-center gap-4 mt-3">
            <a href={userData.socialMedia.linkedin} target="_blank" className="text-xl cursor-pointer text-grayForPageHeading" ><FaInstagram /></a>
            <a href={userData.socialMedia.twitter} target="_blank" className="text-xl cursor-pointer text-grayForPageHeading" ><FaTwitter /></a>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-green-400 hover:bg-green-600 text-white-400 px-8 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;