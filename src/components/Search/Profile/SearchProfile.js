import React, { useState, useEffect } from 'react';
import axios from 'axios';

// scss
import './SearchProfile.css';

// icons
import ArrowDirection from '../../../assets/svg/arrow_direction.svg';

// components
import SearchProfileFilter from './SearchProfileFilter';
import SearchProfileList from './SearchProfileList';
const SearchProfile = () => {

    // States
    const [profileList, setProfileList] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const [filterSearchTerm, setFilterSearchTerm] = useState('');
    const [filterProfiles, setFilterProfiles] = useState([]);

    useEffect(() => {
        getProfiles();
        
    }, []);

    const getProfiles = () =>{
        const BASE_URL ="http://localhost:8000/api/users";
        axios.get(BASE_URL).then(res =>{
            setProfileList(res.data);  
            console.log(res.data)          
        })
    }

    // update filterItems
    const updateFilterState = (list, searchTerm) => { 
        setFilterItems(list);
        setFilterSearchTerm(searchTerm); 

        console.log(list);
        console.log(searchTerm);
    }

    

    return (
        <section className="search">
            <div className="search__container">
                <div className="search__container__title">
                    <h1 className="search__container__title-search">Zoeken</h1>
                    <img className="search__container__title-arrow_down" src={ArrowDirection} alt="arrow" />
                </div>
                <SearchProfileFilter updateFilterState={updateFilterState} />
                {/* <SearchProfileList vacancies={filteringVacancies} /> */}
                <SearchProfileList profiles={profileList} />
            </div>
        </section>
    )
}

export default SearchProfile;