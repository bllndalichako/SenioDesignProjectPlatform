import { Avatar } from "@mui/material";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import {toast} from "react-toastify";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      await logout();
      navigate("/login");
      toast.success("User logged out successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profile">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <Avatar
              className="profile-img"
              sx={{ bgcolor: "white", fontSize: "4.5rem", color: "#2a3447" }}
            >
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </Avatar>
            <div className="identifiers">
              <h1>
                {user.firstName} {user.lastName}
              </h1>
              <div className="role">
                <span className="role">{ user.accessType.charAt(0).toUpperCase() + user.accessType.slice(1) }</span>
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