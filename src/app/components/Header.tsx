import Image from "next/image";
import Logo from "@../../../src/images/Football_Icon 1.png"

export default function Home() {
  return (
    <div className="flex gap-7 p-7 wrapper mx-auto ">
      <Image src={Logo} alt="Logo" className="w-[48px] h-[41px]" />
      <h1 className="text-[#FFFFFFE5]/80 text-400 text-[24px]">Fantasy Football</h1>
    </div>
  );
}
