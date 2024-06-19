import Coadmin from "./components/Coadmin";
import Cosidebar from "./components/Cosidebar";

export default async function Home() {
    return (
        <main className="flex flex-row gap-4 h-screen p-4 bg-[#F5F5F5]">
        <Cosidebar/>
        <div className="mt-16 bg-white rounded-3xl basis-3/4">
          
          <Coadmin />
        </div>
      </main>
    );
  }
  