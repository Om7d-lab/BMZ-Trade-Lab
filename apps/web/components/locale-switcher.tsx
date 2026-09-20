'use client';
import { Globe } from 'lucide-react';
import { useState } from 'react';
const locales = [{ code: 'en', label: 'English' }, { code: 'fa', label: 'فارسی' }, { code: 'ar', label: 'العربية' }, { code: 'es', label: 'Español' }, { code: 'pt', label: 'Português' }, { code: 'zh-CN', label: '简体中文' }, { code: 'ja', label: '日本語' }, { code: 'tr', label: 'Türkçe' }];
export function LocaleSwitcher() { const [locale, setLocale] = useState('en'); return <label className="flex items-center gap-2 text-sm text-muted"><Globe className="size-4"/><span className="sr-only">Language</span><select aria-label="Language" className="bg-transparent text-slate-300 outline-none" value={locale} onChange={(e) => { setLocale(e.target.value); document.documentElement.lang = e.target.value; document.documentElement.dir = ['fa', 'ar'].includes(e.target.value) ? 'rtl' : 'ltr'; }}>{locales.map((item) => <option className="bg-panel" value={item.code} key={item.code}>{item.label}</option>)}</select></label>; }

