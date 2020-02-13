import React from "react";
import moment from "moment";

const buildDaysPhrase = (days) => {
    if (days === 1) return '1 пересадка';
    if (days % 2 === 0 || days % 3 === 0) return `${days} пересадки`;
};

const getTimeFromMinutes = (minutes) => {
    let h = minutes / 60 | 0, m = minutes % 60 | 0, d = minutes > 1440 ? Math.floor(minutes / 1440) : 0;
    const addToFormat = d > 1 ? `${d} дня` : `${d} день`;
    return moment.utc().day(d).hours(h).minutes(m).format(d ? `${addToFormat} HH:mm` : 'HH:mm');
};

const getStartAndEndTime = (date, duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration - (hours * 60);
    const startTime = moment(date).utc().format('HH:mm');
    const endTime = moment(startTime, 'HH:mm').add(hours, 'hours').add(minutes, 'minutes').format('HH:mm');

    return [startTime, endTime];
};

const TicketItem = ({ticket}) => {
    return (
        <div className="ticket-item white-bg-and-shadow">
            <div className="top">
                <div className="price">{ticket.price} P</div>
                <div className="company-logo"/>
            </div>

            {
                ticket.segments.map((segment, index) => {
                    const [startTime, endTime] = getStartAndEndTime(segment.data, segment.duration);

                    return (
                        <div className="info" key={index}>
                            <div className="left">
                                <div className="cities color-gray">{segment.origin} - {segment.destination}</div>
                                <div className="times color-dark">
                                    {startTime} - {endTime}
                                </div>
                            </div>
                            <div className="middle">
                                <div className="path color-gray">В пути</div>
                                <div className="global-time color-dark">{getTimeFromMinutes(segment.duration)}</div>
                            </div>
                            <div className="right">
                                <div className="amount-transplant color-gray">
                                    {!segment.stops.length && 'Без пересадок'}
                                    {segment.stops.length > 0 && buildDaysPhrase(segment.stops.length)}
                                </div>
                                <div className="transplant-cities color-dark">
                                    {segment.stops.length ? segment.stops.join(', ') : ''}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default TicketItem;