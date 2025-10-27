import Hero from '@/components/Hero'
import { getCategories } from '@/lib/api/clientApi'

export default async function Home({ params }: { params: { locale: string } }) {
	const categories = await getCategories()

	return (
		<>
			<Hero categories={categories} params={params} />
		</>
	)
}
