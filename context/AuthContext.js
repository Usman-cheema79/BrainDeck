    "use client";

    import { createContext, useContext, useEffect, useState } from "react";
    import { onAuthStateChanged, signOut } from "firebase/auth";
    import { auth } from "@/lib/firebase/firebase";
    import { useRouter } from "next/navigation";

    const AuthContext = createContext();


    const AUTO_LOGOUT_TIME = 5 * 60 * 1000;
    function useCurrentMinute() {

        const [minute, setMinute] = useState(new Date().getMinutes());

        useEffect(() => {
            const interval = setInterval(() => {
                setMinute(new Date().getMinutes());
            }, 10 * 1000);

            return () => clearInterval(interval);
        }, []);

        return minute;
    }
    export const AuthProvider = ({ children }) => {
        const router = useRouter();
        const [user, setUser] = useState(null);
        const [fullUserData, setFullUserData] = useState(null);
        const [loading, setLoading] = useState(true);
        const events = ["mousemove", "keydown", "scroll", "touchstart"];
        const minute = useCurrentMinute();

        useEffect(() => {
            const unsub = onAuthStateChanged(auth, (firebaseUser) => {
                setUser(firebaseUser || null);
                setLoading(false);
            });
            return () => unsub();
        }, []);

        useEffect(() => {
            if (!user) return;

            fetch("/api/users/login-duration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email, durationMinutes: 1 }),
            }).catch((err) => console.error("Error updating login duration:", err));
        }, [minute]);

        useEffect(() => {
            const fetchUserData = async () => {
                if (user?.email) {
                    try {
                        const res = await fetch(`/api/users?email=${encodeURIComponent(user.email)}`, {
                            method: "GET",
                            headers: { "Content-Type": "application/json" },
                        });
                        if (res.ok) {
                            const data = await res.json();
                            setFullUserData(data.user);
                        } else {
                            setFullUserData(null);
                        }
                    } catch (error) {
                        setFullUserData(null);
                    }
                } else {
                    setFullUserData(null);
                }
            };
            fetchUserData();
        }, [user]);

        useEffect(() => {
            if (!user) return;

            let timer;

            const resetTimer = () => {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    signOut(auth);
                    router.push("/auth");
                }, AUTO_LOGOUT_TIME);
            };

            events.forEach((event) => window.addEventListener(event, resetTimer));

            resetTimer();

            return () => {
                if (timer) clearTimeout(timer);
                events.forEach((event) => window.removeEventListener(event, resetTimer));
            };
        }, [user]);
        // console.log(fullUserData)
        if (loading) {
            return (
                <div className="h-screen flex items-center justify-center bg-black">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            );
        }

        return (
            <AuthContext.Provider value={{ user, fullUserData }}>
                {children}
            </AuthContext.Provider>
        );
    };

    export const useAuth = () => useContext(AuthContext);
