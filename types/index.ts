export type TileId =
	| 'ocean-wave'
	| 'forest-fern'
	| 'terracotta-dot'
	| 'yellow-star';

export interface TileDefinition {
	id: TileId;
	name: string;
	price: number;
}

export interface CartItem {
	id: TileId;
	quantity: number;
}

export interface CartState {
	items: CartItem[];
}

export type GridCell = TileId | null;

export interface GridState {
	cells: GridCell[][];
	selectedTile: TileId | null;
}

export type PaymentMethod = 'credit' | 'paypal' | 'applepay' | 'bank';

export interface FormErrors {
	name?: string;
	phone?: string;
	email?: string;
	address?: string;
	cardNumber?: string;
	expiration?: string;
	cvv?: string;
}

export interface FormState {
	name: string;
	phone: string;
	email: string;
	address: string;
	projectNotes: string;
	paymentMethod: PaymentMethod;
	cardNumber: string;
	expiration: string;
	cvv: string;
	errors: FormErrors;
	submitted: boolean;
}
