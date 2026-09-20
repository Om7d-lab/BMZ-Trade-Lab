import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Logo } from './logo';
import { LocaleSwitcher } from './locale-switcher';
export function MarketingNav() { return <header className="sticky top-0 z-30 border-b border-white/[.06] bg-ink/80 backdrop-blur"><nav className="shell flex h-18 items-center justify-between gap-6 py-4"><Logo/><div className="hidden items-center gap-6 text-sm text-muted md:flex"><Link href="#product" className="hover:text-white">Product</Link><Link href="#workflow" className="hover:text-white">Workflow</Link><Link href="#integrations" className="hover:text-white">Integrations</Link><Link href="/pricing" className="hover:text-white">Pricing</Link></div><div className="flex items-center gap-3"><div className="hidden md:block"><LocaleSwitcher/></div><Link className="hidden text-sm font-semibold text-slate-300 sm:block" href="/login">Sign in</Link><Link className="button-primary" href="/dashboard">Start free <span aria-hidden>→</span></Link><Menu className="size-5 text-muted md:hidden"/></div></nav></header>; }

