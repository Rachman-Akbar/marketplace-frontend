import { cn } from "@/lib/cn";

type Tab = {
  key: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
  activeKey: string;
  className?: string;
};

export function Tabs({ tabs, activeKey, className }: TabsProps) {
  return (
    <div className={cn("inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1", className)}>
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <div
            key={tab.key}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition",
              active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500",
            )}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}
