
const DashNav = (props) => {
  const { panelName } = props;

  const panelTitle = {
    // Dashboard and sub-tabs
    Users: "Users",
    // Overview: "Dashboard Overview", 
    // Analytics: "Dashboard Analytics",
    // Statistics: "Dashboard Statistics",
    
    // Scheduled (no sub-tabs)
    BlockedUsers: "Blocked Users",

    // Reports and sub-tabs
    Results: "Results",
    // Monthly: "Monthly Reports",
    // Weekly: "Weekly Reports", 
    // Custom: "Custom Reports",
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 bg-[#f4f7fe]">
      <div className="flex flex-col gap-1">
        <p className="text-gray-500 text-sm">
          Dashboard / {panelTitle[panelName] || panelName}
        </p>
        <h1 className="text-2xl font-bold text-blue-900">
          {panelTitle[panelName] || panelName}
        </h1>
      </div>
    </div>
  );
};

export default DashNav;