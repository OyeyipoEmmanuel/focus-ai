import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../backend/firebase-config/config";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";

type UserChangeType = {
    isLoading: boolean;
    user: User | null
}


const UserChangedContext = createContext<UserChangeType | undefined>(undefined);

export const UserChangedProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsloading] = useState<boolean>(true)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsloading(false)
            setUser(user)
        })

        return () => unsubscribe() // CleanUp 
    }, [])

    if (isLoading) return <LoadingComponent/>

    return <UserChangedContext.Provider value={{isLoading, user}}>
        {children}
    </UserChangedContext.Provider>

}

export const useGetUserChanged = () => {
    const context = useContext(UserChangedContext)

    if (!context) throw new Error("Not in provider")

    return context;
}