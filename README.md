# The Artisan Kiln — Ceramic Tile Order Form

A responsive, interactive single-page application for ordering handcrafted ceramic tiles.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom design tokens)
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion
- **Testing**: Jest + React Testing Library

## Features

### Mobile Layout

- Vertical order form (customer info → cart → payment → notes)
- Quantity controls with inline editing
- Dynamic subtotal / shipping / grand total calculation
- Payment method switcher (Credit Card, PayPal, Apple Pay, Bank Transfer)
- Credit card form with input formatting and validation

### Desktop Layout (3-column)

- **Left**: Shopping cart table with "+" for adding tile and "TrashCan" for deleting a tile row
- **Center**: Interactive 6×6 design visualization grid
  - Click a tile in the palette to select it
  - Click grid cells to place tiles
  - Eraser tool to clear cells
  - Clear-all button
- **Right**: Order summary with customer form, payment, and "Place Secure Order" CTA

### Business Logic

- `Subtotal` = Σ (quantity × price)
- `Shipping`: **Free** if subtotal > $500, otherwise **$25.00**
- `Grand Total` = Subtotal + Shipping

### Validation

- Required: name, email (format-checked), shipping address
- Credit card: 16-digit number, MM/YY expiry, 3–4 digit CVV
- Errors shown inline, cleared on correction

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm start`     | Start production server  |
| `npm test`      | Run unit tests           |
| `npm run lint`  | Lint source files        |

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Tailwind imports, Google Fonts, base styles
│   ├── layout.tsx         # Root layout with Redux provider
│   └── page.tsx           # Responsive page (mobile/desktop toggle)
│
├── components/
│   ├── Header.tsx                # Navigation and cart counter with log-in button/user data
│   ├── PageHeader.tsx            # A header with title and fancy tiles :)
│   ├── Footer.tsx                # Links, copyright
│   ├── Providers.tsx             # Redux <Provider> wrapper
│   ├── CollAndTilePattern.tsx    # SVG tile maps renderer
│   ├── CartTable.tsx             # Order table with quantity controls
│   ├── AddTileModal              # Modal with tiles to add (if available)
│   ├── QuantityInput             # Field for inserting an amount
│   ├── DesignTool.tsx            # 6×6 interactive grid + Design Palette
│   ├── OrderTotals.tsx           # Subtotal / Shipping / Grand Total display
│   ├── CustomerForm.tsx          # Name, phone, email, address inputs
│   ├── PaymentSection.tsx        # Payment method radio + card form
│   ├── OrderSummary.tsx          # Desktop right panel + Place Order
│   ├── MobileLayout.tsx          # Mobile page layout
│   └── DesktopLayout.tsx         # Desktop 3-column layout
│
├── store/
│   ├── index.ts           # Store configuration
│   ├── cartSlice.ts       # Cart items & quantity actions
│   ├── gridSlice.ts       # 6×6 grid state + tile selection
│   └── formSlice.ts       # Customer form, payment, validation errors
│
├── hooks/
│   └── redux.ts           # Typed useAppDispatch / useAppSelector
│
├── types/
│   └── index.ts           # All main TypeScript interfaces & types
│
├── data/
│   └── tiles.ts           # Tile definitions (id, name, price)
│
├── utils/
│   ├── calculations.ts    # Subtotal, shipping, grand total logic
│   └── validation.ts      # Form validation + input formatters
│
└── __tests__/
    ├── calculations.test.ts   # Unit tests for pricing logic
    ├── validation.test.ts     # Unit tests for form validation
    └── cartSlice.test.ts      # Unit tests for cart reducer
```

## Tailwind Custom Tokens (`tailwind.config.ts`)

| Token         | Value     | Usage                  |
| ------------- | --------- | ---------------------- |
| `cream`       | `#f5f0e8` | Page background        |
| `ink`         | `#2c2416` | Primary text           |
| `teal`        | `#4a7c6f` | CTA buttons, accents   |
| `terracotta`  | `#c4603a` | Remove buttons, errors |
| `gold`        | `#d4a017` | Yellow Star tile       |
| `navy`        | `#2a4a8a` | Ocean Wave tile        |
| `fern`        | `#3d7a35` | Forest Fern tile       |
| `border-warm` | `#c4a882` | All borders            |

---

_Built for The Artisan Kiln frontend technical assessment._
