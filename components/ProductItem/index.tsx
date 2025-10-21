import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/productTypes'

export type Props = {
	item: Product
}

export default function ProductItem({ item }: Props) {
	return (
		<li>
			<Link href={`/product/${item.id}`}>
				{item?.image && (
					<div>
						<Image
							src={item.image}
							alt={item?.title || 'Product image'}
							fill
							sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw'
						/>
					</div>
				)}
				<h3>{item?.title}</h3>
				<p>${item?.price}</p>
				<p>{item?.description}</p>
			</Link>
		</li>
	)
}
