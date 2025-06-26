import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, ...props },useRef) => {
    return (
      <textarea
        className={cn(
          "flex h-[40px] w-full rounded-xl bg-transparent border-2 border-input px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 text-normal font-semibold",
          className,
        )}
        {...props}
        ref={useRef}
      />
    );
  },
);
TextArea.displayName = "TextArea";

export { TextArea };
