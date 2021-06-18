import React, { useState, useEffect } from 'react';

// scss
import './DropdownDate.css';

// icons
import ArrowDropdown from '../../assets/svg/arrow_drop_down.svg';

const DropdownDate = ({ options, updateDateItems, activeFilter, changeActiveFilter }) => {

    const [active, setActive] = useState(null);

    useEffect(() => {
        setActive(activeFilter);
    }, [activeFilter])

    let optionsList = options.map((option, index) => 
        <li className="dropdown-date__menu__options__item" key={option} onClick={() => updateDateItems(option, index)}>
            <h2 className="dropdown-date__menu__options__item__title">{ option }</h2>
            <span className="dropdown-date__menu__options__item__add">+</span>
        </li>
    ); 

    if (options.length === 0) {
        optionsList = <p className="dropdown-date__menu__options__item__null">Geen datum gevonden.</p>
    }

    return (
        <div className="dropdown-date">
            <div className="dropdown-date__button">
                <button className="dropdown-date__button__btn" onClick={() => {
                    const newActive = {search: false, date: !active.date, employment: false};
                    setActive(newActive);
                    changeActiveFilter(newActive); 
                }}>Datum geplaats</button>
                <img className={!activeFilter.date? 'dropdown-date__button__icon dropdown-date__button__icon-close' : 'dropdown-date__button__icon dropdown-date__button__icon-open'} src={ ArrowDropdown } alt="search icon" />
            </div>
            <div className={!activeFilter.date ? "dropdown-date__menu  dropdown-date__menu-close" : 'dropdown-date__menu dropdown-date__menu-open'}>
                <ul className="dropdown-date__menu__options">
                    { optionsList }
                </ul>
            </div>
        </div>
    )
}

export default DropdownDate;