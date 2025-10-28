'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export type Props = {
	categories: string[]
}

export default function HeroMenu({ categories }: Props) {
	const t = useTranslations('hero')

	const c = useTranslations('categories')

	return (
		<Menu as='div' className='relative'>
			<MenuButton
				as={Button}
				variant='outline'
				className='bg-transparent border-white text-white hover:bg-white hover:text-gray-900 inline-flex items-center'
			>
				{t('button')}
			</MenuButton>
			<MenuItems
				transition
				className='absolute left-1/2 transform -translate-x-1/2 z-50 mt-2 w-48 origin-top rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
			>
				{categories.map(category => (
					<MenuItem key={category}>
						<Link
							href={`/category/${category}`}
							className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden capitalize hover:bg-gray-100 transition-colors'
						>
							{c(category)}
						</Link>
					</MenuItem>
				))}
			</MenuItems>
		</Menu>
	)
}
