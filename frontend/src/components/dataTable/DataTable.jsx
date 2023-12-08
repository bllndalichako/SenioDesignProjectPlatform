
import "./DataTable.scss";
import { Link } from "react-router-dom";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// type Props = {
//   columns: GridColDef[];
//   rows: object[];
//   usersPage: string;
//   teamsPage: string;
// };

const DataTable = (props) => {
  const sendRequestEmail = (to) => {
    //send email to user with id in args
  };

  const profileColumn = {
    field: "img",
    headerName: "Profile",
    sortable: false,
    resizable: false,
    width: 100,
    hideable: false,
    filterable: false,

    // TODO: Replace delete icon with message icon
    // TODO: Render a random avatar if no image is provided
    renderCell: (params) => {
      return (
        <div className="profile">
          <Link to={`/${props.usersPage}/${params.row.id}`}>
            <img src={params.row.img || "/noavatar.png"} alt="" />
          </Link>
        </div>
      );
    },
  };

  const firstNameColumn = {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
    hideable: false,

    // TODO: Replace delete icon with message icon
    // TODO: Render a random avatar if no image is provided
    renderCell: (params) => {
      return (
        <div className="firstName">
          {params.row.firstName}
        </div>
      );
    },
  };

  const lastNameColumn = {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
    hideable: false,

    // TODO: Replace delete icon with message icon
    // TODO: Render a random avatar if no image is provided
    renderCell: (params) => {
      return (
        <div className="lastName">
          {params.row.lastName}
        </div>
      );
    },
  };

  const projectIdeasColumn = {
      field: "projectIdeas",
      type: "string", // TODO: Change to int
      headerName: "Project Ideas",
      width: 150,
      sortable: false,
      hideable: false,
  };

  const requestColumn = {
    field: "request",
    headerName: "Request",
    sortable: false,
    resizable: false,
    width: 150,
    hideable: false,
    filterable: false,

    // TODO: Replace delete icon with message icon
    // TODO: Render a random avatar if no image is provided
    // TODO: Align center the icon
    renderCell: (params) => {
      return (
        <div
          className="request"
          onClick={() => sendRequestEmail(params.row.id)}
        >
          <img src="/paperPlane.svg" alt="" />
        </div>
      );
    },
  };
  // TODO: Remove selector in first column
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[profileColumn, firstNameColumn, lastNameColumn, ...props.columns, projectIdeasColumn, requestColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0, // Specifies the page number that should be displayed
              pageSize: 10, // Defines how many rows should be displayed on one page
            },
          },
        }}
        slots={{ toolbar: GridToolbar }} // Toolbar above the grid with tools like filter and search
        slotProps={{
          toolbar: {
            showQuickFilter: true, // Filters results as you type in search bar
            quickFilterProps: { debounceMs: 500 }, // Defines the delay in milliseconds before the filter is applied.
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
}

export default DataTable