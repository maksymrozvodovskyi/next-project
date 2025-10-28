'use client'

import { Link } from '@/i18n/navigation'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import CartButton from '../../features/cart/Cart/CartButton'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { formatCategoryName, classNames, normalizeCategoryKey } from '../../lib/utils/utils'
import LogoutButton from '../ui/LogoutButton'
import { useAuthStore } from '../../stores/authStore'
import LocaleSwitcher from '../ui/LocaleSwitcher'
import { useTranslations } from 'next-intl'

type Props = {
	categories: string[]
}

export default function Header({ categories }: Props) {
	const { isAuthenticated, user } = useAuthStore()
	const t = useTranslations()

	return (
		<Disclosure as='nav' className='sticky top-0 bg-gray-800 z-50'>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-16 items-center justify-between'>
					<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
						<DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500'>
							<span className='absolute -inset-0.5' />
							<span className='sr-only'>Open main menu</span>
							<Bars3Icon aria-hidden='true' className='block size-6 group-data-open:hidden' />
							<XMarkIcon aria-hidden='true' className='hidden size-6 group-data-open:block' />
						</DisclosureButton>
					</div>

					<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='flex shrink-0 items-center'>
							<Link href='/' className='text-white text-xl font-bold'>
								FakeStore
							</Link>
						</div>

						<div className='hidden sm:ml-6 sm:block relative z-50'>
							<div className='flex space-x-4'>
								{!isAuthenticated && (
									<>
										<Link
											href='/sign-in'
											className='text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
										>
											{t('header.loginLinkLabel')}
										</Link>
										<Link
											href='/sign-up'
											className='text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
										>
											{t('header.registerLinkLabel')}
										</Link>
									</>
								)}

								<Menu as='div' className='relative z-50'>
									<MenuButton
										className={classNames(
											'text-gray-300 hover:bg-white/5 hover:text-white',
											'rounded-md px-3 py-2 text-sm font-medium inline-flex items-center relative z-10 cursor-pointer'
										)}
									>
										{t('header.categoriesDropdownLabel')}
										<ChevronDownIcon className='ml-1 h-4 w-4' aria-hidden='true' />
									</MenuButton>
									<MenuItems
										transition
										className='absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 pointer-events-auto'
									>
										{categories.map(category => (
											<MenuItem key={category}>
												<Link
													href={`/category/${category}`}
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize transition-colors'
												>
													{t(`categories.${normalizeCategoryKey(category)}`, {
														default: formatCategoryName(category),
													})}
												</Link>
											</MenuItem>
										))}
									</MenuItems>
								</Menu>
							</div>
						</div>
					</div>

					{isAuthenticated && user && (
						<div className='hidden sm:flex flex-1 justify-center'>
							<p className='text-gray-200 text-sm font-medium'>
								{t('greeting.greetingMessage', { userName: user.username })}
							</p>
						</div>
					)}

					<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
						<CartButton />
						<div className='ml-4'>
							<LocaleSwitcher />
						</div>

						{isAuthenticated && (
							<Menu as='div' className='relative ml-3'>
								<MenuButton className='relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'>
									<span className='absolute -inset-1' />
									<span className='sr-only'>Open user menu</span>
									<Avatar className='size-8'>
										<AvatarImage
											src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
											alt='User avatar'
										/>
									</Avatar>
								</MenuButton>

								<MenuItems
									transition
									className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition'
								>
									<MenuItem>
										<Link href='/profile' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
											{t('header.profileLinkLabel')}
										</Link>
									</MenuItem>
									<MenuItem>
										<a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
											{t('header.settingsLinkLabel')}
										</a>
									</MenuItem>
									<MenuItem>
										<LogoutButton />
									</MenuItem>
								</MenuItems>
							</Menu>
						)}
					</div>
				</div>
			</div>

			<DisclosurePanel className='sm:hidden'>
				<div className='space-y-1 px-2 pt-2 pb-3'>
					{!isAuthenticated && (
						<>
							<Link
								href='/sign-in'
								className='text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
							>
								{t('header.loginLinkLabel')}
							</Link>
							<Link
								href='/sign-up'
								className='text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
							>
								{t('header.registerLinkLabel')}
							</Link>
						</>
					)}
					<div className='px-3 py-2'>
						<div className='text-gray-300 text-base font-medium mb-1'>{t('header.categoriesDropdownLabel')}</div>
						<div className='pl-4 space-y-1'>
							{categories.map(category => (
								<DisclosureButton
									key={category}
									as={Link}
									href={`/category/${category}`}
									className='block text-gray-400 hover:text-white hover:bg-white/5 rounded-md px-3 py-2 text-sm font-medium capitalize'
								>
									{t(`categories.${normalizeCategoryKey(category)}`, {
										default: formatCategoryName(category),
									})}
								</DisclosureButton>
							))}
						</div>
					</div>
				</div>
			</DisclosurePanel>
		</Disclosure>
	)
}
