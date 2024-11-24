'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const route = usePathname()

  
  const pathname = route.split("/",-1).slice(2).join("/")

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.push(`/${nextLocale}/${pathname}`);
    });
  };
  return (
    <label className='border-2 rounded'>
      <p className='sr-only'>change language</p>
      <select
        defaultValue={localActive}
        className='bg-transparent py-2'
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value='en'>English</option>
        <option value='es'>Español</option>
        <option value='de'>Alemán</option>
        <option value="ca">Catalán</option>
      </select>
    </label>
  );
}