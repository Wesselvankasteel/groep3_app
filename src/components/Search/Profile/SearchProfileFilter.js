import React, { useState, useEffect } from 'react';

import axios from 'axios';

// scss
import './SearchProfileFilter.css';

// components
import SearchBar from '../../CustomElements/SearchBar';
import DropdownSearch from '../../CustomElements/DropdownSearch';
import DropdownEmployment from '../../CustomElements/DropdownEmployment';
import DropdownDate from '../../CustomElements/DropdownDate';
import RadiusSlider from '../../CustomElements/RadiusSlider';

import SearchProfileAttributes from './SearchProfileAttributes';

// de volgende props toevoegen: searchOptions, dateOptions, employmentOptions
const SearchProfileFilter = ({ updateFilterState }) => {

    const BASE_URL = 'http://127.0.0.1:8000';

    // hardcode
    const [searchOptions, setSearchOptions] = useState([]);
    const [dateOptions, setDateOptions] = useState(['Vandaag', 'Afgelopen week', 'Afgelopen maand', 'Afgelopen jaar']);
    const [employmentOptions, setEmploymentOptions] = useState(['Fulltime', 'Parttime', 'Tijdelijk', 'Freelance / ZZP']);

    // state 
    const [activeFilter, setActiveFilter] = useState({search: false, date: false, employment: false});

    const [searchTerm, setSearchTerm] = useState('');
    const [searchRadius, setSearchRadius] = useState(0);
    const [filterItems, setFilterItems] = useState([]);

    useEffect(() => {
        updateFilterState(filterItems)
    }, [filterItems]);

    useEffect(() =>{
        getSearchOptions();
    }, [])

    const getSearchOptions = () =>{
        axios.get(BASE_URL + '/api/skill').then(res =>{
            setSearchOptions(res.data.map(skill => skill.skill));
        })
    }

    // update searchTerm from child
    const updateSearchTerm = (term) => { setSearchTerm(term); }
    
    // update filterItems with new option from child
    const updateFilterItems = (option, index) => { 

        // add clicked option to filterItems
        const item = searchOptions.splice(index, 1)[0];

        setFilterItems(prevAttributes => {
            return [...prevAttributes, {
                item: item,
                state: 'searchOptions',
                index: index
            }]     
        });

        // remove clicked option from initial options
        const newSearchOptionsList = searchOptions.filter(item => item !== option);
        setSearchOptions(newSearchOptionsList);
    }

    // update filterItems with new employment item from child
    const updateEmploymentItems = (tag, index) => {
        // add clicked option to filterItems
        const item = employmentOptions.splice(index, 1)[0];

        setFilterItems(prevAttributes => {
            return [...prevAttributes, {
                item: item,
                state: 'employmentOptions',
                index: index
            }]     
        });

        // remove clicked option from initial options
        const newEmploymentOptionsList = employmentOptions.filter(item => item !== tag);
        setEmploymentOptions(newEmploymentOptionsList);
    }

    // update filterItems with new date item from child
    const updateDateItems = (tag, index) => {
        // add clicked tag to filterItems
        const item = dateOptions.splice(index, 1)[0];

        setFilterItems(prevAttributes => {
            return [...prevAttributes, {
                item: item,
                state: 'dateOptions',
                index: index
            }]       
        });

        // remove clicked tag from initial options
        const newDateOptionsList = dateOptions.filter(item => item !== tag);
        setDateOptions(newDateOptionsList);
    }

    // update radius value
    const updateRadiusValue = (value) => {
        setSearchRadius(value);
    }

    // update activeFilter
    const changeActiveFilter = (newActiveFilter) => {
        setActiveFilter(newActiveFilter);
    }

    // update state on item removed
    const updateFilter = (item) => {

        if (item.state === 'searchOptions') {
            const newSearchOption = searchOptions;
            newSearchOption.splice(item.index, 0, item.item);
            setSearchOptions(newSearchOption);
        }
        else if (item.state === 'employmentOptions') {
            const newEmploymentOptions = employmentOptions;
            newEmploymentOptions.splice(item.index, 0, item.item);
            setEmploymentOptions(newEmploymentOptions);
        }
        else if (item.state === 'dateOptions') {
            const newDateOptions = dateOptions;
            newDateOptions.splice(item.index, 0, item.item);
            setDateOptions(newDateOptions);
        }

        // remove item from filterlist
        const newFilterList = filterItems.filter(filterItem => filterItem.item !== item.item);
        setFilterItems(newFilterList);
    }

    return (
        <section className="filter">
            <ul className="filter__container">
                <li className="filter__container__search">
                    <SearchBar updateSearchTerm={updateSearchTerm} />
                </li>       
                <li className="filter__container__radius">
                    <RadiusSlider distance={searchRadius} updateRadiusValue={updateRadiusValue}/>
                </li>
                <li className="filter__container__skills">
                    <DropdownSearch 
                        options={searchOptions} 
                        updateFilterItems={updateFilterItems}

                        activeFilter={activeFilter}
                        changeActiveFilter={changeActiveFilter}
                    />
                </li>
                <li className="filter__container__date">
                    <DropdownDate 
                        options={dateOptions} 
                        updateDateItems={updateDateItems}

                        activeFilter={activeFilter}
                        changeActiveFilter={changeActiveFilter}
                    />
                </li>
                <li className="filter__container__employment">
                    <DropdownEmployment 
                        options={employmentOptions} 
                        updateEmploymentItems={updateEmploymentItems}

                        activeFilter={activeFilter}
                        changeActiveFilter={changeActiveFilter}
                    />
                </li>
            </ul>
            <SearchProfileAttributes attributes={filterItems} updateFilter={updateFilter}/>
        </section>  
    )
}

export default SearchProfileFilter;