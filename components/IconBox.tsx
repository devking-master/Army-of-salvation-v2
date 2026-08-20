import * as Icons from "lucide-react";
export default function IconBox({name}:{name:string}){const I=(Icons as any)[name]||Icons.Shield;return <div className="mb-5 grid h-11 w-11 place-items-center rounded border border-sky/25 bg-sky/10 text-sky"><I size={20}/></div>}
