import React from "react";
import {createContext, useReducer} from "react";
import {SET_FILTER, SET_TICKETS} from "../types";

const initialState = {
    topFilter: [
        {
            title: 'Самый дешевый',
            name: 'cheap'
        },
        {
            title: 'Самый быстрый',
            name: 'fast',
        },
        {
            title: 'Самый дорогие',
            name: 'expensive',
        }
    ],
    leftFilter: [
        {
            title: 'Все',
            name: 'all'
        },
        {
            title: 'Без пересадок',
            name: 'notChange',
        },
        {
            title: '1 пересадка',
            name: 'oneChange',
        },
        {
            title: '2 пересадки',
            name: 'twoChange',
        },
        {
            title: '3 пересадки',
            name: 'threeChange',
        }
    ],
    filter: {
        cheap: true,
        fast: false,
        expensive: false,
        all: true,
        notChange: false,
        oneChange: false,
        twoChange: false,
        threeChange: false
    },
    tickets: null
};

const reducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_FILTER:
            return {...state, filter: {...state.filter, ...payload}};
        case SET_TICKETS:
            return {...state, tickets: [...payload]};
        default:
            return state;
    }

};

export const TicketsContext = createContext();

export const TicketsProvider = ({children}) => {
    return (
        <TicketsContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </TicketsContext.Provider>
    )
};