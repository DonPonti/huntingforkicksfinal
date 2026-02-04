'use client';

import { useState } from 'react';
import { sizeData, brandFitTips, type Brand } from '@/lib/sizeData';

type Gender = 'men' | 'women';
type SizeSystem = 'us' | 'uk' | 'eu' | 'cm';

export default function SizeConverter() {
  const [gender, setGender] = useState<Gender>('men');
  const [brand, setBrand] = useState<Brand>('nike');
  const [inputSystem, setInputSystem] = useState<SizeSystem>('us');
  const [inputValue, setInputValue] = useState<number | ''>('');

  const getClosestEntry = () => {
    if (inputValue === '' || inputValue < 0) return null;

    const entries = sizeData[brand];
    if (!entries?.length) return null;

    let closest: typeof entries[0] | null = null;
    let minDiff = Infinity;

    entries.forEach((entry) => {
      let val: number;
      switch (inputSystem) {
        case 'us': val = entry.usMen; break;
        case 'uk': val = entry.uk; break;
        case 'eu': val = entry.eu; break;
        case 'cm': val = entry.cm; break;
        default: return;
      }

      const diff = Math.abs(val - inputValue);
      if (diff < minDiff) {
        minDiff = diff;
        closest = entry;
      }
    });

    return closest;
  };

  const closest = getClosestEntry();

  const approxWomenUs = closest ? closest.usMen + 1.5 : null; // Nike-style conversion

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Sneaker Size Converter
      </h1>

      <div className="text-center md:text-left mb-10 max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 mb-4">
          Not sure what size to pick when brands fit so differently? Our free sneaker size converter helps you quickly switch between US (men's & women's), UK, EU, and CM measurements for Nike, Jordan, Adidas, New Balance, Puma and more.
        </p>
        <p className="text-lg text-gray-700">
          Select your brand and current size — get instant conversions plus a brand-specific fit tip so you avoid returns and find the perfect pair every time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1.5">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="men">Men's</option>
            <option value="women">Women's</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Brand</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value as Brand)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="nike">Nike / Jordan</option>
            <option value="adidas">Adidas</option>
            <option value="newbalance">New Balance</option>
            <option value="puma">Puma</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">From</label>
          <select
            value={inputSystem}
            onChange={(e) => setInputSystem(e.target.value as SizeSystem)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="us">US ({gender === 'men' ? "Men's" : "Women's"})</option>
            <option value="uk">UK</option>
            <option value="eu">EU</option>
            <option value="cm">CM (foot length)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Your Size</label>
          <input
            type="number"
            step="0.5"
            min="0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value ? Number(e.target.value) : '')}
            placeholder="e.g. 9 or 27"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {closest ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Your Size in {brand.toUpperCase()}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 font-semibold">System</th>
                  <th className="p-3 font-semibold">Size</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">US Men's</td>
                  <td className="p-3">{closest.usMen}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">US Women's (approx)</td>
                  <td className="p-3">{approxWomenUs?.toFixed(1)}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">UK</td>
                  <td className="p-3">{closest.uk}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">EU</td>
                  <td className="p-3">{closest.eu}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">CM (reference)</td>
                  <td className="p-3">{closest.cm}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-gray-700 italic">
            {brandFitTips[brand]}
          </p>
          <p className="mt-3 text-xs text-gray-500">
            Pro tip: Always measure your foot in CM (heel to longest toe) in the evening when feet are slightly swollen. Add 0.5–1 cm for comfort in most sneakers.
          </p>
        </div>
      ) : inputValue !== '' ? (
        <div className="text-center text-gray-600 mt-8">
          No close match found — try a different size or brand.
        </div>
      ) : null}
    </div>
  );
}