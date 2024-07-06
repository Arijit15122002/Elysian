import React from 'react'
import useTheme from '../context/contextAPI'

function ThemeButton () {

    const onChangeButton = (e) => {
        const darkModeStatus = e.currentTarget.checked
        if(darkModeStatus) {
            darkMode()
        } else {
            lightMode()
        }
    }

    const {theme, darkMode, lightMode} = useTheme()
  return (
    <label className='relative inline-flex items-center cursor-pointer'>
        <input 
        type="checkbox"
        value = ""
        className = 'sr-only peer'
        onChange = {onChangeButton}
        checked = {theme === 'dark'}
        />

        <div className={'bg-[#cccccc] dark:bg-[#232323] peer w-8 h-8 flex items-center justify-center rounded-full'}>
        {
            theme === 'dark' ? 
            <div className=''>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dddddd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            </div> :
            <div className=''>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke='#232323' stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            </div> 
        }
        </div>
    </label>
  )
}

export default ThemeButton