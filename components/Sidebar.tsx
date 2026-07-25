"use client";

import { CategoryGroup, RentalItem } from "./types";

interface SidebarProps {
  categories: CategoryGroup[];
  items: RentalItem[];
  openGroup: string | null;
  selectedItems: RentalItem[];
  dailyRateTotal: number;
  onToggleGroup: (groupId: string) => void;
  onSelectItem: (item: RentalItem) => void;
}

export default function Sidebar({
  categories,
  items,
  openGroup,
  selectedItems,
  onToggleGroup,
  onSelectItem,
}: SidebarProps) {
  return (
    <aside className="w-80 h-screen fixed top-0 left-0 border-r border-gray-200 p-6 flex flex-col bg-white z-10">
      <div className="flex-shrink-0 mb-6">
        <h1 className="text-xl font-bold mb-1">monis.rent</h1>
        <p className="text-xs text-gray-500">Select items (1 per category) to build your setup</p>
      </div>

      <nav className="flex-1 overflow-y-auto space-y-2 pr-1">
        {categories.map((group) => {
          const isOpen = openGroup === group.id;
          const groupItems = items.filter((item) => item.group_id === group.id);
          const selectedGroupItem = selectedItems.find((item) => item.group_id === group.id);

          return (
            <div key={group.id} className="border-b border-gray-100 pb-2">
              {/* Category Header */}
              <button
                onClick={() => onToggleGroup(group.id)}
                className="w-full flex items-center justify-between py-2 text-left font-semibold text-gray-800 hover:text-black transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>{group.label}</span>
                  {selectedGroupItem && (
                    <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded font-normal">
                      Selected
                    </span>
                  )}
                </div>
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

              {/* Looping item menu by group_id */}
              {isOpen && (
                <ul className="mt-2 space-y-1.5 pl-1">
                  {groupItems.length > 0 ? (
                    groupItems.map((item) => {
                      const isSelected = selectedItems.some((i) => i.id === item.id);
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => onSelectItem(item)}
                            className={`w-full flex items-center gap-3 p-2 rounded-md border text-left transition-all ${
                              isSelected
                                ? "bg-black text-white border-black shadow-sm"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                          >
                            {/* Image Thumbnail Box */}
                            <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100 p-0.5 flex items-center justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.imageThumb || item.imagePrev}
                                alt={item.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            </div>

                            {/* Item Info: Name & Price / per day */}
                            <div className="flex-1 min-w-0">
                              <span className="block text-xs font-semibold truncate">
                                {item.name}
                              </span>
                              <span
                                className={`block text-[11px] ${
                                  isSelected ? "text-gray-300" : "text-gray-500"
                                }`}
                              >
                                ${item.pricePerDay} / day
                              </span>
                            </div>

                            {/* Checkmark indicator */}
                            {isSelected && (
                              <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        </li>
                      );
                    })
                  ) : (
                    <p className="text-xs text-gray-400 italic py-1 pl-2">No items in this category</p>
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
