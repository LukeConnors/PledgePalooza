import React, {useState, useEffect} from "react";
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"


function SearchBar({input, setInput, setResults}){

    const fetchData = (query) => {
        if(input !== ""){
            fetch(`/api/projects/project_search?query=${query}`)
            .then((response) => response.json())
            .then((data) => {
                setResults(data.projects);
            })
            .catch((e) => {
                return("Error fetching data:", e)
            })
        } else {
            setResults([])
        }

    }
    useEffect(() => {
        fetchData(input);
      }, [input]);

    const handleChange = (value) => {
        setInput(value)
    }


    return(
        <div className="search-container">
            <FaSearch id="search-icon"/>
            <input
            placeholder="Search for Projects..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    )
}

export default SearchBar
