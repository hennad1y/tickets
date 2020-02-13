import React, {useContext} from "react";
import {TicketsContext} from "../contexts/ticketsContext";
import {SET_FILTER} from "../types";

const FilterLeft = () => {

    const [ticketsState, dispatch] = useContext(TicketsContext);

    const handleSetChange = (name) => {
        const copyFilter = {...ticketsState.filter};

        //checked last checkbox
        const result = Object.keys(copyFilter).filter(item => {
            if (item === 'cheap' || item === 'fast' || item === 'expensive') return false;
            return ticketsState.filter[item];
        });

        if (result.length === 1 && ticketsState.filter[name]) return;
        // checked last checkbox end

        Object.keys(copyFilter).forEach(item => {
            if (item === 'cheap' || item === 'fast' || item === 'expensive') return false;
            if (item !== name) copyFilter[item] = false
        });

        copyFilter[name] = !copyFilter[name];

        dispatch({
            type: SET_FILTER,
            payload: {...copyFilter}
        });
    };

    return (
        <div className="filter-left white-bg-and-shadow">
            <h2>Количество пересадок</h2>
            {ticketsState.leftFilter.map(item => {
                return (
                    <label key={item.name} onClick={e => e.stopPropagation()}>
                        <input type="checkbox" checked={ticketsState.filter[item.name]}
                               onChange={() => handleSetChange(item.name)}/>
                        <span className="checkmark"/>
                        {item.title}
                    </label>
                )
            })}
        </div>
    )
};

export default FilterLeft;