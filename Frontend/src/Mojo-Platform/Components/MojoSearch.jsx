import React, { useCallback, useState } from 'react'
import { useLazySearchUserQuery } from '../../redux/api/api'

function MojoSearch () {

    const [searchUser, {isLoading, data, isError, error, refetch}] = useLazySearchUserQuery()

    const handleChange = (e) => {
        const {value} = e.target
        console.log(value);
        searchUser(value).then((data) => console.log(data)) 
    
    }

    const debounce = (func) => {
        let timer
        return function (...args) {
            const context = this
            if(timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                func.apply(context, args)
            }, 1000)
        }
    }

    const optimisedSearchResults = useCallback(debounce(handleChange), [])

return (
    <div className=' w-[85%] max-w-[400px] sm:w-full h-full flex flex-row items-center justify-center'>
        <div className='w-[10%] sm:w-[20%] h-[3rem] flex items-center justify-center '>
            <div className='py-1 h-[2.6rem] w-full flex items-center justify-center bg-blue-200 rounded-l-2xl'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z" fill="#0b3c52"></path> </g></svg>
            </div>
        </div>
        <div 
        className='w-[90%] sm:w-[80%] h-full flex items-center justify-center'>
            <input type="text" 
            name = {'search'}
            placeholder = "Search"
            className='w-full h-[2.6rem] bg-blue-200 text-[0.9rem] text-[#0b3c52] kanit rounded-r-2xl focus:outline-none'
            onChange={optimisedSearchResults}
            />
        </div>
        
    </div>
)
}

export default MojoSearch