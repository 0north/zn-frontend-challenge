import React, { useState, useMemo } from 'react'
import "./typeahead.css"

interface TypeaheadParams {
    options: {
        value: string,
        name: string
    }[],
    selectOption: Function
}

function Typeahead({options, selectOption}: TypeaheadParams) {

    const [search, setSearch] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const filteredOptions = useMemo((): {
        value: string,
        name: string
    }[] => {
        const searchRegexp = new RegExp(search, 'gi');
        if (!search) return options
        return options.filter(option => option.name.match(searchRegexp))
    }, [options, search])

    const handleSelect = (option: {
        value: string,
        name: string
    }) => {
        setSearch(option.name)
        setSelectedOption(option.value)
    }

    const handleAddOption = () => {
        if (!selectedOption) return
        selectOption(selectedOption)
        setSelectedOption('')
        setSearch('')
    }

    const handleSearch = (value: string) => {
        setSelectedOption('')
        setSearch(value)
    }

    return (
        <div className="typeahead__container">
            <div className='typeahead__search'>
                <input className="typeahead__search--input" type="text" value={search} onChange={(e) => handleSearch(e.target.value)}/>
                <button className="typeahead__search--button" onClick={handleAddOption}>+</button>
            </div>
            <ul className="typeahead__results">
                {
                    filteredOptions.map(option => <li className="typeahead__results--item" key={option.name + option.value} onClick={() => handleSelect(option)}>{option.name}</li>) 
                }
            </ul>
        </div>
    )
}
export default Typeahead
