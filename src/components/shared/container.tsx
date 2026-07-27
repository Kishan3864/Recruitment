import { cn } from "@/lib/utils";

/** Site-wide content width: 12-col-friendly max-w-7xl with responsive gutters. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />
  );
}
