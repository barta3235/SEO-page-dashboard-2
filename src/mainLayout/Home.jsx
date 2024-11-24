import axios from "axios";
import { useEffect, useState } from "react";
import Middle from "../components/Middle";
import Header from "../components/Header";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [columnOrder, setColumnOrder] = useState([
    { key: "name", label: "Name" },
    { key: "projectLink", label: "Project Link" },
    { key: "projectId", label: "Project Id" },
    { key: "projectBudget", label: "Project Budget" },
    { key: "bidValue", label: "Bid Value" },
    { key: "created", label: "Created" },
    { key: "createdBy", label: "Created By" },
    { key: "biddingDelayTime", label: "Bidding Delay Time" },
    { key: "status", label: "Status" },
    { key: "dealStatus", label: "Deal Status" },
    { key: "action", label: "Action" },
  ]);

  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    projectLink: true,
    projectId: true,
    projectBudget: true,
    bidValue: true,
    created: true,
    createdBy: true,
    biddingDelayTime: true,
    status: true,
    dealStatus: true,
    action: true,
  });

  const toggleColumnVisibility = (column) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column], // Toggle the column's visibility
    }));
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Allow the drop
  };

  const handleDrop = (event, targetIndex) => {
    const sourceIndex = event.dataTransfer.getData("text/plain");

    const newColumnOrder = [...columnOrder];
    const [movedColumn] = newColumnOrder.splice(sourceIndex, 1);
    newColumnOrder.splice(targetIndex, 0, movedColumn);

    setColumnOrder(newColumnOrder);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://erp.seopage1.net/api/leads");
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(data)

  // Pagination logic
  const totalEntries = data.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div>
      <Header
        columnVisibility={columnVisibility}
        toggleColumnVisibility={toggleColumnVisibility}
      ></Header>

      <div className="overflow-x-auto p-4">
        <table className="table overflow-x-scroll w-full">
          {/* Head */}
          <thead className="text-center text-[14px]">
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              {columnOrder.map((column, index) =>
                columnVisibility[column.key] ? (
                  <th
                    key={column.key}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className="cursor-move"
                  >
                    {column.label}
                  </th>
                ) : null
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((eachData, idx) => (
              <Middle
                key={idx}
                data={eachData}
                columnVisibility={columnVisibility}
                columnOrder={columnOrder}
              ></Middle>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col mt-[10px] md:flex-row justify-between items-center">
          {/* Entries proti page */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <label htmlFor="entriesPerPage" className="mr-2">
                Show
              </label>
              <select
                id="entriesPerPage"
                value={entriesPerPage}
                onChange={handleEntriesPerPageChange}
                className="border rounded px-2 py-1"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="ml-5">
              Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
            </div>
          </div>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex items-center">
              {Array.from(
                { length: Math.min(5, totalPages) },
                (_, i) => currentPage - 2 + i
              )
                .filter((page) => page > 0 && page <= totalPages)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 mx-1 rounded ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
