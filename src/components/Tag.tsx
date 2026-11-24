// A small "pill" label, e.g. #react.
export default function Tag({ name }: { name: string }) {
  return (
    // inline-block   -> sits in a line of text but accepts padding
    // rounded-full   -> fully rounded ends = pill shape
    // font-mono      -> monospace font, so tags look "code-like"
    <span className="inline-block rounded-full bg-leaf-soft px-2.5 py-0.5 font-mono text-xs text-leaf">
      #{name}
    </span>
  )
}
