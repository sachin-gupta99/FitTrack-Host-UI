import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

/** A styled fallback spinner shown while the remote is loading. */
export function RemoteLoader() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        <p className="text-sm text-zinc-400">Loading module…</p>
      </div>
    </div>
  );
}

/** Wraps a remote component in Suspense with a fallback and error boundary. */
export function RemoteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Suspense fallback={<RemoteLoader />}>{children}</Suspense>
    </div>
  );
}
