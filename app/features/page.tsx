'use client';

import Link from 'next/link';

const Features = () => {
  const featuresComparison = [
    { feature: 'Free Forever Plan', stashStash: true, others: true },
    { feature: 'Community sharing', stashStash: true, others: true },
    { feature: 'Save later to read', stashStash: true, others: false },
    { feature: 'Offline access', stashStash: true, others: false },
    { feature: 'Reading history', stashStash: true, others: false },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center relative"
      style={{ backgroundImage: 'url(/aa.avif)' }} // Replace with your actual image path
    >
      {/* Top-Right Button */}
      <div className="absolute top-4 right-4">
        <Link
          href="/"
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition shadow-md"
        >
          Go Home
        </Link>
      </div>

      {/* Table Container */}
      <div className="w-full max-w-4xl bg-white bg-opacity-80 rounded-lg shadow-lg p-8">
        {/* Centered Heading with Image */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center">
            <img
              src="/pngegg3.png" // Replace with your actual image path
              alt="Comparison illustration"
              className="w-62 h-64 mx-auto" 
            />
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="px-4 py-2">Feature</th>
                <th className="px-4 py-2">Stash Stash</th>
                <th className="px-4 py-2">Others</th>
              </tr>
            </thead>
            <tbody>
              {featuresComparison.map((item, index) => (
                <tr
                  key={index}
                  className={`text-center text-black ${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  }`}
                >
                  <td className="px-4 py-2 border">{item.feature}</td>
                  <td className="px-4 py-2 border text-green-600">
                    {item.stashStash ? '✔️' : '❌'}
                  </td>
                  <td className="px-4 py-2 border text-red-600">
                    {item.others ? '✔️' : '❌'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Features;
