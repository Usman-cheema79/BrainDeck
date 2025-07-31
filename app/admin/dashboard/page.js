"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect , useState } from "react";  
import DashNav from "@/components/admin/Dashboard/DashNav/DashNav.jsx";
import { ScrollArea } from "@/components/ui/scroll-area";  
import SidePanel from "@/components/admin/SideBar/SidePanel";


export default function Dashboard() {
    const { user } = useAuth();
    const router = useRouter();  
    const [panelName, setPanelName] = useState("Users"); // Default panel name  
    // const panelName = "Users"; // Hard

    useEffect(() => {
        if (!user) router.push("/auth");
    }, [user]);   

    const renderContent = () => {
        switch (panelName) {
            // Dashboard and sub-tabs   
            case "Users":
                return (
                    // <ClientDashboard hasClient={hasClient} />  
                    <div className="p-6 text-black">
                        <h2 className="text-xl font-semibold mb-4">Users</h2>
                        <p>Users content here...</p>
                    </div>
                );
            case "Blocked Users":
                return (
                    <div className="p-6 text-black">
                        <h2 className="text-xl font-semibold mb-4">Blocked Users</h2>
                        <p>Your blocked users will appear here...</p>
                    </div>   
                    // <ClientSchedules hasClient={hasClient} />
                );
            case "Results":
                return (
                    <div className="p-6 text-black">
                        <h2 className="text-xl font-semibold mb-4 ">Results</h2>
                        <p>Your results will appear here...</p>
                    </div>   
                    // <ClientSchedules hasClient={hasClient} />
                );

           

            default:
                return (
                    <div className="h-screen w-full flex justify-center items-center">
                        <span className="text-gray-500">Page not available</span>
                    </div>
                );
        }
    };


    if (!user) return <p className="text-center mt-10">Checking auth...</p>;

    // return <div className="p-10 text-xl">Welcome to BrainDeck, {user.email}!</div>;  
    
    return (
        <div className="flex">
            <div className="flex">
                <SidePanel panelName={panelName} setPanelName={setPanelName} />
            </div>
            <div className="p-6 bg-[#f4f7fe] h-screen flex-1">
                <DashNav panelName={panelName} />
                <ScrollArea className="h-[84vh]">
                    {renderContent()}
                    {/* <ScrollBar orientation="horizontal" /> */}
                    {/* <ScrollBar orientation="vertical" /> */}
                </ScrollArea>
            </div>
        </div>
    );
}  



