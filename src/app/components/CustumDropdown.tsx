import { useState } from 'react';
 
interface CustomDropdownProps {
    totalPages: number;
    currentPage: number;
    handlePageChange: (page: number) => void;
  }

const CustomDropdown: React.FC<CustomDropdownProps> = ({ totalPages, currentPage, handlePageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block">
      {/* Dropdown Button */}
      <label htmlFor="page-select" className="mr-2 text-[24px] font-normal text-white">
        Page
      </label>
      <div
        onClick={toggleDropdown}
        className="rounded-lg p-2 text-white bg-[#1D1D1D] cursor-pointer"
      >
        {currentPage}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-[#1D1D1D] rounded-lg shadow-lg max-h-40 overflow-y-auto"
          style={{ maxHeight: '160px' }} 
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              onClick={() => {
                handlePageChange(i + 1);
                setIsOpen(false); 
              }}
              className="p-2 text-white hover:bg-[#807B0F] cursor-pointer"
            >
              {i + 1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;

<style jsx>{`
  ul::-webkit-scrollbar {
    width: 8px;
  }
  ul::-webkit-scrollbar-thumb {
    background-color: #807b0f;
    border-radius: 10px;
  }
  ul::-webkit-scrollbar-track {
    background-color: #1d1d1d;
  }
`}</style>
