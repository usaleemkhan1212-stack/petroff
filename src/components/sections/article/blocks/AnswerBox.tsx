/**
 * The summary box that opens the article. **Pale mint since the redesign**
 * (`13318:2519`) — it was lilas-2, and the two are close enough (#e8f5f1
 * against #e8ecf5) that only a pixel comparison catches the difference.
 */
export function AnswerBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-note-lg bg-pale-mint text-body text-encre flex flex-col gap-3 p-5 sm:p-7">
      {children}
    </div>
  );
}
