import { useContext } from "react"
import { ThemeContext } from "../../../contexts/theme-context"

const Button = (props) => {
    const { theme } = useContext(ThemeContext)
    
    return(
        <>
        <button {...props}  
        style={{ color: theme.text, backgroundColor: theme.background, fontWeight:"bold"}}
        />
        </>
    )
}

export {Button}