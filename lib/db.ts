import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', '../DB.json')

export function readDB() {
	const data = fs.readFileSync(dbPath, 'utf-8')
	return JSON.parse(data)
}

export function writeDB(data: any) {
	fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}
