/**
 * Figma's `answer` (`13318:2519`): the summary box that opens the article —
 * **lilas-2**, 18px corners, 28px padding, its three paragraphs 12 apart.
 *
 * It has been lilas-2, then pale mint through the colour pass, and is lilas-2
 * again. The two differ only in the green channel, so nothing but reading the
 * fill catches it.
 */
export function AnswerBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-note-lg bg-lilas-2 text-body text-encre flex flex-col gap-3 p-5 sm:p-7">
      {children}
    </div>
  );
}
