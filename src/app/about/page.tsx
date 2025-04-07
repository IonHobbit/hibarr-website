import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Welcome to our company. We are dedicated to providing exceptional service
            and innovative solutions to our clients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To deliver outstanding value and results through our expertise and
                commitment to excellence.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To be the leading provider of innovative solutions in our industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 