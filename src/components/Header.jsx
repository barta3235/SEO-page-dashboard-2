import { Link } from "react-router-dom";
import { TfiMenuAlt } from "react-icons/tfi";

const Header = ({ columnVisibility, toggleColumnVisibility }) => {
  return (
    <div className="flex justify-between items-center mx-5 md:mx-8 py-5">
      <div className="flex gap-5 md:gap-10 text-[20px] font-bold">
        <Link to="/">Home</Link>
        <Link to="/analytics">Analytics</Link>
      </div>

      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        <TfiMenuAlt className="text-[15px] bg-slate-800 text-white"></TfiMenuAlt>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow py-1"
      >
        {Object.keys(columnVisibility).map((column) => (
          <li key={column} className="flex flex-row gap-2 items-center text-[18px] mb-2">
            <input
              type="checkbox"
              checked={columnVisibility[column]} // Bind checkbox state
              onChange={() => toggleColumnVisibility(column)} // Toggle column visibility
            />
            {column}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Header;
