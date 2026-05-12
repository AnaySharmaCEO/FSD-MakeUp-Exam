import { Skeleton } from '../../app/components/ui/skeleton';
import { Card, CardContent } from '../../app/components/ui/card';

export function MovieCardSkeleton() {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardContent className="p-6">
        <Skeleton className="h-6 w-3/4 mb-4 bg-slate-800" />
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-6 w-20 bg-slate-800" />
          <Skeleton className="h-6 w-16 bg-slate-800" />
        </div>
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-24 bg-slate-800" />
          <Skeleton className="h-4 w-32 bg-slate-800" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 bg-slate-800" />
          <Skeleton className="h-10 w-10 bg-slate-800" />
        </div>
      </CardContent>
    </Card>
  );
}

export function MovieGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
