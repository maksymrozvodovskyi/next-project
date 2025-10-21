import Link from 'next/link'

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
							<h3>{item}</h3>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
