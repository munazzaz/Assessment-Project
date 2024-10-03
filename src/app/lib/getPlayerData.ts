import path from 'path';
import { promises as fs } from 'fs'; 
import { DataItem, DfsSlatePlayer } from '@/app/api/getplayers/types'; 

export async function getPlayerData(): Promise<DfsSlatePlayer[]> {
  const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'data.json');
  const file = await fs.readFile(filePath, 'utf8');
  const data: DataItem[] = JSON.parse(file); 
  return data.flatMap((item) => item.dfsSlatePlayers); 
}
