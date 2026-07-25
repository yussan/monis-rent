"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PreviewCanvas from "@/components/PreviewCanvas";
import SelectedItemsSummary from "@/components/SelectedItemsSummary";
import DesktopOnlyAlert from "@/components/DesktopOnlyAlert";
import { CategoryGroup, RentalItem } from "@/components/types";

// Key for localStorage
const LOCAL_STORAGE_KEY = "monis_selected_items";

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
  // {
  //   id: "relax-zones",
  //   label: "Relax Zones",
  // },
  // {
  //   id: "coffee-stations",
  //   label: "Coffee Stations",
  // },
  {
    id: "plants",
    label: "Plants",
  },
  {
    id: "lighting",
    label: "Lighting",
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
    id: "plant-001",
    group_id: "plants",
    name: "Tulip with Rose Flower",
    pricePerDay: 5,
    imagePrev: "/images/rents/plant-001/preview.png",
    imageThumb: "/images/rents/plant-001/preview.png",
    description: "Beautiful tulip plant for your event",
    material: "Wood and Fabric",
    availableStock: 10,
  },
  {
    id: "plant-002",
    group_id: "plants",
    name: "Small Cactus Plant",
    pricePerDay: 5,
    imagePrev: "/images/rents/plant-002/preview.png",
    imageThumb: "/images/rents/plant-002/preview.png",
    description: "A small and easy-to-maintain cactus plant for your event",
    material: "Wood and Fabric",
    availableStock: 10,
  },
  // {
  //   id: "computer-001",
  //   group_id: "computer",
  //   name: "iMac 27 inc Retina 5K + keyboard + mouse",
  //   pricePerDay: 50,
  //   imagePrev: "/images/rents/computer-001/preview.png",
  //   imageThumb: "/images/rents/computer-001/preview.png",
  //   description: "Retina display 5k, Dual Core i5, 8GB RAM, 256GB SSD",
  //   availableStock: 10,
  // },
  {
    id: "computer-001",
    group_id: "computer",
    name: "Macbook Pro 13 inc Retina",
    pricePerDay: 50,
    imagePrev: "/images/rents/computer-002/preview.png",
    imageThumb: "/images/rents/computer-002/preview.png",
    description: "Retina display 2k, Dual Core i5, 8GB RAM, 256GB SSD",
    availableStock: 10,
  },
  {
    id: "chair-001",
    group_id: "chairs",
    name: "Office Chair",
    pricePerDay: 15,
    imagePrev: "/images/rents/chair-001/preview.png",
    imageThumb: "/images/rents/chair-001/preview.png",
    description: "Ergonomic office chair for your event.",
    availableStock: 10,
  },
  {
    id: "chair-002",
    group_id: "chairs",
    name: "Office Chair 2",
    pricePerDay: 15,
    imagePrev: "/images/rents/chair-002/preview.png",
    imageThumb: "/images/rents/chair-002/preview.png",
    description: "Ergonomic office chair for your event.",
    availableStock: 10,
  },
  {
    id: "light-001",
    group_id: "lighting",
    name: "Office Lighting",
    pricePerDay: 15,
    imagePrev: "/images/rents/light-001/preview.png",
    imageThumb: "/images/rents/light-001/preview.png",
    description: "Minimalist but super bright lighting for your desk.",
    availableStock: 10,
  },
  {
    id: "decoration-001",
    group_id: "decorations",
    name: "Digital Clocks",
    pricePerDay: 5,
    imagePrev: "/images/rents/decoration-001/preview.png",
    imageThumb: "/images/rents/decoration-001/preview.png",
    description: "Digital clocks for your event, easy to read and stylish.",
    availableStock: 10,
  }
];

export default function Home() {
  const [openGroup, setOpenGroup] = useState<string | null>("tables");
  const [selectedItems, setSelectedItems] = useState<RentalItem[]>(() => {
    if (typeof window === "undefined") return [RENTAL_ITEMS[0]];
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error("Failed to load selected items from localStorage:", err);
    }
    return [RENTAL_ITEMS[0]];
  });

  // Save selected items to localStorage whenever selectedItems changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedItems));
    } catch (err) {
      console.error("Failed to save selected items to localStorage:", err);
    }
  }, [selectedItems]);

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

  const dailyRateTotal = selectedItems.reduce(
    (acc, item) => acc + item.pricePerDay,
    0,
  );

  return (
    <div className="flex min-h-screen bg-white text-black font-sans">
      <DesktopOnlyAlert />

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
