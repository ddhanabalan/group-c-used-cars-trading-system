export default function Badge({ text, className }: { text: string, className?: string }) {
    return (
      <div className={"bg-gray-200 dark:bg-[#242424] dark:text-gray-200 px-2 pb-0.5 text-sm rounded "+className}>
        {text}
      </div>
    )
}