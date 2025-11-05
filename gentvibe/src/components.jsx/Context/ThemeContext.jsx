import { createContext, useState } from "react";

export const ThemeContext=createContext()
export const ThemeProvider=({children})=>{
    const[theme,setTheme]=useState("light")
      const style={
        backgroundColor:theme=="light"?"white":"black",
        color:theme=="light"?"black":"white"
      }
      const toggleTheme=()=>{
        setTheme((prev)=>prev=="light"?"dark":"light")
      }
      
    return(
        <ThemeContext.Provider value={{theme,style,toggleTheme}}>
          <div style={style}>
   {children }
   </div>
        </ThemeContext.Provider>
    )
}