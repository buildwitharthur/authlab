const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function MemberSince({ joinedAt }: { joinedAt: string }) {
  return (
    <time dateTime={joinedAt}>{dateFormatter.format(new Date(joinedAt))}</time>
  );
}
