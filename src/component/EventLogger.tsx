import { useState, useEffect } from "react";
import type { FilterEvent, FilterEventInterface, ResultsEvent, ResultsEventInterface, SearchEvent, SearchEventInterface } from "./event/ComponentEvents";



export const EventLogger: React.FC = () => {

    const [filterevents, setFilterEvents] = useState<FilterEventInterface[]>([]);
    const [searchevents, setSearchEvents] = useState<SearchEventInterface[]>([]);
    const [resultsevents, setResultsEvents] = useState<ResultsEventInterface[]>([]);

    const handleFilterEvent = (event: FilterEvent) => {
        setFilterEvents((prevEvents) => [...prevEvents, event.filterEvent]);
    };

    const handleSearchEvent = (event: SearchEvent) => {
        setSearchEvents((prevEvents) => [...prevEvents, event.searchEvent]);
    };

    const handleResultsEvent = (event: ResultsEvent) => {
        setResultsEvents((prevEvents) => [...prevEvents, event.resultsEvent]);
    };

    useEffect(() => {

        window.addEventListener('innovazione-filterEvent', handleFilterEvent as EventListener);
        window.addEventListener('innovazione-searchEvent', handleSearchEvent as EventListener);
        window.addEventListener('innovazione-resultsEvent', handleResultsEvent as EventListener);
        return () => {
            window.removeEventListener('innovazione-filterEvent', handleFilterEvent as EventListener);
            window.removeEventListener('innovazione-searchEvent', handleSearchEvent as EventListener);
            window.removeEventListener('innovazione-resultsEvent', handleResultsEvent as EventListener);
        };
    }, []);


    return (
        <div className="event-logger">
            <h1>Event Logger</h1>
            <ul>
                {filterevents.map((event, index) => (
                    <li key={index}>{JSON.stringify(event)}</li>
                ))}
            </ul>
            <ul>
                {searchevents.map((event, index) => (
                    <li key={index}>{JSON.stringify(event)}</li>
                ))}
            </ul>
            <ul>
                {resultsevents.map((event, index) => (
                    <li key={index}>{JSON.stringify(event)}</li>
                ))}
            </ul>
        </div>
    )
}