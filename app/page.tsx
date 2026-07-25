"use client";

import { useState } from "react";

interface RentalItem {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  imageBg: string;
  iconType: "chair" | "table" | "tent" | "light";
  description: string;
  dimensions: string;
  material: string;
  availableStock: number;
}

interface CategoryGroup {
  id: string;
  label: string;
  items: RentalItem[];
}

const RENTAL_CATALOG: CategoryGroup[] = [
  {
    id: "chairs",
    label: "Chairs",
    items: [
      {
        id: "chair-1",
        name: "Ergonomic Office Chair",
        category: "Chairs",
        pricePerDay: 15,
        imageBg: "bg-slate-100",
        iconType: "chair",
        description: "High-back mesh ergonomic chair with lumbar support and adjustable armrests. Ideal for conferences, co-working events, or home offices.",
        dimensions: "65cm x 65cm x 115cm",
        material: "Breathable Mesh & Steel Frame",
        availableStock: 25,
      },
      {
        id: "chair-2",
        name: "Nordic Wooden Dining Chair",
        category: "Chairs",
        pricePerDay: 12,
        imageBg: "bg-amber-50",
        iconType: "chair",
        description: "Minimalist Scandinavian solid oak dining chair with curved backrest for elegant wedding or dinner events.",
        dimensions: "45cm x 50cm x 82cm",
        material: "Solid Oak Wood",
        availableStock: 40,
      },
      {
        id: "chair-3",
        name: "Luxury Banquet Chair",
        category: "Chairs",
        pricePerDay: 18,
        imageBg: "bg-purple-50",
        iconType: "chair",
        description: "Premium velvet upholstered chair with gold accents. Perfect for galas, VIP seating, and corporate events.",
        dimensions: "50cm x 52cm x 90cm",
        material: "Velvet Fabric & Brass Finish",
        availableStock: 60,
      },
    ],
  },
  {
    id: "tables",
    label: "Tables",
    items: [
      {
        id: "table-1",
        name: "Foldable Event Banquet Table",
        category: "Tables",
        pricePerDay: 25,
        imageBg: "bg-stone-100",
        iconType: "table",
        description: "Heavy-duty 6ft rectangular folding table. Easy to set up and ideal for banquets, catering, or trade shows.",
        dimensions: "180cm x 75cm x 74cm",
        material: "HDPE Plastic Top & Steel Legs",
        availableStock: 15,
      },
      {
        id: "table-2",
        name: "Modern Glass Coffee Table",
        category: "Tables",
        pricePerDay: 30,
        imageBg: "bg-blue-50",
        iconType: "table",
        description: "Tempered glass coffee table with matte black metal frame. Adds a sophisticated lounge feel to event booths.",
        dimensions: "110cm x 60cm x 45cm",
        material: "Tempered Glass & Steel",
        availableStock: 8,
      },
    ],
  },
  {
    id: "tents",
    label: "Tents & Canopies",
    items: [
      {
        id: "tent-1",
        name: "Outdoor Party Canopy 10x10",
        category: "Tents & Canopies",
        pricePerDay: 65,
        imageBg: "bg-emerald-50",
        iconType: "tent",
        description: "Waterproof pop-up canopy tent with UV protection. Includes stakes and sandbags for outdoor celebrations.",
        dimensions: "300cm x 300cm x 280cm",
        material: "Waterproof Polyester & Aluminum",
        availableStock: 10,
      },
    ],
  },
  {
    id: "lighting",
    label: "Lighting & Sound",
    items: [
      {
        id: "light-1",
        name: "Warm LED String Lights (50m)",
        category: "Lighting & Sound",
        pricePerDay: 20,
        imageBg: "bg-yellow-50",
        iconType: "light",
        description: "Festoon fairy lights emitting a cozy warm white glow. Weatherproof rated for indoor and outdoor venues.",
        dimensions: "50 Meters",
        material: "Weatherproof Commercial Grade Cable",
        availableStock: 30,
      },
    ],
  },
];

