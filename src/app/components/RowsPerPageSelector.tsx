import { useState } from "react";

interface RowsPerPageSelectorProps {
  currentRowsPerPage: number;
  onChange: (newRowsPerPage: number) => void;
}

const RowsPerPageSelector: React.FC<RowsPerPageSelectorProps> = ({
  currentRowsPerPage,
  onChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="relative pl-[0px] point3:pl-[25px] point1:pl-[95px]">
      {/* Button for Rows per Page */}
      <button
        onClick={toggleDropdown}
        className="bg-[#1D1D1D] text-white p-2 rounded-lg  text-[18px] point4:text-[20px] point2:text-[24px] flex  items-center"
      >
        <span>Rows per page {currentRowsPerPage}</span>
        <svg
          className={`ml-2 h-5 w-5 transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
      </button>

      {/* Dropdown for selecting rows */}
      {isDropdownOpen && (
        <div className="absolute mt-2 w-48 bg-[#1D1D1D] rounded-lg shadow-lg max-h-40 overflow-y-auto z-10 scrollbar-custom">
          {[2, 4, 6, 8, 10].map((rows) => (
            <div
              key={rows}
              onClick={() => {
                onChange(rows);
                setIsDropdownOpen(false);
              }}
              className={`p-3 text-white text-lg cursor-pointer ${currentRowsPerPage === rows
                ? "bg-[#807B0F]"
                : "hover:bg-[#807B0F]"
                }`}
            >
              {rows} rows
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RowsPerPageSelector;
