'use client';

import { categoriesData } from '../../data/categoriesData';
import { upcomingToolsData } from '../../data/upcomingToolsData';
import { useToolNavigation } from '../../hooks/useToolNavigation';

const CategoriesAndUpcomingSimple = () => {
const { handleCategoryClick } = useToolNavigation();

return (
<section className="py-20 px-6">
<div className="max-w-6xl mx-auto">

    <h2 className="text-center text-3xl font-semibold mb-14" style={{ color: '#d8a188' }}>
      Categories and Upcoming Tools
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

      {/* Left Column */}
      <div className="text-left">
        <h3 className="text-xl font-medium mb-5" style={{ color: '#d8a188' }}>
          Categories
        </h3>
        <ul className="space-y-3">
          {categoriesData.map((c) => (
            <li
              key={c.name}
              onClick={() => handleCategoryClick(c.name)}
              className="cursor-pointer text-toolnest-text hover:opacity-80 transition"
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Center Line */}
      <div className="hidden md:flex justify-center">
        <div style={{ width: '2px', backgroundColor: '#d8a188' }} className="h-full"></div>
      </div>

      {/* Right Column */}
      <div className="text-left">
        <h3 className="text-xl font-medium mb-5" style={{ color: '#d8a188' }}>
          Upcoming Tools
        </h3>
        <ul className="space-y-3">
          {upcomingToolsData.map((t) => (
            <li
              key={t.name}
              className="text-toolnest-text hover:opacity-80 transition"
            >
              {t.name}
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
</section>


);
};

export default CategoriesAndUpcomingSimple;