// Helper to render icon thumbnail for sidebar & main preview
function ItemThumbnail({ iconType, className = "w-4 h-4" }: { iconType: string; className?: string }) {
  if (iconType === "chair") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
  }
  if (iconType === "table") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18M5 10v8M19 10v8" />
      </svg>
    );
  }
  if (iconType === "tent") {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21l9-18 9 18H3z" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

export default function Home() {
  // Toggle accordion group state ("open one close other")
  const [openGroup, setOpenGroup] = useState<string | null>("chairs");

  // Selected item state for real-time preview
  const [selectedItem, setSelectedItem] = useState<RentalItem>(RENTAL_CATALOG[0].items[0]);

  // Calculator states
  const [rentalDays, setRentalDays] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);

  const toggleGroup = (groupId: string) => {
    setOpenGroup((prev) => (prev === groupId ? null : groupId));
  };

  const totalPrice = selectedItem.pricePerDay * rentalDays * quantity;

  return (
    <div className="flex min-h-screen bg-white text-black font-sans">
      {/* Sidebar Column */}
      <aside className="w-80 border-r border-gray-200 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-1">monis.rent</h1>
          <p className="text-xs text-gray-500 mb-6">Select item to preview rental</p>

          <nav className="flex flex-col space-y-2">
            {RENTAL_CATALOG.map((group) => {
              const isOpen = openGroup === group.id;

              return (
                <div key={group.id} className="border-b border-gray-100 pb-2">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="w-full flex items-center justify-between py-2 text-left font-semibold text-gray-800 hover:text-black transition-colors"
                  >
                    <span>{group.label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180 text-black" : "text-gray-400"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Children Items with Thumbnail Preview */}
                  {isOpen && (
                    <ul className="mt-2 space-y-1.5 pl-1">
                      {group.items.map((item) => {
                        const isSelected = selectedItem.id === item.id;
                        return (
                          <li key={item.id}>
                            <button
                              onClick={() => setSelectedItem(item)}
                              className={`w-full flex items-center gap-3 p-2 rounded-md border text-left transition-all ${
                                isSelected
                                  ? "bg-black text-white border-black shadow-sm"
                                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                              }`}
                            >
                              {/* Mini Thumbnail Box */}
                              <div
                                className={`w-9 h-9 rounded flex items-center justify-center flex-shrink-0 border ${
                                  isSelected
                                    ? "bg-gray-800 border-gray-700 text-white"
                                    : `${item.imageBg} border-gray-200 text-gray-700`
                                }`}
                              >
                                <ItemThumbnail iconType={item.iconType} className="w-5 h-5" />
                              </div>

                              {/* Item Info */}
                              <div className="flex-1 min-w-0">
                                <span className="block text-xs font-semibold truncate">
                                  {item.name}
                                </span>
                                <span
                                  className={`block text-[11px] ${
                                    isSelected ? "text-gray-300" : "text-gray-500"
                                  }`}
                                >
                                  ${item.pricePerDay}/day
                                </span>
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Selected Thumbnail Preview Footer in Sidebar */}
        <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
          <div className={`w-10 h-10 rounded border border-gray-300 ${selectedItem.imageBg} flex items-center justify-center`}>
            <ItemThumbnail iconType={selectedItem.iconType} className="w-5 h-5 text-gray-800" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-xs font-semibold text-black truncate">{selectedItem.name}</span>
            <span className="block text-[11px] text-gray-500">${selectedItem.pricePerDay}/day</span>
          </div>
        </div>
      </aside>

      {/* Main Content Column: Rental Preview */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-6 border-b border-gray-200 pb-4 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">
              Rental Preview
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-black">Total ${selectedItem.pricePerDay}</span>
            <span className="text-sm text-gray-500"> / day</span>
          </div>
        </header>

        {/* 2-Column Preview Details & Rental Calculator */}
        <div className="grid grid-cols-1 ">
          {/* Left: Item Visual & Specifications */}
          <div className="space-y-6">
            {/* Visual Box */}
            <div
              className={`h-64 rounded-lg border border-gray-200 ${selectedItem.imageBg} flex flex-col items-center justify-center p-6 text-center`}
            >
              <div className="w-20 h-20 rounded-full border border-gray-300 bg-white flex items-center justify-center mb-3 shadow-sm">
                <ItemThumbnail iconType={selectedItem.iconType} className="w-10 h-10 text-gray-700" />
              </div>
              <span className="font-semibold text-gray-800 text-lg">{selectedItem.name}</span>
              <span className="text-xs text-gray-500 mt-1">Item ID: {selectedItem.id}</span>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
