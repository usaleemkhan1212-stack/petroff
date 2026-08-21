/** The lilas-2 summary box that opens the article. */
export function AnswerBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-note-lg bg-lilas-2 text-body text-encre flex flex-col gap-3 p-7">
      {children}
    </div>
  );
}
