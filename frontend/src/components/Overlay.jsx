import React, { useContext } from 'react'
import { SidebarContext } from '../App'

const Overlay = () => {

    const overlayStyle = `fixed w-full h-screen bg-neutral-900 opacity-25 transition duration-300 ease-out`

    const {form,sidebar,setForm,setSidebar} = useContext(SidebarContext)

    if(!sidebar && !form){
        return 
    }

    const handleClick = () => {
        if(form){
            setForm(false)
        }
        if(sidebar){
            setSidebar(false)
        }
    }

    return (
        <div className={overlayStyle} onClick={handleClick}></div>
    )
}

export default Overlay