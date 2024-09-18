
import { HeaderBar } from '@/components/server/header_bar';
import { SellView } from './components/sell_view';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function Page() {
  if (!cookies().has('token')) redirect('/')

  return (
    <main className="flex flex-col min-h-screen bg-neutral-100 dark:bg-[#181818]">
    <HeaderBar className="z-20" />
    <SellView/>
    
  </main>
)
}
