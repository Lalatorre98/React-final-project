import React from 'react'
import './Header.css'
import {FaHome} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {

        const categories = ["Health", "Food", "Travel", "Technology"]

        const navigate=useNavigate()

        
  return (
    <div className='header-container'> 
    <FaHome onClick={()=> navigate('/')}/> 
    <div className="categories-container">
        {
            categories.map(item =><Link className='nav-link' to={`/category/${item}`}>{item}</Link>)
        }
    </div>
    </div>
  )
}

export default Header