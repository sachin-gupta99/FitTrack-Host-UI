import { Dumbbell } from "lucide-react";
import { RemoteWrapper } from "@/lib/remoteLoader";
import type { ComponentType } from "react";
import { useUserStore } from "@/store/userStore";

interface MainContentProps {
  activeMenu: string;
  /** Optional remote component to render instead of the placeholder */
  remoteComponent?: ComponentType<any>;
  userId: number;
}

export default function MainContent({ activeMenu, remoteComponent: Remote, userId }: MainContentProps) {

  const {userData} = useUserStore();
  const initials = `${userData?.firstName.charAt(0)}${userData?.lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="flex flex-1 flex-col bg-zinc-950 p-8">
      {/* Top bar */}
      <header className="mb-8 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
            <Dumbbell className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            FitTrack
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-500 capitalize">{activeMenu}</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-semibold text-emerald-400">
            {initials}
          </div>
        </div>
      </header>

      {/* Remote micro-frontend or placeholder */}
      <div className="flex-1 min-h-0">
        {Remote ? (
          <RemoteWrapper key={activeMenu}>
            <Remote currentPath={`/${activeMenu}`} userId={userId} />
          </RemoteWrapper>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-zinc-700/60 bg-zinc-900/40 h-full">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800">
              <Dumbbell className="h-8 w-8 text-zinc-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-zinc-300">
                Micro-frontend slot
              </p>
              <p className="mt-1 max-w-sm text-sm text-zinc-500">
                This area is reserved for the <strong className="text-zinc-400">{activeMenu}</strong> micro-frontend.
                Replace this placeholder with your remote module.
              </p>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
