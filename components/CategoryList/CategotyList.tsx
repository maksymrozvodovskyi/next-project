import { getCategories } from '@/lib/api'
import Link from 'next/link'

export default async function CategoryList() {
	const categories = await getCategories()

	return (
		<ul>
			{categories.map(item => (
				<Link href={`/category/${item}`} key={item}>
					<h2>{item}</h2>
				</Link>
			))}
		</ul>
	)
}
