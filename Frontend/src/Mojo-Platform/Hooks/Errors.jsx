import { useEffect } from "react"
import { toast } from "react-toastify"


const useErrors = (errors = []) => {

    useEffect(() => {
        
        errors.forEach(({isError, error, fallback}) => {
            
            if (isError) {
                if(fallback) fallback()
                else toast.error(error?.data?.message || "Something went wrong")
            }

        })

    })

}

export default useErrors