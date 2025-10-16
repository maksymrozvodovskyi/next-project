import { Product } from '@/lib/api'
import Link from 'next/link'

type Props = {
	item: Product
}

export default function ProductItem({ item }: Props) {
	return (
		<li style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
			<Link href={`/product/${item.id}`}>
				<h3>{item.title}</h3>
				<p>Price: ${item.price}</p>
				<p>{item.description}</p>
			</Link>
		</li>
	)
}
