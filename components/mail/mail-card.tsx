"use client";

import { cn } from "@/lib/utils";
import { Mail } from "./data";
import { useMail } from "./use-mail";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { getBadgeVariantFromLabel } from "./mail-list";
import { Badge } from "@/components/ui/badge";
import { BellOff } from "lucide-react";

type MailCardProps = {
  email: Mail;
};

export default function MailCard({ email }: MailCardProps) {
  const [mail, setMail] = useMail();

  const handleMailClick = (mail: Mail) => {
    setMail({
      ...mail,
      selected: mail.id,
    });
  };

  return (
    <button
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
        mail.selected === email.id && "bg-muted"
      )}
      onClick={() => handleMailClick(email)}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{email.name}</div>
            {/* Step 2: Conditionally render the mute icon if item.muted is true */}
            {email.muted && (
              <BellOff className="ml-2 h-4 w-4 text-muted-foreground" />
            )}
            {!email.read && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          <div
            className={cn(
              "ml-auto text-xs",
              mail.selected === email.id
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {formatDistanceToNow(new Date(email.date), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="text-xs font-medium">{email.subject}</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {email.text.substring(0, 300)}
      </div>
      {email.labels.length ? (
        <div className="flex items-center gap-2">
          {email.labels.map((label) => (
            <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
              {label}
            </Badge>
          ))}
        </div>
      ) : null}
    </button>
  );
}
