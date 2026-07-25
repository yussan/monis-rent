"use client";

import { RentalItem } from "./types";

interface PreviewCanvasProps {
  selectedItems: RentalItem[];
  dailyRateTotal: number;
}

export default function PreviewCanvas({ selectedItems }: PreviewCanvasProps) {
  const tableItem = selectedItems.find((i) => i.group_id === "tables");
  const decorItem = selectedItems.find(
    (i) => i.group_id === "decorations" || i.group_id === "coffee-stations"
  );
  const chairItem = selectedItems.find((i) => i.group_id === "chairs");
  const relaxItem = selectedItems.find((i) => i.group_id === "relax-zones");

  const hasTable = !!tableItem;

  // Remaining items that don't fit into primary slot roles
  const categorizedIds = new Set(
    [tableItem?.id, decorItem?.id, chairItem?.id, relaxItem?.id].filter(Boolean)
  );

  const otherItems = selectedItems.filter((i) => !categorizedIds.has(i.id));

  return (
    <div>
      {/* Header Bar */}
      <header className="mb-6 border-b border-gray-200 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">
            Rental Preview
          </span>
          <h2 className="text-2xl font-bold text-black mt-1">Setup Canvas</h2>
        </div>
      </header>

      {/* Canvas Container */}
      <div className="w-full min-h-[480px] border border-gray-200 rounded-xl p-6 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden shadow-inner">
        {selectedItems.length > 0 ? (
          <div className="relative w-full h-[400px] flex items-end justify-center pb-4">
            
            {/* Ground / Floor Shadow effect for realistic setup presentation */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-black/10 blur-xl rounded-full pointer-events-none" />

            {/* 1. TABLE (Base Centerpiece - Big Table) */}
            {tableItem && (
              <div className="relative z-10 flex items-end justify-center transition-all duration-300 transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tableItem.imagePrev}
                  alt={tableItem.name}
                  className="w-[520px] max-w-[85%] max-h-[300px] object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* 2. DECORATION / TABLETOP ITEM (Vase placed on top of table) */}
            {decorItem && (
              <div
                className={`transition-all duration-300 ${
                  hasTable
                    ? "absolute left-1/2 -translate-x-1/2 bottom-[48%] z-20 pointer-events-none"
                    : "relative z-10 flex items-end justify-center mb-4"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={decorItem.imagePrev}
                  alt={decorItem.name}
                  className={`${
                    hasTable
                      ? "h-48 md:h-52 max-h-[220px] object-contain drop-shadow-xl"
                      : "h-64 max-h-[280px] object-contain drop-shadow-xl"
                  }`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* 3. CHAIR ITEM */}
            {chairItem && (
              <div
                className={`transition-all duration-300 ${
                  hasTable
                    ? "absolute left-[5%] md:left-[8%] bottom-4 z-15"
                    : "relative z-10 flex items-end justify-center"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={chairItem.imagePrev}
                  alt={chairItem.name}
                  className={`${
                    hasTable
                      ? "h-56 md:h-64 max-h-[260px] object-contain drop-shadow-xl"
                      : "h-64 max-h-[280px] object-contain drop-shadow-xl"
                  }`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* 4. RELAX ZONE ITEM */}
            {relaxItem && (
              <div
                className={`transition-all duration-300 ${
                  hasTable
                    ? "absolute right-[5%] md:right-[8%] bottom-4 z-15"
                    : "relative z-10 flex items-end justify-center"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={relaxItem.imagePrev}
                  alt={relaxItem.name}
                  className={`${
                    hasTable
                      ? "h-56 md:h-64 max-h-[260px] object-contain drop-shadow-xl"
                      : "h-64 max-h-[280px] object-contain drop-shadow-xl"
                  }`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* 5. OTHER SELECTED ITEMS */}
            {otherItems.map((item) => (
              <div
                key={item.id}
                className="relative z-10 flex items-end justify-center transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imagePrev}
                  alt={item.name}
                  className="max-h-64 max-w-[240px] object-contain drop-shadow-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ))}

            {/* Fallback layout if only non-table items selected without primary slots */}
            {!hasTable && !decorItem && !chairItem && !relaxItem && (
              <div className="flex items-center justify-center gap-6">
                {selectedItems.map((item) => (
                  <div key={item.id} className="transition-all duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imagePrev}
                      alt={item.name}
                      className="max-h-72 max-w-[280px] object-contain drop-shadow-xl"
                    />
                  </div>
                ))}
              </div>
            )}

          </div>
        ) : (
          <div className="text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium">No setup items selected</p>
            <p className="text-xs text-gray-400 mt-1">Select items from sidebar to combine PNG preview in canvas</p>
          </div>
        )}
      </div>
    </div>
  );
}

