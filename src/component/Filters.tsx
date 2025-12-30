import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import SliderTRL from './ui/SliderTRL';
import * as dictit from './ui/it.json';
import * as dicten from './ui/en.json';
import { FilterEvent } from './event/ComponentEvents';

interface FiltersInterfaceProps {
    applications: string;
    technologies: string;
    licenses: string;
    trl: string;
    showfilter: boolean;
}

const Filters: React.FC<FiltersInterfaceProps> = ({
    applications,
    technologies,
    licenses,
    trl,
    showfilter
}) => {

    const json_applications = JSON.parse(applications) as { cls: string }[];
    const json_licenses = JSON.parse(licenses) as { cls: string }[];
    const json_technologies = JSON.parse(technologies) as { cls: string }[];
    const json_trl = JSON.parse(trl) as { max: number, min: number };


    const [minmax, setMinMax] = useState({ min: json_trl.min, max: json_trl.max });
    const [refresh, setRefresh] = useState(0);
    const [appselected, setAppselected] = useState<string[]>([]);
    const [licselected, setLicselected] = useState<string[]>([]);
    const [otselected, setOtselected] = useState<string[]>([]);
    const prevShowFilter = useRef(showfilter);

    const lang = document.getElementsByTagName('html')[0]!.getAttribute('lang') || 'en';
    const dict = lang === 'it' ? dictit : dicten;

    const thisclearfilters = () => {
        setAppselected([]);
        setLicselected([]);
        setOtselected([]);
        setMinMax({ min: json_trl.min, max: json_trl.max });
        setRefresh(refresh + 1);
    };

    useEffect(() => {
        const filterEvent = new FilterEvent({ appselected, licselected, otselected, minmax });
        dispatchEvent(filterEvent);
    }, [appselected, licselected, otselected, minmax]);

    const toggleApplications = (app: string) => {
        if (appselected.includes(app)) {
            setAppselected(appselected.filter((a) => a !== app));
        } else {
            setAppselected([...appselected, app]);
        }

    };

    const toggleLicense = (license: string) => {
        if (licselected.includes(license)) {
            setLicselected(licselected.filter((l) => l !== license));
        } else {
            setLicselected([...licselected, license]);
        }
    };

    const toggleTechnologies = (ot: string) => {
        if (otselected.includes(ot)) {
            setOtselected(otselected.filter((o) => o !== ot));
        } else {
            setOtselected([...otselected, ot]);
        }
    };

    const trlChange = (min: number, max: number) => {
        if ((minmax.min !== min) || (minmax.max !== max)) {
            setMinMax({ min, max });
        }
    };

    useEffect(() => {
        if (prevShowFilter.current === true && showfilter === false) {
            thisclearfilters();
        }
        prevShowFilter.current = showfilter;
    }, [showfilter]);

    return (
        <div className={`filters mt-2 overflow-hidden transition-all duration-800 w-full ${showfilter ? "max-h-400" : "max-h-0"}`}>
            <div className="applicazione-area my-4 flex justify-center w-full">
                <div className="mx-20 flex flex-wrap gap-1">
                    {json_applications?.map(
                        (d) => {
                            const text: string = d.cls;
                            if (text !== '')
                                return (<span key={text} onClick={() => toggleApplications(text)} className={`${appselected?.includes(text) ? "bg-green-800 text-white" : "bg-green-200 text-black"} cursor-pointer  px-1 py-1 rounded-full hover:bg-red-400 text-sm`}>{text}</span>)
                        }
                    )}
                </div>
            </div>
            <div className="licenza-area my-4 flex justify-center w-full">
                <div className="mx-20 flex flex-wrap gap-1">
                    {json_licenses?.map(
                        (d) => {
                            const text: string = d.cls;
                            if (text !== '')
                                return (<span key={text} onClick={() => toggleLicense(text)} className={`${licselected?.includes(text) ? "bg-blue-800 text-white" : "bg-blue-200 text-black"} cursor-pointer  px-1 py-1 rounded-full hover:bg-red-400 text-sm`}>{text}</span>)
                        })
                    }
                </div>
            </div>
            <div className="offtec-area my-4 flex justify-center w-full">
                <div className="mx-20 flex flex-wrap gap-1">
                    {json_technologies?.map(
                        (d) => {
                            const text: string = d.cls;
                            if (text !== '')
                                return (<span key={text} onClick={() => toggleTechnologies(text)} className={`${otselected?.includes(text) ? "bg-purple-800 text-white" : "bg-purple-200 text-black"} cursor-pointer  px-1 py-1 rounded-full hover:bg-red-400 text-sm`}>{text}</span>)
                        })
                    }
                </div>
            </div>

            <div className="tlr-area flex justify-center w-full">
                <SliderTRL onchange={trlChange} minmax={minmax} refresh={refresh} />
            </div>

            <div className="action-buttons flex flex-wrap justify-center gap-1">

                <div className="mb-2 p-2">
                    <button title="dict.search.clearfilters" type="button" onClick={thisclearfilters} className="p-2 rounded-full bg-[#0b4b8a] hover:bg-[#2b6baa] ml-2 text-white">
                        {dict.search.clearfilters} <FontAwesomeIcon icon={faTimesCircle} size='lg' className="fa-fw" />
                    </button>
                    {/* realtime filters */}
                    {/* {applyfilters !== undefined && (
                        <button title={dict.search.searchfilters} type="button" onClick={handleApplyFilters} className="p-2 rounded-full bg-[#0b4b8a] hover:bg-[#2b6baa] ml-2 text-white">
                            {dict.search.searchfilters} <FontAwesomeIcon icon={faSearchPlus} size='lg' className="fa-fw" />
                        </button>)} */}
                </div>
            </div>
        </div>
    );
};

export default Filters;
