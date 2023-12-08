// import { deepOrange } from '@mui/material/colors';
import { useState } from "react";
// import { Avatar } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Avatar from "@mui/material/Avatar";
// import "./profile.scss";
// import axios from "axios";
// import { deepOrange } from '@mui/material/colors';
// import { useLogoutMutation } from "../../slices/usersApiSlice";
// import { logout } from "../../slices/authSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [user, setUser] = useState({});

  const handleLogout = async () => {
    // try {
    //   await logoutApiCall(null).unwrap();
    //   dispatch(logout(null));
    //   navigate("/login");
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    <div className="profile">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {/* <Avatar
              className="profile-img"
              sx={{ bgcolor: deepOrange[300], fontSize: "4.5rem" }}
            > */}
              {"Beatrice".charAt(0)}
              {"Laurent".charAt(0)}
            {/* </Avatar> */}
            <div className="identifiers">
              <h1>
                Beatrice Laurent
              </h1>
              <div className="role">
                <span className="role">Student</span>
              </div>
            </div>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="details">
            <div className="item">
              <span className="itemTitle">Email: </span>
              <span className="itemValue">{user.email}</span>
            </div>

            <div className="item">
              <span className="itemTitle">Skills: </span>
              {user.skills &&
                user.skills.map((skill) => (
                  <span className="itemValue">{skill}, </span>
                ))}
            </div>

            <div className="item">
              <span className="itemTitle">Team: </span>
              <span className="itemValue">John Doe team</span>
            </div>

            <div className="item">
              <span className="itemTitle">Project Idea: </span>
              <span className="itemValue">
                An app that tracks parking spots availability
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Profile