import { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail } from "@/components/mail/data";

import MailCardNew from "./mail-card-new";

interface MailListProps {
  items: Mail[];
  onMailClick: () => void;
}

export function MailList({ items }: MailListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem-1px)]" type="auto">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <MailCardNew key={item.id} email={item} />
        ))}
      </div>
    </ScrollArea>
  );
}

export function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
