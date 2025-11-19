import { createContext, useState } from "react";

export const SearchContext=createContext()

export const SearchProvider=({children})=>{
    const[searchTerm,setSearchTerm]=useState("")
    const [suggestion, setSuggestion] = useState([]);
    return(
      
            <SearchContext.Provider value={{searchTerm,setSearchTerm,suggestion,setSuggestion}}>
                {children}
            </SearchContext.Provider>
      
    )

}