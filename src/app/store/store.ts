import AcademicDegreeStore from "./academicDegreeStore";
import {createContext, useContext} from "react";

interface Store {
    academicDegreeStore: AcademicDegreeStore
}

export const store: Store = {
    academicDegreeStore: new AcademicDegreeStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}