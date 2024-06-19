import HeaderBar from "../components/header_bar";
import Coadmin from "./components/Coadmin";
import Cosidebar from "./components/Cosidebar";

export default async function Home() {
    return (
        <main className="flex flex-col min-h-screen bg-[#F5F5F5]">
          <HeaderBar />
          <div className="flex flex-row gap-4 p-4 ">
            <Cosidebar/>
            <div className="mt-16 bg-white rounded-3xl basis-3/4">  
              <Coadmin />
            </div>
          </div>
        
      </main>
    );
  }
  