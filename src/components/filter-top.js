import React, {useContext} from "react";
import classNames from "classnames";
import {TicketsContext} from "../contexts/ticketsContext";
import {SET_FILTER} from "../types";

const FilterTop = () => {

    const [ticketsState, dispatch] = useContext(TicketsContext);

    const handleSetActive = (name) =>
        dispatch({
            type: SET_FILTER,
            payload: {
                cheap: name === "cheap",
                fast: name === "fast",
                expensive: name === "expensive"
            }
        });

    return (
        <div className="filter-top">
            {ticketsState.topFilter.map(item => {

                const classTab = classNames({
                    'tab': true,
                    'active': ticketsState.filter[item.name]
                });

                return (
                    <div className={classTab} key={item.name} onClick={() => handleSetActive(item.name)}>
                        {item.title}
                    </div>
                )
            })}
        </div>
    )
};

export default FilterTop;