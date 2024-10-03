import Header from "./components/Header";
import FetchingData from "@../../../src/app/components/FetchingData"

export default async function Home() {

  return (
    <div className=" bg-[#191919] h-[100%] point5:h-[100%] pb-44">
      <header className="bg-[#000000CC]/80 ">
        <Header />
      </header>
      <section className="">
        <FetchingData />
      </section>
    </div>
  );
}


