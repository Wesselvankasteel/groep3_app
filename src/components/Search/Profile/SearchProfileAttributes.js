import React, { useEffect } from 'react'

// css
import './SearchProfileAttributes.css';

const SearchProfileAttributes = ({ attributes, updateFilter }) => {

    const list = attributes.map((attribute) => 
        <li className="attributes__list__item" key={attribute.item} onClick={() => updateFilter(attribute)}>
            <h2 className="attributes__list__item__title">{attribute.item}</h2>
            <span className="attributes__list__item__delete">x</span>
        </li>
    );

    return (
        <section className="attributes">
            {attributes.length !== 0 &&
                <ul className="attributes__list">
                    { list }
                </ul>
            }
        </section>
    )
}

export default SearchProfileAttributes;
