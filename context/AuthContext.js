    "use client";

    import { createContext, useContext, useEffect, useState } from "react";
    import { onAuthStateChanged, signOut } from "firebase/auth";
    import { auth } from "@/lib/firebase/firebase";

    const AuthContext = createContext();

    const AUTO_LOGOUT_TIME = 5 * 60 * 1000;

    export const AuthProvider = ({ children }) => {
        const [user, setUser] = useState(null);
        const [fullUserData, setFullUserData] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const unsub = onAuthStateChanged(auth, (firebaseUser) => {
                setUser(firebaseUser || null);
                setLoading(false);
            });
            return () => unsub();
        }, []);


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
            if (!user) {
                localStorage.removeItem("loginStartTime");
                return;
            }

            const now = Date.now();
            const storedStart = localStorage.getItem("loginStartTime");
            let durationMinutes = 0;

            if (storedStart) {
                const startTime = parseInt(storedStart, 10);
                durationMinutes = Math.floor((now - startTime) / (1000 * 60));
            }

            if (durationMinutes){
                fetch("/api/users/login-duration", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: user.email, durationMinutes }),
                }).catch(err => console.error("Error updating login duration:", err));
            }


            localStorage.setItem("loginStartTime", now.toString());

        }, [user]);


        useEffect(() => {
            if (!user) return;

            let timer;

            const resetTimer = () => {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    signOut(auth);
                    alert("You have been logged out due to inactivity.");
                }, AUTO_LOGOUT_TIME);
            };



            const events = ["mousemove", "keydown", "scroll", "touchstart"];

            events.forEach((event) => window.addEventListener(event, resetTimer));

            resetTimer();

            return () => {
                if (timer) clearTimeout(timer);
                events.forEach((event) => window.removeEventListener(event, resetTimer));
            };
        }, [user]);
        console.log(fullUserData)
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
