import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchForm from './SearchForm';
import '../../Css/Header.css'
import { RiPencilFill } from 'react-icons/ri'
import { FaUserEdit } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { BsBookmarks } from 'react-icons/bs'
import SkeletonElement from '../Skeletons/SkeletonElement';
import { AuthContext } from '../../Context/AuthContext';

const Header = () => {
    const bool = localStorage.getItem("authToken") ? true : false
    const [auth, setAuth] = useState(bool)
    const { activeUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {

        setAuth(bool)
        setTimeout(() => {
            setLoading(false)
        }, 1600)

    }, [bool])


    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/')
    };

    return (

        <header>
            <div className="averager">

                <Link to="/" className="logo">
                    <h5>
                    ጋዜጣ 

                    </h5>
                </Link>
                <div className="nav-items">
          <Link className="nav-link" to="/news">
            NEWS
            <div className="dropdown">
              {/* Dropdown content */}
              <Link to="/sport-news">Sport News</Link>
              <Link to="/local-news">Local News</Link>
              <Link to="/world-news">World News</Link>
              <Link to="/entertainment-news">Fashion & Entertainment News</Link>
            </div>
          </Link>
          <Link className="nav-link" to="/tenders">
            TENDERS
          </Link>
          <Link className="nav-link" to="/vacancies">
            VACANCIES
          </Link>
          <Link className="nav-link" to="/">
            BLOGS
          </Link>
          <Link className="nav-link" to="/yellow-page">
            YELLOW PAGE
          </Link>
          <Link className="nav-link" to="/pricing">
            PRICING
          </Link>
        </div>
                <div className='header_options'>
            

                    {auth ?
                        <div className="auth_options">


                            <Link className='addStory-link' to="/addstory"><RiPencilFill /> Add Story </Link>


                            <Link to="/readList" className='readList-link'>
                                <BsBookmarks />
                                <span id="readListLength">
                                    {activeUser.readListLength}
                                </span>
                            </Link>
                            <div className='header-profile-wrapper '>


                                {loading ? <SkeletonElement type="minsize-avatar" />

                                    :

                                    <img src={`/userPhotos/${activeUser.photo}`} alt={activeUser.username} />

                                }


                                <div className="sub-profile-wrap  ">
                                    <Link className='profile-link' to="/profile"  > <FaUserEdit />  Profile </Link>

                                    <button className='logout-btn' onClick={handleLogout}> <BiLogOut />  Logout</button>

                                </div>

                            </div>


                        </div>

                        :
                        <div className="noAuth_options">

                            <Link className='login-link' to="/login"> Login </Link>

                            <Link className='register-link' to="/register"> Get Started</Link>
                        </div>

                    }
                </div>

            </div>

        </header>

    )
}

export default Header;
