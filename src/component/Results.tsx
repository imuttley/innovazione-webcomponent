import { useEffect, useState } from "react";
import * as dictit from "./ui/it.json";
import * as dicten from "./ui/en.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FormTTEC } from "./ui/FormTTEC";
import { extractSchedanum } from "./lib/utils";
import { type SearchResult } from "./lib/type";
import type { SearchEvent } from "./event/ComponentEvents";
// import { Intangible } from "schema-dts";

interface ResultsInterfaceProps {
    baseurl: string;
}

export const Results: React.FC<ResultsInterfaceProps> = ({
    baseurl
}) => {
    const [refresh, setRefresh] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [localResults, setLocalResults] = useState<SearchResult[]>([]);
    const [lastQuery, setLastQuery] = useState('');
    const [needMore, setNeedMore] = useState(false);

    const lang = document.getElementsByTagName('html')[0]!.getAttribute('lang') || 'en';
    const dict = lang === 'it' ? dictit : dicten;

    const handleSearchEvent = (event: SearchEvent) => {
        console.log("results: ", event.searchEvent.found.length);
        setLocalResults(event.searchEvent.found);
        setLastQuery(event.searchEvent.query);
        setIsSearching(false);
        setRefresh(refresh + 1);
    };


    useEffect(() => {
        const resultsEvent = new CustomEvent('innovazione-resultsEvent', { bubbles: true, detail: { refresh } });
        dispatchEvent(resultsEvent);
    }, [refresh]);

    useEffect(() => {
        window.addEventListener('innovazione-searchEvent', handleSearchEvent as EventListener);
        return () => {
            window.removeEventListener('innovazione-searchEvent', handleSearchEvent as EventListener);
        };
    }, []);

    return (
        <div className="grid grid-cols-1 gap-2">
            {isSearching && (
                <div className="flex flex-wrap justify-center gap-1 mb-1">
                    <p className="text-center text-gray-500 mr-2">{dict.search.wait}</p>
                    <div className="spinner border-4 border-t-transparent border-gray-200 rounded-full w-8 h-8 animate-spin" />
                </div>
            )}
            {localResults.map((result) => (
                <FormTTEC
                    key={result._id}
                    width={200}
                    height={200}
                    lang={lang}
                    cardnumber={extractSchedanum(result._id)}
                    score={result._score!}
                    chunk={result.fields.chunk_text}
                />
            ))}

            <div className="flex flex-wrap justify-center gap-1 mb-1">
                <div className="action-buttons">
                    {localResults.length > 0 && lastQuery && needMore && (
                        <div className="mb-2 p-2">
                            <button
                                title={dict.search.showall}
                                type="button"
                                onClick={() => {
                                    setNeedMore(false);
                                }}
                                className="p-2 rounded-full bg-[#0b4b8a] hover:bg-[#2b6baa] ml-2 text-white"
                            >
                                {dict.search.showall}{' '}
                                <FontAwesomeIcon icon={faPlusCircle} size="lg" className="fa-fw" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
