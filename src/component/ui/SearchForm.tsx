import { faCamera, faFilter, faMicrophone, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, type ChangeEvent, type FormEvent, type EventHandler, type MouseEventHandler, useEffect } from 'react';
import * as dictit from './it.json';
import * as dicten from './en.json';
import { BASE_URL } from '../contants';

interface SearchFormProps {
    onSearch: (query: string) => void;
    onFilter: () => void;
    onApplyFilters: () => void;
    showFilter: boolean;
}


const SearchForm: React.FC<SearchFormProps> = ({ onSearch, onFilter, onApplyFilters, showFilter }) => {
    const [query, setQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>(['']);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    // typewriter effect 
    const [placeholderText, setPlaceholderText] = useState<string>('');
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [loopNum, setLoopNum] = useState<number>(0);
    const [typingSpeed, setTypingSpeed] = useState<number>(150);


    const lang = document.getElementsByTagName('html')[0]!.getAttribute('lang') || 'en';
    const dict = lang === 'it' ? dictit : dicten;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const fetchSuggestions = async () => {
        const newSuggestions = await fetch(`${BASE_URL}/v1/publicsuggestions/${lang}`);
        const data = await newSuggestions.json();
        if (data && data.length > 0) {
            setSuggestions(data);
        }
    };
    // Fetch new suggestions when loop completes
    useEffect(() => {
        fetchSuggestions()

    }, [loopNum, lang]);


    useEffect(() => {
        // Gestione del timer per l'effetto di scrittura/cancellazione
        const handleTyping = () => {
            const i = loopNum % suggestions.length;
            const fullText = suggestions[i] || '';
            const cursor = "..";

            setPlaceholderText(
                isDeleting
                    ? fullText.substring(0, placeholderText.length - 1)
                    : fullText.substring(0, placeholderText.length + 1)
            );

            // Logica per determinare la velocità e il cambio di stato
            if (!isDeleting && placeholderText === fullText) {
                // Frase completata: pausa lunga prima di cancellare
                setTimeout(() => setIsDeleting(true), 2000);
                setTypingSpeed(150); // Reset velocità normale
            } else if (isDeleting && placeholderText === '') {
                // Cancellazione completata: passa alla frase successiva
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(150); // Reset velocità normale
            } else {
                // Durante la scrittura o cancellazione
                // Se stiamo cancellando, andiamo più veloci
                setTypingSpeed(isDeleting ? 50 : 150);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [placeholderText, isDeleting, loopNum, suggestions, typingSpeed]);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(query);
        setQuery("");
        setShowSuggestions(false);
    };

    const handleFocus = () => {
        if (showSuggestions) {
            setShowSuggestions(false)
        } else {
            setShowSuggestions(true);
            setTimeout(() => setShowSuggestions(false), 5 * 1000);
        }
    };
    const handleChange = () => {
        setShowSuggestions(false);
    }
    const handleClear = () => {
        setQuery("");
        setShowSuggestions(true);
    };


    return (
        <div className="w-full p-5 mx-auto">
            <form onSubmit={handleSubmit} className="relative w-full text-gray-900">
                <div className="flex items-center gap-2 relative">
                    {!showFilter && (<input
                        type="text"
                        value={query}
                        aria-label={dict.search.suggestion}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onChangeCapture={handleChange}
                        className="text-black flex-1 px-4 py-3 border border-gray-300 bg-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder={placeholderText}
                    />)}
                    {query && (
                        <button
                            aria-label={dict.search.cleartext}
                            type="button"
                            onClick={handleClear}
                            className="ml-[-2.5rem] z-20 text-white-500 hover:bg-red-700  bg-red-300 rounded-full w-8 h-8 flex items-center justify-center shadow border border-gray-200"
                            tabIndex={-1}
                        >
                            ✕
                        </button>
                    )}
                    {showFilter && (
                        <button
                            aria-label={dict.search.cleartext}
                            type="button"
                            onClick={onApplyFilters}
                            className="flex-1 px-4 py-3 border border-gray-300 bg-[#0b4b8a] text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 cursor-pointer"
                            tabIndex={-1}
                        >
                            {dict.search.applyfilters}
                        </button>
                    )}
                    <button aria-label={dict.search.label} title={dict.search.label} type="submit" className={`ml-2 h-12 w-12 flex items-center justify-center bg-[#0b4b8a] hover:bg-green-500 text-white rounded-full transition-opacity duration-200 ${!query && 'opacity-50 bg-gray-600 cursor-not-allowed'}`} disabled={!query}>
                        <FontAwesomeIcon icon={faSearch} size='lg' className="fa-fw" />
                    </button>
                    <button aria-label={dict.search.filter}
                        title={dict.search.filter}
                        type="button" onClick={onFilter}
                        className={`ml-2 h-12 w-12 flex items-center justify-center bg-[#0b4b8a] hover:bg-yellow-500 text-white rounded-full transition-opacity duration-200 ${true && 'opacity-50 bg-gray-600 cursor-pointer'}`}
                        disabled={false}>
                        <FontAwesomeIcon icon={faFilter} size='lg' className="fa-fw" />
                    </button>
                    {/*<button aria-label='Ricerca da foto' type="submit" className={`ml-2 h-12 w-12 flex items-center justify-center bg-[#0b4b8a] hover:bg-yellow-500 text-white rounded-full transition-opacity duration-200 ${true && 'opacity-50 bg-gray-600 cursor-not-allowed'}`} disabled={true}>
            <FontAwesomeIcon icon={faCamera} size='lg' className="fa-fw" />
          </button>
          <button aria-label='Ricerca vocale' type="submit" className={`ml-2 h-12 w-12 flex items-center justify-center bg-[#0b4b8a] hover:bg-yellow-500 text-white rounded-full transition-opacity duration-200 ${true && 'opacity-50 bg-gray-600 cursor-not-allowed'}`} disabled={true}>
            <FontAwesomeIcon icon={faMicrophone} size='lg' className="fa-fw" />
          </button>*/}
                </div>
                {/* {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
            <div className="px-4 py-2 text-gray-700 font-semibold">{dict.search.suggestedLabel}</div>
            {suggestions.map((suggestion, index) => (
              <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700" onClick={() => setQuery(suggestion)}>
                {suggestion}
              </div>
            ))}
          </div>
        )} */}
            </form>
        </div>
    );
};

export default SearchForm;
