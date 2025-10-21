import CategoryList from '@/components/CategoryList'
import Hero from '@/components/Hero'
import { getCategories } from '@/lib/api'

export default async function Home() {
	const categories = await getCategories()

	return (
		<>
			<Hero />
		</>
	)
}
