import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineHome, AiOutlineFund, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { BiNews } from 'react-icons/bi'



interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => {

    const [nav, setNav] = useState<boolean>(false)

    const handleNav = () => {
        setNav(!nav)
    }

    return (

        <div className='navbar'>

            <div className='nav-left'>
                <Link to='/'>
                    <h1>Cryptoverse</h1>
                </Link>
            </div>

            <div className='nav-right'>

                <div
                    className='menu-icon'
                    onClick={handleNav}
                >
                    {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
                </div>

                <div className={nav ? 'menu-items' : 'hidden'}>


                    <Link to='/'>
                        <a onClick={handleNav}><span><AiOutlineHome /></span>Home</a>
                    </Link>

                    <Link to='/cryptocurrency'>
                        <a onClick={handleNav}><span><AiOutlineFund /></span>Cryptocurrency</a>
                    </Link>

                    <Link to='/news'>
                        <a onClick={handleNav}><span><BiNews /></span>News</a>
                    </Link>

                </div>






            </div>
        </div>
    )
}

export default Navbar