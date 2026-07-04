import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

// ✅ ADMIN EMAIL
const ADMIN_EMAIL = "contacteurasianhouse@gmail.com";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const { data } = await supabase.auth.getUser();
            const user = data.user;

            setUser(user);
            setIsAdmin(user?.email === ADMIN_EMAIL);

            // auto create profile
            if (user) {
                const { data: existingProfile } = await supabase
                    .from("profiles")
                    .select("id")
                    .eq("id", user.id)
                    .maybeSingle();

                if (!existingProfile) {
                    await supabase.from("profiles").insert({
                        id: user.id,
                        full_name:
                            user.user_metadata?.full_name ||
                            user.user_metadata?.name ||
                            "",
                        email: user.email,
                        avatar_url: assignDefaultAvatar(),
                    });
                }
            }

            setLoading(false);
        };

        init();

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                const user = session?.user ?? null;

                setUser(user);
                setIsAdmin(user?.email === ADMIN_EMAIL);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);