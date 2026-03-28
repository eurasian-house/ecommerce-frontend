// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // get current user
//         supabase.auth.getUser().then(async ({ data }) => {
//             const user = data.user;
//             setUser(user);

//             // ✅ auto create profile after email-confirm login
//             if (user) {
//                 await supabase.from("profiles").upsert(
//                     {
//                         id: user.id,
//                         full_name: user.user_metadata?.full_name || "",
//                     },
//                     { onConflict: "id" }
//                 );
//             }

//             setLoading(false);
//         });

//         // listen to auth changes
//         const { data: listener } = supabase.auth.onAuthStateChange(
//             (_event, session) => {
//                 setUser(session?.user ?? null);
//             }
//         );

//         return () => {
//             listener.subscription.unsubscribe();
//         };
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export const useAuth = () => useContext(AuthContext);




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
                await supabase.from("profiles").upsert(
                    {
                        id: user.id,
                        full_name: user.user_metadata?.full_name || "",
                        email: user.email,
                    },
                    { onConflict: "id" }
                );
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