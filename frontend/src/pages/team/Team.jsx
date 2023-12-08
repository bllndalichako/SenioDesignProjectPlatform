import Member from "../../components/member/Member";
import "./Team.scss";
import { singleProject } from "../../data";

const Team = () => {
  return (
    <div className="project">
      <h1>Project Details</h1>
      <div className="details">
        <div className="item">
          <span className="itemTitle">Name: </span>
          <span className="itemValue">{singleProject.title}</span>
        </div>

        <div className="item">
          <span className="itemTitle">Description: </span>
          <span className="itemValue">{singleProject.description}</span>
        </div>

        <div className="item">
          <span className="itemTitle">Technology Stack: </span>
          <span className="itemValue">{singleProject.technologyStack}</span>
        </div>

        <div className="item">
          <span className="itemTitle">Frameworks: </span>
          <span className="itemValue">{singleProject.frameworks}</span>
        </div>
      </div>

      <div className="personnel">
        <h1>Project Personnel</h1>
        <div className="personnelList">
          {singleProject.members.map((member) => (
            <div className="personnelListItem" key={member.id}>
              <Member {...member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
