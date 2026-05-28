import OceanWaveTileIcon from '@/assets//OCEAN_WAVE_TILE.svg';
import ForestFernCollectionIcon from '@/assets/FOREST_FERN_COLL.svg';
import ForestFernTileIcon from '@/assets/FOREST_FERN_TILE.svg';
import OceanWaveCollectionIcon from '@/assets/OCEAN_WAVE_COLL.svg';
import StarCollectionIcon from '@/assets/STAR_COLL.svg';
import StarTileIcon from '@/assets/STAR_TILE.svg';
import TerracottaCollectionIcon from '@/assets/TERRACOTTA_COLL.svg';
import TerracottaTileIcon from '@/assets/TERRACOTTA_TILE.svg';
import { TileId } from '@/types';

const CollectionsMap: Record<
	TileId,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	'ocean-wave': OceanWaveCollectionIcon,
	'forest-fern': ForestFernCollectionIcon,
	'terracotta-dot': TerracottaCollectionIcon,
	'yellow-star': StarCollectionIcon,
};

const TilesMap: Record<TileId, React.FC<React.SVGProps<SVGSVGElement>>> = {
	'ocean-wave': OceanWaveTileIcon,
	'forest-fern': ForestFernTileIcon,
	'terracotta-dot': TerracottaTileIcon,
	'yellow-star': StarTileIcon,
};

interface TileSvgProps {
	tileId: TileId;
	className?: string;
}

export const CollectionPattern: React.FC<TileSvgProps> = ({
	tileId,
	className,
}) => {
	const Icon = CollectionsMap[tileId];

	if (!Icon) {
		return <div className={className} />;
	}

	return <Icon className={className} />;
};

export const TilePattern: React.FC<TileSvgProps> = ({ tileId, className }) => {
	const Icon = TilesMap[tileId];

	if (!Icon) {
		return <div className={className} />;
	}

	return <Icon className={className} />;
};
