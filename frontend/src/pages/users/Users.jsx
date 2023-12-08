import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { userRows } from "../../data";

const Users = () => {
  const columns = [
    {
      field: "skills",
      type: "string",
      headerName: "Skills",
      width: 200,
      sortable: false,
      hideable: false,
    },

    {
      field: "teammatesMatches",
      type: "string", // TODO: Change to int
      headerName: "Matched teammates",
      width: 150,
      sortable: false,
      hideable: false,
    },
  ];

  return (
    <div className="users">
      <div className="info">
        <h1>Find Teammates</h1>
      </div>
      <DataTable
        usersPage="users"
        teamsPage="teams"
        columns={columns}
        rows={userRows}
      />
    </div>
  );
};

export default Users;
