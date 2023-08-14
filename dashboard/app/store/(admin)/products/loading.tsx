import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Skeleton className="min-h-[700px] flex flex-col gap-3">
      {Array.from(Array(10).keys()).map((el) => (
        <Skeleton className="w-full h-14" />
      ))}
    </Skeleton>
  );
}
