import { createContext, useContext, type ImgHTMLAttributes } from "react";

// Saved page texts/images keyed by field id (e.g. "home.hero.0.title"); filled by applyContent().
export const pageTexts: Record<string, string> = {};
export function setPageTexts(v?: Record<string, string> | null) {
  for (const k of Object.keys(pageTexts)) delete pageTexts[k];
  Object.assign(pageTexts, v ?? {});
}

type Ctx = {
  edit: boolean;
  get: (k: string, d: string) => string;
  set: (k: string, v: string) => void;
  pick: (k: string) => void;
};

const viewCtx: Ctx = { edit: false, get: (k, d) => pageTexts[k] ?? d, set() {}, pick() {} };
export const EditContext = createContext<Ctx>(viewCtx);
export const useEditable = () => useContext(EditContext);

const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

/** Text that becomes a textbox in the admin page editor. `line` = single-line input. */
export function T({ k, d, line }: { k?: string | undefined; d: string; line?: boolean }) {
  const c = useEditable();
  if (!k) return <>{d}</>;
  const v = c.get(k, d);
  if (!c.edit) return <>{v}</>;
  return line ? (
    <input className="cms-field cms-line" value={v} size={Math.max(3, v.length + 1)}
      onChange={(e) => c.set(k, e.target.value)} onClick={stop} onKeyDown={stop} onKeyUp={(e) => e.preventDefault()} />
  ) : (
    <textarea className="cms-field" value={v} rows={1}
      onChange={(e) => c.set(k, e.target.value)} onClick={stop} onKeyDown={stop} onKeyUp={(e) => e.preventDefault()} />
  );
}

/** Image that can be clicked to replace in the admin page editor. */
export function Img({ k, d, className, ...rest }: { k: string; d: string } & ImgHTMLAttributes<HTMLImageElement>) {
  const c = useEditable();
  return (
    <img {...rest} src={c.get(k, d)}
      className={c.edit ? `${className ?? ""} cms-img` : className}
      title={c.edit ? "Click to change image" : rest.title}
      onClick={c.edit ? (e) => { e.preventDefault(); e.stopPropagation(); c.pick(k); } : rest.onClick} />
  );
}
