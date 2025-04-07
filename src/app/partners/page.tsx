import React from 'react';

export default function PartnersPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Partners</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Partner logos */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
            <div className="h-20 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Become a Partner</h2>
          <p className="text-gray-600 mb-6">
            We're always looking to expand our network of trusted partners.
            Join us in delivering exceptional value to our clients.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </main>
  );
} 