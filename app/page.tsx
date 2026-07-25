"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PreviewCanvas from "@/components/PreviewCanvas";
import SelectedItemsSummary from "@/components/SelectedItemsSummary";
import { CategoryGroup, RentalItem } from "@/components/types";

// Dummy rental categories
const RENTAL_CATEGORY: CategoryGroup[] = [
  {
    id: "chairs",
    label: "Chairs",
  },
  {
    id: "tables",
    label: "Tables",
  },
  {
    id: "computer",
    label: "Computer",
  },
  {
    id: "relax-zones",
    label: "Relax Zones",
  },
  {
    id: "coffee-stations",
    label: "Coffee Stations",
  },
   {
    id: "decorations",
    label: "Decorations",
  },
];

// Dummy rental items
const RENTAL_ITEMS: RentalItem[] = [
  {
    id: "table-001",
    group_id: "tables",
    name: "Modern Table",
    pricePerDay: 25,
    imagePrev: "/images/rents/table-001/preview.png",
    imageThumb: "/images/rents/table-001/preview.png",
    description: "A comfortable modern table for your event.",
    dimensions: "W: 50cm, D: 50cm, H: 80cm",
    material: "Wood and Fabric",
    availableStock: 10,
  },
  {
    id: "table-002",
    group_id: "tables",
    name: "Modern Table 2",
    pricePerDay: 25,
    imagePrev: "/images/rents/table-002/preview.png",
    imageThumb: "/images/rents/table-002/preview.png",
    description: "A comfortable modern table for your event.",
    dimensions: "W: 50cm, D: 50cm, H: 80cm",
    material: "Wood and Fabric",
    availableStock: 10,
  },
   {
    id: "decoration-001",
    group_id: "decorations",
    name: "Vase with tulips and roses",
    pricePerDay: 5,
    imagePrev: "/images/rents/decoration-001/preview.png",
    imageThumb: "/images/rents/decoration-001/preview.png",
    description: "Vase with tulips and roses",
    material: "Wood and Fabric",
    availableStock: 10,
  },
  {
    id: "computer-001",
    group_id: "computer",
    name: "iMac 27 inc Retina 5K + keyboard + mouse",
    pricePerDay: 50,
    imagePrev: "/images/rents/computer-001/preview.png",
    imageThumb: "/images/rents/computer-001/preview.png",
    description: "Retina display 5k, Dual Core i5, 8GB RAM, 256GB SSD",
    availableStock: 10,
  },
];

export default function Home() {
  const [openGroup, setOpenGroup] = useState<string | null>("tables");
  const [selectedItems, setSelectedItems] = useState<RentalItem[]>([RENTAL_ITEMS[0]]);

  const toggleGroup = (groupId: string) => {
    setOpenGroup((prev) => (prev === groupId ? null : groupId));
  };

  // Selection Logic: Array state, user can select multiple items across categories, max 1 per group
  const handleSelectItem = (item: RentalItem) => {
    setSelectedItems((prev) => {
      const isAlreadySelected = prev.some((i) => i.id === item.id);
      if (isAlreadySelected) {
        return prev.filter((i) => i.id !== item.id);
      }
      const otherGroupsOnly = prev.filter((i) => i.group_id !== item.group_id);
      return [...otherGroupsOnly, item];
    });
  };

  const dailyRateTotal = selectedItems.reduce((acc, item) => acc + item.pricePerDay, 0);

  return (
    <div className="flex min-h-screen bg-white text-black font-sans">
      {/* Sidebar Component */}
      <Sidebar
        categories={RENTAL_CATEGORY}
        items={RENTAL_ITEMS}
        openGroup={openGroup}
        selectedItems={selectedItems}
        dailyRateTotal={dailyRateTotal}
        onToggleGroup={toggleGroup}
        onSelectItem={handleSelectItem}
      />

      {/* Main Content Column */}
      <main className="flex-1 ml-80 p-8 overflow-y-auto flex flex-col justify-between space-y-8 min-h-screen">
        {/* Preview Canvas Component */}
        <PreviewCanvas
          selectedItems={selectedItems}
          dailyRateTotal={dailyRateTotal}
        />

        {/* Selected Items Summary Component */}
        <SelectedItemsSummary
          selectedItems={selectedItems}
          dailyRateTotal={dailyRateTotal}
        />
      </main>
    </div>
  );
}
