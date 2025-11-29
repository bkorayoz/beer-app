import { cn } from "@/lib/utils";
import React from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface SemanticHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  children: React.ReactNode;
}

export function SemanticHeading({ as: Tag = "h2", children, className, ...props }: SemanticHeadingProps) {
  return (
    <Tag className={cn("scroll-m-20 tracking-tight text-foreground", className, {
        "text-4xl font-extrabold lg:text-5xl": Tag === "h1",
        "text-3xl font-semibold first:mt-0": Tag === "h2",
        "text-2xl font-semibold": Tag === "h3",
        "text-xl font-semibold": Tag === "h4",
        "text-lg font-semibold": Tag === "h5",
        "text-base font-semibold": Tag === "h6",
    })} {...props}>
      {children}
    </Tag>
  );
}

