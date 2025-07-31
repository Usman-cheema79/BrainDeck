// src/components/Sidebar/SidebarItem.jsx

export function SidebarItem({
  icon,
  text,
  isActive,
  onClick,
  expanded,
  subTabs,
  activeSubTab,
}) {
  const handleMainClick = () => {
    if (onClick) {
      onClick(text);
    }
  };

  const handleSubClick = (subTab) => {
    if (onClick) {
      onClick(text, subTab);
    }
  };

  return (
    <>
      <li
        onClick={handleMainClick}
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-[#4318FF]"
              : "hover:bg-blue-50 text-gray-600"
          }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </li>

      {/* Sub-tabs */}
      {isActive && subTabs && expanded && (
        <ul className="ml-8 mt-2">
          {subTabs.map((sub, index) => (
            <li
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleSubClick(sub);
              }}
              className={`cursor-pointer text-sm py-1 px-2 rounded-md transition-colors
                ${
                  activeSubTab === sub
                    ? "bg-blue-100 text-[#4318FF] font-medium"
                    : "text-gray-600 hover:text-[#4318FF] hover:bg-blue-50"
                }`}
            >
              {sub}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}