
import BuySellBar from "./components/BuySellBar";
import Buycard from "./components/Buycard";
import SideBar from "./components/SideBar";


export default async function Home() {


  return (
    <main className="flex flex-row gap-4 h-screen p-4 bg-[#F5F5F5]">
      <SideBar />
      <div className="mt-16 bg-white rounded-3xl basis-3/4">
        <BuySellBar/>
        <Buycard />
      </div>
    </main>
  );
}
