import Link from 'next/link'

function formatCategoryName(category: string): string {
	const decoded = decodeURIComponent(category)
	return decoded.replace(/\b\w/g, l => l.toUpperCase()).replace(/'[A-Z]/g, match => match.toLowerCase())
}

type Props = {
	categories: string[]
}

export default async function CategoryList({ categories }: Props) {
	return (
		<div>
			<h2>Categories</h2>
			<ul>
				{categories.map(item => (
					<li key={item}>
						<Link href={`/category/${item}`}>
							<h3>{formatCategoryName(item)}</h3>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
