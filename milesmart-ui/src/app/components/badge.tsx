export default function Badge({ text }: { text: string }) {
    return (
      <div className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 px-2 pb-0.5 text-sm rounded">
        {text}
      </div>
    )
}