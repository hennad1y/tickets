import React from 'react';
import ReactDOM from 'react-dom';

import "./style.css";

import Logo from "./components/logo";
import FilterLeft from "./components/filter-left";
import FilterTop from "./components/filter-top";
import TicketsList from "./components/tickets-list";
import {TicketsProvider} from "./contexts/ticketsContext";

const App = () => {
    return (
        <div className="wrapper">
            <Logo/>
            <div className="container">
                <div className="left">
                    <FilterLeft/>
                </div>
                <div className="right">
                    <FilterTop/>
                    <TicketsList/>
                </div>
            </div>
        </div>
    )
};

ReactDOM.render(<TicketsProvider><App/></TicketsProvider>, document.getElementById('root'));
