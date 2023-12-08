import "./findAdvisor.scss";

// import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import { userRows } from "../../data";

const FindAdvisor = () => {
  const columns = [
    {
      field: "specialization",
      type: "string",
      headerName: "Specialization",
      width: 200,
      sortable: false,
      hideable: false,
    },
  ];

  return (
    <div className="advisors">
      <div className="header">
        <h1>Find an Advisor</h1>
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

export default FindAdvisor;
