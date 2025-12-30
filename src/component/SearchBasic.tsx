import { useCallback, useEffect, useState } from "react";
import { SearchEvent } from "./event/ComponentEvents";

import type { FilterEvent, FilterEventInterface, SearchEventInterface } from "./event/ComponentEvents";
import * as dictit from "./ui/it.json";
import * as dicten from "./ui/en.json";
import { faMailBulk, faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { classify, scheda, SearchResult, sums } from "./lib/type";
import { extractSchedanum } from "./lib/utils";
import { FormTTEC } from "./ui/FormTTEC";
import Filters from "./Filters";
import SearchForm from "./ui/SearchForm";

interface SearchInterfaceProps {
    baseurl: string;
}

export const SearchBasic: React.FC<SearchInterfaceProps> = ({
    baseurl
}) => {
    const [isSearching, setIsSearching] = useState(false);
    const [records, setRecords] = useState<scheda[]>([]);
    const [filterData, setFilterData] = useState<FilterEventInterface | null>(null);
    const [filteredRecords, setFilteredRecords] = useState<scheda[]>([]);

    const [clsgrf, setClsGrf] = useState<classify[]>([]);
    const [tlrs, setTrls] = useState<classify[]>([]);
    const [updates, setUpd] = useState<classify[]>([]);

    const [licenses, setLics] = useState<classify[]>([]);
    const [offtecs, setOfftec] = useState<classify[]>([]);
    const [showfilter, setShowFilter] = useState(false);
    const [resultsCount, setResultsCount] = useState(0);
    const [query, setQuery] = useState('');
    const [lastsearch, setLastsearch] = useState('');
    const [searchResultsRef, setSearchResultsRef] = useState<SearchEventInterface | null>(null);


    const lang = document.getElementsByTagName('html')[0]!.getAttribute('lang') || 'en';
    const dict = lang === 'it' ? dictit : dicten;

    const handleFilterEvent = (event: FilterEvent) => {
        setFilterData(event.filterEvent);
    };

    useEffect(() => {
        fetch('https://ricerca-innovazione.enea.it/v1/summarizepublic').then((e) => e.json().then((r: sums) => {
            setRecords(r.records);
            setFilteredRecords(r.records);
            setClsGrf(r.categories);
            setTrls(r.tlrs);
            setUpd(r.updates);
            setLics(r.licenses);
            setOfftec(r.offtecs);
        }));
        window.addEventListener('innovazione-filterEvent', handleFilterEvent as EventListener);
        return () => {
            window.removeEventListener('innovazione-filterEvent', handleFilterEvent as EventListener);
        };
    }, []);

    // useEffect(() => {
    //     setTimeout(() => {
    //         const searchEvent = new SearchEvent({ records: { total: 20, start: 0 }, query: '', found: 0 });
    //         dispatchEvent(searchEvent);
    //     }, 3000);
    // }, []);

    const handleSearchInternal = useCallback(async (query: string, prevResults: SearchResult[]) => {
        setIsSearching(true);
        try {
            const response = await fetch('https://ricerca-innovazione.enea.it/v1/basicsearch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: query, lang: lang || 'it' })
            });

            if (!response.ok) {
                const erroreDati = await response.json();
                throw new Error(`Errore HTTP! Stato: ${response.status}, Messaggio: ${JSON.stringify(erroreDati)}`);
            }

            const valid: SearchResult[] = await response.json();
            const stack: string[] = [];
            const onceresult: SearchResult[] = [...prevResults];

            valid.forEach((element) => {
                const regex = /TTEC_(\d+)_\d+/;
                const match = element._id.match(regex);
                if (match && match[1] && !stack.includes(match[1])) {
                    stack.push(match[1]);
                    onceresult.push(element);
                }
            });

            onceresult.sort((b, a) => a._score! - b._score!);
            setResultsCount(onceresult.length);
            dispatchEvent(new SearchEvent({ records: { total: onceresult.length, start: 0 }, query: query, found: onceresult }));
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsSearching(false);
        }
    }, [lang, searchResultsRef]);

    const handleClear = () => {
        setQuery('');
        setLastsearch('');
        dispatchEvent(new SearchEvent({ records: { total: 0, start: 0 }, query: query, found: [] }));
    };

    /* clear results when filter is closed */
    useEffect(() => {
        if (!showfilter) {
            handleClear();
        }
    }, [showfilter]);

    /* apply filters on all records, transform them in search results and send for show results */
    const handleApplyFilters = () => {
        const filteredRecords: scheda[] = [];

        const { min, max } = filterData!.minmax;
        let filt: scheda[] = [];
        if (min > 0 || max < 90) {
            filt = records?.filter((obj) => obj.TLR.split("-").filter(o => parseInt(o) >= min).length > 0)
                .filter((obj) => obj.TLR.split("-").filter(o => parseInt(o) <= max).length > 0);
        } else {
            filt = records;
        }
        if (filterData!.appselected.length > 0) {
            filt = filt?.filter((o) => filterData!.appselected.filter(a => o.verticaliApplicativi.split('<br />').includes(a)).length > 0);
        } else {
            filt = filt.length > 0 ? filt : records;
        }
        if (filterData!.licselected.length > 0) {
            filt = filt?.filter((o) => filterData!.licselected.filter(a => o.licenza.includes(a)).length > 0);
        } else {
            filt = filt.length > 0 ? filt : records;
        }
        if (filterData!.otselected.length > 0) {
            filt = filt?.filter((o) => filterData!.otselected.filter(a => o.offertaTecnologica.includes(a)).length > 0);
        } else {
            filt = filt.length > 0 ? filt : records;
        }
        setFilteredRecords(filt);
        const fitl2sch: SearchResult[] = filt
            .filter((pr: any) => (pr.titolo !== undefined) && (pr.titolo.trim().length > 2))
            .map((obj: any) => {
                return {
                    _id: `TTEC_${obj.id}_1`,
                    _score: 1.0,
                    fields: {
                        chunk_text: '',
                        title: obj.titolo,
                        category: obj.verticaliApplicativi,
                        tags: [lang || 'it'],
                    }
                }
            });
        dispatchEvent(new SearchEvent({ records: { total: fitl2sch.length, start: 0 }, query: query, found: fitl2sch }));
    };

    /* toggle filter */
    const toggleFilter = () => {
        setShowFilter(!showfilter);
    };

    /* handle search */
    const handleSearch = (query: string) => {
        setQuery(query);
        setLastsearch(query);
        // send message showrecords = [] 
        handleSearchInternal(query, []);
    };

    return (
        <div className='flex flex-wrap justify-center gap-1 mb-1 '>
            <span className="text-center mb-4 text-gray-500">{dict.search.description}</span>

            {lastsearch === '' && (
                <SearchForm onSearch={handleSearch} onFilter={toggleFilter} onApplyFilters={handleApplyFilters} showFilter={showfilter} />
            )}

            {records && records.length > 0 && (

                <innovazione-filter id="filter_on_search" applications={JSON.stringify([])}
                    technologies={JSON.stringify(offtecs)}
                    licenses={JSON.stringify(licenses)}
                    trl={JSON.stringify({ min: 0, max: 90 })}
                    showfilter={showfilter}>
                </innovazione-filter>
                // <Filters
                // values={{ ...extendedValues(), showfilter }}
                // onchange={{ ...extendedOnchange, toggleFilter }}
                // searchResultsRef={searchResultsRef}
            )
            }

            <div className="action-buttons">
                {!isSearching && (resultsCount > 0) && query && (
                    <div className="mb-2 p-2">
                        <button title="Clear" type="button" onClick={handleClear} className="p-2 rounded-full bg-[#0b4b8a] hover:bg-[#2b6baa] ml-2 text-white">
                            {lastsearch} <FontAwesomeIcon icon={faTrashCan} size='lg' className="fa-fw" />
                        </button>
                    </div>)}
                {!isSearching && (resultsCount === 0) && query && (
                    <div className="flex flex-wrap justify-center gap-1 mb-1 items-center">
                        <button title="Clear" type="button" onClick={handleClear} className="items-center justify-center p-2 w-100 rounded-full bg-[#0b4b8a] hover:bg-[#2b6baa] text-white">
                            {dict.search.noresults} <FontAwesomeIcon icon={faTrashCan} size='xl' className="fa-fw" />
                        </button>
                        <p className="text-center font-normal text-xl my-3">{dict.search.nolowrank}.
                        </p>
                        <p className="text-center font-bold text-xl text-white hover:underline my-3">
                            <a href="mailto:trasferimento.tecnologico@enea.it" title={dict.footer.mailtitle} className="text-white mt-5 p-2 rounded-full bg-[#0b4b8a] hover:bg-[#2b6baa]">
                                {dict.footer.contact} <FontAwesomeIcon icon={faMailBulk} size='lg' className="fa-fw" />
                            </a>
                        </p>
                    </div>)}
            </div>
        </div >
    );
}
