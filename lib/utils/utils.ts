export function cn(...classes: (string | undefined | null | false)[]) {
	return classes.filter(Boolean).join(' ')
}

export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export function formatCategoryName(category: string): string {
	const decoded = decodeURIComponent(category)
	return decoded.replace(/\b\w/g, l => l.toUpperCase()).replace(/'[A-Z]/g, match => match.toLowerCase())
}

export const normalizeCategoryKey = (category: string) => {
	return category
		.toLowerCase()
		.replace(/'/g, '')
		.replace(/\s+([a-z])/g, (_, letter) => letter.toUpperCase())
}
