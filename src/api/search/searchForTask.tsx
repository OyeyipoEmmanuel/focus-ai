import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce"
import { auth, db } from "../../backend/firebase-config/config";
import { useQuery } from "@tanstack/react-query";


type SearchForTaskParamType = {
    searchItem: string;
    delay: number
}

export const useSearchForTask = ({ searchItem, delay }: SearchForTaskParamType) => {
    const [debouncedSearch] = useDebounce(searchItem.trim().toLowerCase(), delay)
    const [result, setResult] = useState<any[]>([])

    const { data, isLoading, error } = useQuery({
        queryKey: ['get_searched_result', debouncedSearch],
        queryFn: async() => {
            
            if(!debouncedSearch){
                // setResult([])
                return [];
            }
            console.log(debouncedSearch + "kd")
            const userId = auth.currentUser?.uid

            if (!userId) {
                // setResult([])
                return []
            }

            const q = query(collection(db, "users", userId, "tasks"), where("taskName_lower", ">=", debouncedSearch), where("taskName_lower", "<=", debouncedSearch + "\uf8ff"))

            const snapshot = await getDocs(q)

            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        },
        enabled: Boolean(debouncedSearch)
    })

    useEffect(()=>{
        setResult(data || [])
    }, [data])

    return {result, isLoading, error}

    // useEffect(() => {
    //     // console.log(debouncedSearch)

    //     const searchDb = async () => {
    //         const userId = auth.currentUser?.uid

    //         if (!userId || debouncedSearch === ""){
    //             setResult([])
    //             return
    //         } 

    //         const q = query(collection(db, "users", userId, "tasks"), where("taskName_lower", ">=", debouncedSearch), where("taskName_lower", "<=", debouncedSearch + "\uf8ff"))
    //         const snapshot = await getDocs(q)

    //         setResult(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

    //     }

    //     searchDb()

    // }, [debouncedSearch])
    // console.log(result)

    // return result

}