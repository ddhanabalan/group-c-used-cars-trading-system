import { ReactElement, ReactNode } from "react";

export default function Card({ children, className=""}: { children?: ReactNode, className?: string}) {
    return (
      <div className={"flex flex-col rounded-md border dark:border-none dark:bg-white/5 shadow-md "+className}>
        {children}
      </div>
    )
}