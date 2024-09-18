import Image from "next/image";
import Link from "next/link";
import { footerLinks} from "."


const Footer = () => (
  <footer className='flex flex-col border-t bg-[#F5F5F5] border-gray-200 text-black-100 dark:bg-[#181818] dark:text-white dark:border-[#313131]'>
    <div className='flex flex-wrap justify-between gap-5 px-6 py-10 max-md:flex-col sm:px-16'>
      <div className='flex flex-col items-start justify-start gap-6'>
      <div className="pr-2 py-1 text-2xl font-bold dark:text-white">
                    milesmart
                </div>
        {/* <Image src='/milesmartblack.png' alt='logo' width={118} height={18} className='object-contain' /> */}
        <p className='text-base text-gray-700 dark:text-[#F5F5F5]'>
          Milesmart 2024 <br />
          All Rights Reserved &copy;
        </p>
      </div>

      <div className="footer__links">
        {footerLinks.map((item) => (
          <div key={item.title} className="footer__link">
            <h3 className="font-bold">{item.title}</h3>
            <div className="flex flex-col gap-5">
              {item.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.url}
                  className="text-gray-500 dark:text-[#F5F5F5]"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className='flex flex-wrap items-center justify-between px-6 py-10 mt-10 border-t border-gray-100 dark:border-[#121212] sm:px-16'>
      <p>@2024 Milesmart. All rights reserved</p>

      <div className="footer__copyrights-link">
        <Link href="/" className="text-gray-500 dark:text-[#F5F5F5]">
          Privacy & Policy
        </Link>
        <Link href="/" className="text-gray-500 dark:text-[#F5F5F5]">
          Terms & Condition
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
