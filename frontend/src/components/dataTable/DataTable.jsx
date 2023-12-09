
import "./DataTable.scss";
import { Link } from "react-router-dom";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

// type Props = {
//   columns: GridColDef[];
//   rows: object[];
//   usersPage: string;
//   teamsPage: string;
// };

const DataTable = (props) => {
  const { user } = useAuth();

  const requestAdvisor = async (advisorInfo) => {
    try {
      const requestAdvisorRes = await axios.post("http://localhost:5555/api/request-advisor", {
        student: user,
        advisor: advisorInfo,
      });

      if (requestAdvisorRes.status === 200) {
        toast.success(requestAdvisorRes.data.message);
      } else {
        toast.error(requestAdvisorRes.data.message);
      }
      console.log("Requesting advisor: ", advisorInfo);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRequest = (advisorInfo) => {
    if (!user.team) {
      toast.error("Must form a team before requesting an advisor.");
      return;
    }

    if (!user.isProjectLead) {
      toast.error("Must be project lead to request an advisor.");
      return;
    }

    if (user.team?.advisor) {
      toast.error("Team already has an advisor: ", user.team.advisor.firstName, " ", user.team.advisor.lastName);
      return;
    }

    requestAdvisor(advisorInfo);
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
      field: "proposedProject",
      type: "string", // TODO: Change to int
      headerName: "Project Idea",
      width: 150,
      sortable: false,
      hideable: false,
  };

  const specializationColumn = {
    field: "specialization",
    type: "string",
    headerName: "Specialization",
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

    renderCell: (params) => {
      return (
        <div
          className="request"
          onClick={() => handleRequest(params.row)}
        >
          <img src="/paperPlane.svg" alt="" />
        </div>
      );
    },
  };

  // TODO: Link to user profile on click
  // TODO: Display initials on profile picture
  // TODO: Popup modal and send request email on click
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[profileColumn, firstNameColumn, lastNameColumn, projectIdeasColumn, specializationColumn, requestColumn]}
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
        // checkboxSelection
        disableRowSelectionOnClick
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
}

export default DataTable