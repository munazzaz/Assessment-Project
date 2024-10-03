"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import RowsPerPageSelector from './RowsPerPageSelector';
import Icon1 from "@../../../src/images/arrow1.png";
import Icon2 from "@../../../src/images/akar-icons_chevron-right.png";
import DropDownSection from "@../../../src/app/components/DropDownSecction";
import LoadingSpinner from './Loading-spinner';
import Img1 from "@../../../src/images/tom_brady 1.png";
import Img2 from "@../../../src/images/player2.png";
import Img3 from "@../../../src/images/player3.png";

interface Player {
  operatorPlayerName: string;
  team: string;
  operatorPosition: string;
  operatorSalary: number;
  fantasyPoints: number;
}

const ImagesObj = {
  image1: Img1,
  image2: Img2,
  image3: Img3,
  image4: Img1,
  image5: Img2,
  image6: Img3,
  image7: Img1,
  image8: Img2,
  image9: Img3,
  image10: Img1,
};

interface SearchParams {
  page?: string;
  rowsPerPage?: string;
}

export default function FetchingData({ searchParams = {} }: { searchParams?: SearchParams } = {}) {
  const { page, rowsPerPage: queryRowsPerPage } = searchParams;

  const [players, setPlayers] = useState<Player[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(queryRowsPerPage ? parseInt(queryRowsPerPage) : 10);
  const [currentPage, setCurrentPage] = useState<number>(page ? parseInt(page) : 1);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const playersRef = useRef<Player[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch('/api/getplayers');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const playersData: Player[] = data.players || [];
        playersRef.current = playersData;
        setPlayers(playersData);

        if (playersData.length > 0) {
          setSelectedPlayer(playersData[0]);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalPlayers = playersRef.current.length;
  const totalPages = Math.ceil(totalPlayers / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPlayers = playersRef.current.slice(startIndex, endIndex);

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    const updatedTotalPages = Math.ceil(totalPlayers / newRowsPerPage);

    if (currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages);
    }

    const params = new URLSearchParams(window.location.search);
    params.set('rowsPerPage', newRowsPerPage.toString());
    params.set('page', currentPage.toString());
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  const handlePlayerSelection = (player: Player) => {
    setSelectedPlayer(player);
  };

  const getImageForPlayer = (index: number) => {
    const imageIndex = (index % 10) + 1;
    return ImagesObj[`image${imageIndex}` as keyof typeof ImagesObj].src;
  };

  if (loading) return <div><LoadingSpinner /></div>;


  return (
    <div className="point5:flex p-5 relative rounded-lg wrapper mx-auto">

      <div className="point5:w-3/4 flex flex-col  min-h-[600px] rounded-lg bg-[#2F2F2F] m-3 point4:m-4 relative">

        <div className="flex-grow overflow-y-auto">
          {/* Table */}
          <table className="min-w-full table-auto border-collapse relative">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#1D1D1D] rounded-lg">
                <th className="px-4 py-2 pl-10 text-left text-[24px] font-normal text-white pt-5">Name</th>
                <th className="px-4 py-2 text-left text-[24px] font-normal text-white">Team</th>
                <th className="px-4 py-2 text-left text-[24px] font-normal text-white">Position</th>
                <th className="px-4 py-2 text-left text-[24px] font-normal text-white">Salary</th>
                <th className="px-4 py-2 text-left text-[24px] font-normal text-white">Points</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {currentPlayers.length > 0 ? (
                currentPlayers.map((player, index) => (
                  <tr
                    key={index}
                    onClick={() => handlePlayerSelection(player)}
                    className={`cursor-pointer ${selectedPlayer && selectedPlayer.operatorPlayerName === player.operatorPlayerName
                      ? 'bg-[#807B0F]'
                      : 'hover:bg-[#807B0F]'
                      }`}
                  >
                    <td className="px-4 py-2 pl-10 text-[20px] point2:text-[24px] font-normal text-white">{player.operatorPlayerName}</td>
                    <td className="px-4 py-2 text-[20px] point2:text-[24px] font-normal text-white">{player.team}</td>
                    <td className="px-4 py-2 text-[20px] point2:text-[24px] font-normal text-white">{player.operatorPosition}</td>
                    <td className="px-4 py-2 text-[20px] point2:text-[24px] font-normal text-white">${player.operatorSalary}</td>
                    <td className="px-4 py-2 text-[20px] point2:text-[24px] font-normal text-white">{player.fantasyPoints}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-center text-white">No players found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="bg-[#262626]  py-5 px-11 flex justify-between items-center gap-8 text-white">
          <DropDownSection
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            currentRowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 20, 50]}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
          <RowsPerPageSelector currentRowsPerPage={rowsPerPage} onChange={handleRowsPerPageChange} />
          <div className="pl-[0px] point1:pl-[50px] text-[18px] point4:text-[20px] point2:text-[24px] font-normal text-white">
            {startIndex + 1} - {Math.min(endIndex, totalPlayers)} of {totalPlayers}
          </div>
          <div className="flex gap-3 pr-[10px] point1:pr-[48px]">
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage((prevPage) => prevPage - 1);
                  const params = new URLSearchParams(window.location.search);
                  params.set('page', (currentPage - 1).toString());
                  params.set('rowsPerPage', rowsPerPage.toString());
                  window.history.pushState(null, '', `?${params.toString()}`);
                }
              }}
              disabled={currentPage === 1}
            >
              <Image src={Icon1} alt="" className="w-[24px] h-[24px]" />
            </button>
            <button
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage((prevPage) => prevPage + 1);
                  const params = new URLSearchParams(window.location.search);
                  params.set('page', (currentPage + 1).toString());
                  params.set('rowsPerPage', rowsPerPage.toString());
                  window.history.pushState(null, '', `?${params.toString()}`);
                }
              }}
              disabled={currentPage === totalPages}
            >
              <Image src={Icon2} alt="" className="w-[24px] h-[24px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Player Details Section */}
      <div className="point5:w-1/4 bg-[#1D1D1D] rounded-lg mt-4 mb-[14px] mx-16 point5:mx-0 point5:mr-3 point4:mr-5">
        {selectedPlayer ? (
          <div className="text-center">
            <Image
              src={getImageForPlayer(players.indexOf(selectedPlayer))}
              alt={selectedPlayer.operatorPlayerName}
              className="w-[400px] h-[293px] point5:h-[206px] point2:h-[256px] mx-auto mt-8 object-cover"
              width={150}
              height={150}
            />
            <div className="bg-[#2F2F2F] rounded-lg">
              <h2 className="text-[25px] point3:text-[27px] px-2 point2:text-[32px] font-normal text-white/80 pt-6">{selectedPlayer.operatorPlayerName}</h2>
              <h2 className="text-[128px] text-white/80 font-normal pb-8">
                {selectedPlayer.fantasyPoints ? selectedPlayer.fantasyPoints : '-'}
              </h2>
              <h3 className="text-lg text-gray-400 pb-[60px]">Points</h3>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 pt-6"></div>
        )}
      </div>
    </div>


  );
}

