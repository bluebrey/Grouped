import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    email: "",
    school: "",
  });

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    setIsLoaded(false);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user.php`, {
        params: {
          email: sessionStorage.getItem("email"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserInfo({
          firstname: response.data.firstName ? response.data.firstName : "",
          lastname: response.data.lastName ? response.data.lastName : "",
          bio: response.data.bio ? response.data.bio : "",
          email: response.data.email ? response.data.email : "",
          school: response.data.school ? response.data.school : "",
        });
      })
      .catch((error) => console.error(error));
    setIsLoaded(true);
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center">Loading...</div>;
  } else {
    return (
      <div className="flex items-center justify-center flex-col bg-slate-300">
        <h1 className="text-4xl font-extrabold mb-5">Profile</h1>
        {/* User Fields */}
        <div className="bg-slate-400/30 p-8 rounded-lg flex flex-col w-72">
          {/* First Name */}
          <div className="mb-4 flex flex-col">
            <label className="" htmlFor="firstname">
              First Name:
            </label>
            <input
              className="rounded-md w-full px-1 bg-slate-100"
              id="firstname"
              type="text"
              value={userInfo.firstname}
              readOnly
            />
          </div>
          {/* Last Name */}
          <div className="mb-4 flex flex-col">
            <label className="" htmlFor="lastname">
              Last Name:
            </label>
            <input
              className="rounded-md w-full px-1 bg-slate-100"
              id="lastname"
              type="text"
              defaultValue={userInfo.lastname}
              readOnly
            />
          </div>
          {/* Bio */}
          <div className="mb-4 flex flex-col">
            <label className="" htmlFor="bio">
              Bio:
            </label>
            <textarea
              className="rounded-md px-1 bg-slate-100"
              id="bio"
              defaultValue={userInfo.bio}
              readOnly
            />
          </div>
          {/* Email */}
          <div className="mb-4 flex flex-col">
            <label className="" htmlFor="email">
              Email:
            </label>
            <input
              className="rounded-md w-full px-1 bg-slate-100"
              id="email"
              type="text"
              defaultValue={userInfo.email}
              readOnly
            />
          </div>
          {/* School */}
          <div className="mb-4 flex flex-col" htmlFor="school">
            <label className="">School:</label>
            <input
              className="rounded-md w-full px-1 bg-slate-100"
              id="school"
              type="text"
              defaultValue={userInfo.school}
              readOnly
            />
          </div>
        </div>
      </div>
    );
  }


};

export default Profile;
