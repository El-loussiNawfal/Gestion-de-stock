import { Link } from "react-router-dom";
import TableWithSearch from "../../components/TableWithSearch";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import { getNotes } from "./data"; // Import the function to fetch notes



const columns = [
  { name: "Note Body", accessor: "body" }, // Adjust the column to display the note body
];

function NotesList() {
  const { data, isLoading, error } = useQuery("notes", getNotes);

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <Layout>
      <Header
        preTitle="Overview"
        title="Notes"
        action={() => (
          <Link to="/notes/create" className="btn btn-primary lift">
            New Note
          </Link>
        )}
      />

      <TableWithSearch
        data={data}
        columns={columns}
        editURL={(row) => "/notes/" + row.id + "/edit"} // Adjust the edit URL
      />
    </Layout>
  );
}

export default NotesList;
