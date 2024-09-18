import { ComponentAttributes } from "../atrributes";

type BadgeAttributes = ComponentAttributes & { text: string }

export function Badge({ text, className }: BadgeAttributes) {
    return (
      <div className={"bg-black/10 dark:bg-white/10 dark:text-neutral-200 px-2 pb-0.5 text-nowrap text-sm rounded "+className}>
        {text}
      </div>
    )
}