import "./Requests.scss";
import { singleProject } from "../../data";
import Member from "../../components/member/Member";

const Requests = () => {
  return (
    <div className="requests">
      <h1>Received Requests</h1>
      <div className="requestsList">
        {singleProject.members.map((member) => (
          <div className="requestListItem" key={member.id}>
            <Member {...member} />
            <div className="response">
              <img src="/greenCheck.svg" alt="" className="icon" />
              <img src="/cross.svg" alt="" className="icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
