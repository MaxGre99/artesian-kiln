import { TILE_MAP } from '@/data/tiles';
import { CartItem } from '@/types';

export const SHIPPING_THRESHOLD = 500;
export const SHIPPING_COST = 25;

export const calcSubtotal = (items: CartItem[]): number => {
	return items.reduce((sum, item) => {
		const tile = TILE_MAP[item.id];
		return sum + (tile ? tile.price * item.quantity : 0);
	}, 0);
};

export const calcShipping = (subtotal: number): number => {
	return subtotal > SHIPPING_THRESHOLD ? 0 : subtotal > 0 ? SHIPPING_COST : 0;
};

export const calcGrandTotal = (subtotal: number, shipping: number): number => {
	return subtotal + shipping;
};

export const formatCurrency = (amount: number): string => {
	return `$${amount.toFixed(2)}`;
};
