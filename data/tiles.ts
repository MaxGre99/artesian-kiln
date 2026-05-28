import { TileDefinition, TileId } from '@/types';

export const TILES: TileDefinition[] = [
	{ id: 'ocean-wave', name: 'Ocean Wave', price: 28 },
	{ id: 'forest-fern', name: 'Forest Fern', price: 30 },
	{ id: 'terracotta-dot', name: 'Terracotta Dot', price: 26 },
	{ id: 'yellow-star', name: 'Yellow Star', price: 29 },
];

export const TILE_MAP: Record<TileId, TileDefinition> = Object.fromEntries(
	TILES.map((t) => [t.id, t]),
) as Record<TileId, TileDefinition>;
