import { useState } from "react";

interface DropDownSectionProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  currentRowsPerPage: number;
  rowsPerPageOptions: number[];
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const DropDownSection: React.FC<DropDownSectionProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
  const handlePageChange = (page: number) => {
    onPageChange(page);
    setIsPageDropdownOpen(false);
  };

  return (
    <div className="flex justify-between items-center text-white bg-[#262626] pr-5 point3:pr-10 rounded-lg">
      {/* Page Selection */}
      <div className="relative">
        <button
          onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
          className="bg-[#1D1D1D] text-white p-2 rounded-lg  text-[18px] point4:text-[20px] point2:text-[24px] flex items-center"
        >
          <span>Page {currentPage}</span>
          <svg
            className={`ml-2 h-5 w-5 transition-transform  ${isPageDropdownOpen ? "rotate-180" : "rotate-0"
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
        {isPageDropdownOpen && (
          <div className="absolute mt-2 w-48 bg-[#1D1D1D] rounded-lg shadow-lg max-h-40 overflow-y-auto z-10 scrollbar-custom">
            {Array.from({ length: totalPages }, (_, i) => (
              <div
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`p-3 text-white text-lg cursor-pointer ${currentPage === i + 1
                  ? "bg-[#807B0F]"
                  : "hover:bg-[#807B0F]"
                  }`}
              >
                Page {i + 1}
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
};

export default DropDownSection;
