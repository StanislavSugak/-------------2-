import { IconSearch } from "../../utils/icon";
import React from "react";
import './Search.scss';

const Search = ({ text, customClass, value, onChange }) => {
    return (
        <form className={`header_search ${customClass}`}>
            <img src={IconSearch} alt="s" />
            <input 
                id="search_input" 
                type="text" 
                placeholder={text} 
                value={value} 
                onChange={onChange} 
            />
        </form>
    );
}

export default Search;