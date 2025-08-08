
import { useTranslations } from 'next-intl';
import React from 'react';

export default function ProPricing() {
    const t = useTranslations('PvdPage.pricing');
    const pricingData = t.raw('plans') as string[][];
  return (
    <section className="w-full bg-gray-900 text-white py-20 sm:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="mt-4 text-lg text-gray-300">
            {t('description')}
          </p>
        </div>

        {/* Horizontal Pricing Grid */}
        {/* <div className="flex justify-center mt-16 max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
          
          <div className="grid grid-cols-3 text-center font-semibold bg-gray-800/50">
            <div className="p-4 text-left text-lg text-white">Features</div>
            <div className="p-4 text-lg text-white">Online Payments</div>
            <div className="p-4 text-lg text-white bg-gray-700/50 rounded-tr-xl">In-Person Payments</div>
          </div>
          
          <div className="divide-y divide-gray-700 text-center">
            
            <div className="grid grid-cols-3 items-center">
              <div className="p-4 text-left font-medium text-gray-300">Platform Fee</div>
              <div className="p-4 text-2xl font-bold">6%</div>
              <div className="p-4 text-2xl font-bold bg-gray-700/50">Free</div>
            </div>
          </div>
        </div> */}

        <div className="mt-16 max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 grid grid-cols-3">
          
          <div className="p-4 text-left text-lg text-white font-semibold">{pricingData[0][0]}</div>
          <div className="p-4 text-lg text-white border-x border-gray-700 text-center font-semibold">{pricingData[0][1]}</div>
          <div className="p-4 text-lg text-white bg-gray-700/50 rounded-tr-xl text-center font-semibold">{pricingData[0][2]}</div>
          
          <div className="p-4 text-left font-medium text-gray-300 border-t border-gray-700">{pricingData[1][0]}</div>
          <div className="p-4 text-2xl font-bold border-x border-t border-gray-700 text-center">6%</div>
          <div className="p-4 text-2xl font-bold border-t border-gray-700 bg-gray-700/50 text-center">{pricingData[1][2]}</div>

          <div className="p-4 text-left font-medium text-gray-300 border-t border-gray-700">{pricingData[2][0]}</div>
          <div className="p-4 text-gray-200 border-x border-t border-gray-700 text-center">{pricingData[2][1]}</div>
          <div className="p-4 text-gray-200 border-t border-gray-700 bg-gray-700/50 text-center">{pricingData[2][2]}</div>

        </div>
      </div>
    </section>
  );
}