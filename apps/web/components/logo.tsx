import Link from 'next/link';
export function Logo({ compact = false }: { compact?: boolean }) { return <Link href="/" className="inline-flex items-center gap-2 font-bold tracking-tight"><span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-mint to-teal text-sm text-ink shadow-glow">B</span>{!compact && <span>BMZ <span className="font-normal text-slate-400">Trade Lab</span></span>}</Link>; }

