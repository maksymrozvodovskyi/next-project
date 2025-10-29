import HeroMenu from '@/components/Hero/HeroMenu'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

export type Props = {
	categories: string[]
	params: { locale: string }
}

export default function Hero({ categories, params }: Props) {
	const t = useTranslations()
	const locale = params.locale
	setRequestLocale(locale)

	return (
		<div className='bg-gray-900'>
			<div className='relative isolate px-6 pt-14 lg:px-8'>
				<div
					aria-hidden='true'
					className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
						className='animate-gradient relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]'
					/>
				</div>

				<div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
					<div className='text-center'>
						<h1 className='animate-fade-up text-5xl font-semibold tracking-tight text-white sm:text-7xl'>
							{t('hero.titleText')}
						</h1>

						<p className='animate-fade-up [animation-delay:0.3s] mt-8 text-lg font-medium text-gray-400 sm:text-xl/8'>
							{t('hero.descriptionText')}
						</p>

						<div className='animate-scale-in [animation-delay:0.6s] mt-10 flex flex-wrap items-center justify-center gap-2 md:flex-row'>
							<HeroMenu categories={categories} />
						</div>
					</div>
				</div>

				<div className='mt-24 pb-24 grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto px-4'>
					<div className='scroll-scale-up bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300'>
						<h3 className='text-lg font-semibold mb-2 text-indigo-300'>{t('hero.feature1Title')}</h3>
						<p className='text-sm text-gray-300'>{t('hero.feature1Desc')}</p>
					</div>

					<div className='scroll-scale-up [animation-delay:0.15s] bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300'>
						<h3 className='text-lg font-semibold mb-2 text-indigo-300'>{t('hero.feature2Title')}</h3>
						<p className='text-sm text-gray-300'>{t('hero.feature2Desc')}</p>
					</div>

					<div className='scroll-scale-up [animation-delay:0.3s] bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300'>
						<h3 className='text-lg font-semibold mb-2 text-indigo-300'>{t('hero.feature3Title')}</h3>
						<p className='text-sm text-gray-300'>{t('hero.feature3Desc')}</p>
					</div>
				</div>

				<div className='scroll-fade-glow pb-24 mt-24 text-center px-4'>
					<h2 className='text-3xl sm:text-4xl font-bold mb-4 text-white'>{t('hero.ctaTitle')}</h2>

					<p className='text-gray-400 mb-8 max-w-xl mx-auto text-base sm:text-lg leading-relaxed'>
						{t('hero.ctaDesc')}
					</p>

					<Link
						href='/'
						className='inline-block bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
      text-white font-medium px-8 py-3 rounded-lg shadow-md
      transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0'
					>
						{t('hero.ctaButton')}
					</Link>
				</div>

				<div
					aria-hidden='true'
					className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
						className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]'
					/>
				</div>
			</div>
		</div>
	)
}
