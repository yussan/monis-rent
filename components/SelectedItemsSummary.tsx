"use client";

import { RentalItem } from "./types";

interface SelectedItemsSummaryProps {
  selectedItems: RentalItem[];
  dailyRateTotal: number;
  onRemoveItem?: (item: RentalItem) => void;
}

export default function SelectedItemsSummary({
  selectedItems,
  dailyRateTotal,
  onRemoveItem,
}: SelectedItemsSummaryProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="font-semibold text-base text-black">
          Selected Setup Items ({selectedItems.length})
        </h3>
      </div>

      {/* List Preview Grid */}
      {selectedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2.5 rounded-md border border-gray-200 bg-gray-50"
            >
              <div className="w-12 h-12 rounded border border-gray-200 bg-white p-1 flex-shrink-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imagePrev}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-semibold text-black truncate">{item.name}</span>
                <span className="block text-[11px] text-gray-500 capitalize">Group: {item.group_id}</span>
                  <span className="text-xs font-bold text-black">
                  ${item.pricePerDay} / day
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
              
                {onRemoveItem && (
                  <button
                    onClick={() => onRemoveItem(item)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors rounded hover:bg-gray-200"
                    title="Remove item"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic py-2">No items selected yet.</p>
      )}

      {/* Footer Total Price & Rent Button */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-500">Total Rental Rate</span>
          <div className="text-xl font-bold text-black">
            ${dailyRateTotal} <span className="text-xs font-normal text-gray-500">/ day</span>
          </div>
        </div>
        <button
          disabled={selectedItems.length === 0}
          className={`px-6 py-2.5 rounded font-semibold text-sm transition-colors ${
            selectedItems.length > 0
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Rent Selected Setup (${dailyRateTotal}/day)
        </button>
      </div>
    </div>
  );
}
