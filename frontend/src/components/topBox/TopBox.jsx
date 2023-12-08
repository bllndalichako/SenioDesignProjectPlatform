import "./topBox.scss"
import {topDealUsers} from "../../data.jsx"

const TopBox = () => {
  return (
    <div className="topBox">
      <h1>Team Members</h1>
      <div className="list">
        {topDealUsers.map(user=>(
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox