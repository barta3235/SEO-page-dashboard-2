import { CiMenuKebab } from "react-icons/ci";

const Middle = ({ data, columnOrder, columnVisibility }) => {
  return (
    <tr className="text-center">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      {columnOrder.map(
        (column, index) =>
          columnVisibility[column.key] && (
            <td key={index}>
              {renderColumnData(column.key, data)}
            </td>
          )
      )}
    </tr>
  );
};

// Helper function to handle column-specific rendering
const renderColumnData = (key, data) => {
  switch (key) {
    case "name":
      return <div className="font-bold text-left">{data?.client_name}</div>;
    case "projectLink":
      return <div className="text-left">{data?.project_link}</div>;
    case "projectId":
      return data?.project_id || "-";
    case "projectBudget":
      return data?.value;
    case "bidValue":
      return data?.bid_value;
    case "created":
      return data?.created_at;
    case "createdBy":
      return "f"; // Replace with the correct data field
    case "biddingDelayTime":
      return `${data?.bidding_minutes} mins ${data?.bidding_seconds} sec`;
    case "status":
      return data.deal_status === 1 ? (
        <h1 className="bg-green-600 text-white font-bold text-[12px] rounded-xl p-1 w-[145px] text-center">
          Converted To Deal
        </h1>
      ) : (
        <h1 className="bg-red-600 text-white font-bold text-[12px] rounded-xl p-1 w-[145px] text-center">
          Not Converted To Deal
        </h1>
      );
    case "dealStatus":
      return data.deal_status === 1 ? (
        <h1 className="bg-yellow-400 font-bold rounded-xl text-[12px] w-[110px] text-center">
          No Activity Yet
        </h1>
      ) : (
        <h1 className="text-[12px] w-[110px]">Not Applicable</h1>
      );
    case "action":
      return <CiMenuKebab className="text-[20px] border rounded-md" />;
    default:
      return null;
  }
};

export default Middle;
