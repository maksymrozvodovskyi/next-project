'use client'

import { useLocale } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { usePathname } from '@/i18n/navigation'

export default function LocaleSwitcher() {
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()

	const switchLocale = (newLocale: string) => {
		if (newLocale !== locale) {
			router.replace(pathname, { locale: newLocale })
			router.refresh()
		}
	}

	return (
		<select value={locale} onChange={e => switchLocale(e.target.value)}>
			<option value='en'>EN</option>
			<option value='uk'>UK</option>
		</select>
	)
}
