import React, {useContext, useEffect, useState} from "react";
import TicketItem from "./ticket-item";
import useFetch from "../hooks/useFetch";
import {TicketsContext} from "../contexts/ticketsContext";
import {SET_TICKETS} from "../types";

const filterChange = (tickets, changeCount) => {
    return tickets.filter(item => (item.segments[0].stops.length === changeCount && item.segments[1].stops.length === changeCount))
};

const doFilter = (key, tickets) => {
    switch (key) {
        case 'cheap':
            tickets.sort((a, b) => a.price > b.price ? 1 : -1);
            return tickets;
        case 'expensive':
            tickets.sort((a, b) => a.price > b.price ? -1 : 1);
            return tickets;
        case 'fast':
            tickets.sort((a, b) => {
                const resultA = a.segments.sort((c, d) => c.duration > d.duration ? 0 : -1);
                const resultB = b.segments.sort((c, d) => c.duration > d.duration ? 0 : -1);
                return resultA[0].duration > resultB[0].duration ? 1 : -1
            });
            return tickets;
        case 'notChange':
            return filterChange(tickets, 0);
        case 'oneChange':
            return filterChange(tickets, 1);
        case 'twoChange':
            return filterChange(tickets, 2);
        case 'threeChange':
            return filterChange(tickets, 3);
        default:
            return tickets;
    }
};

const TicketsList = () => {

    const [{response, error, loading}, doFetch] = useFetch();
    const [ticketsState, dispatch] = useContext(TicketsContext);
    const [tickets, setTickets] = useState(null);

    useEffect(() => {
        doFetch(['https://front-test.beta.aviasales.ru/search', 'https://front-test.beta.aviasales.ru/tickets?searchId=']);
    }, [doFetch]);

    useEffect(() => {
        if (!response) return;

        dispatch({type: SET_TICKETS, payload: response})
    }, [response, dispatch]);

    useEffect(() => {
        if (!ticketsState.tickets) return;

        let copyTickets = [...ticketsState.tickets];

        Object.keys(ticketsState.filter).forEach(key => {
            if (ticketsState.filter[key]) {
                copyTickets = doFilter(key, copyTickets)
            }
        });

        setTickets([...copyTickets].splice(0, 5))
    }, [ticketsState]);

    return (
        <>
            {loading && <div>Loading</div>}
            {error && <div>Error</div>}
            {(!loading && (tickets && tickets.length === 0)) && <div>List Empty</div>}
            {(!loading && tickets) && tickets.map((ticket, index) => <TicketItem key={index} ticket={ticket}/>)}
        </>
    )
};

export default TicketsList;