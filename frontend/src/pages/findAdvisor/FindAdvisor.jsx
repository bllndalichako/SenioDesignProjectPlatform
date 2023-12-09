import "./findAdvisor.scss";

// import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import { userRows } from "../../data";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const FindAdvisor = () => {
  // const columns = [
  //   {
  //     field: "specialization",
  //     type: "string",
  //     headerName: "Specialization",
  //     width: 200,
  //     sortable: false,
  //     hideable: false,
  //   },
  // ];

  const [advisors, setAdvisors] = useState([]);

  const addIdField = (advisors) => {
    advisors.forEach((advisor) => {
      advisor.id = advisor._id;
    });
  }

  useEffect(() => {
    const getAdvisors = async () => {
      try {
        const advisorsRes = await axios.get("http://localhost:5555/api/get-advisors");

        if (advisorsRes.status === 200) {
          console.log("Advisors: ", advisorsRes.data.advisors);
          setAdvisors(advisorsRes.data.advisors);
          addIdField(advisorsRes.data.advisors);
        } else {
          toast.info(advisorsRes.data.message)
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getAdvisors();
  } , []);

  return (
    <div className="advisors">
      <div className="header">
        <h1>Find an Advisor</h1>
      </div>
      <DataTable
        usersPage="users"
        teamsPage="teams"
        // columns={columns}
        rows={advisors ? [...advisors] : []}
        // rows={userRows}
      />
    </div>
  );
};

export default FindAdvisor;
