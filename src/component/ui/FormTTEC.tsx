import type { formTTEC } from "../lib/type";
import { timeAgo } from "../lib/utils";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import * as dictit from "./it.json";
import * as dicten from "./en.json";
import { BASE_URL } from "../contants";

interface formTTECProps {
    width: number;
    height: number;
    cardnumber: number;
    lang: string;
    chunk: string;
    score: number | null;
    hidden?: boolean
    //onClick:(val:string)=>void
}

const FormTTEC: React.FC<formTTECProps> = ({ width, height, cardnumber, chunk, score, hidden = false }) => {

    const [formdata, setFormdata] = useState<formTTEC>();
    const [thumb, setThumb] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [classes, setClasses] = useState<string[]>([]);
    const [cat, setCategories] = useState<string[]>([]);
    const [rights, setRights] = useState<string[]>([]);
    const [lastupdate, setUpdate] = useState<string>();
    const [slug, setSlug] = useState<string>('');
    const [trl, setTrl] = useState<string>('');
    const [tech, setTech] = useState<boolean>(true);
    //const [rscore,setScore] = useState<number>(0.0);

    const lang = document.getElementsByTagName('html')[0]!.getAttribute('lang') || 'en';
    const dict = lang === 'it' ? dictit : dicten;

    const getThumb = async () => {
        const resp = await fetch(`${BASE_URL}/v1/cardthumb/${cardnumber}`);
        if (resp.status === 200) {
            const thumb = await resp.json() as { src: string };
            setThumb(thumb.src);
        }
    }

    useEffect(() => {
        if (cardnumber !== undefined) {
            const askform = async () => {
                //const resp = await fetch(`/api/form/${cardnumber}`);
                const resp = await fetch(`${BASE_URL}/v1/publiccard/${cardnumber}`);
                if (resp.status === 200) {
                    // const form = JSON.parse(await resp.text()) as formTTEC;
                    const form = await resp.json() as formTTEC;
                    setFormdata(form);
                } else {
                    console.log("error fetching form data for cardnumber " + cardnumber + " status " + resp.status);
                }
            }
            askform();
        }
    }, []);

    useEffect(() => {
        if ((formdata !== undefined) && (formdata !== null)) {
            //console.log(formdata);

            setTitle(lang === 'it' ? formdata.title_it : formdata.title_en);
            setSlug(lang === 'it' ? formdata.slug_it! : formdata.slug_en!);
            setClasses(formdata.class!);
            setRights(formdata.rights!);
            setUpdate(formdata.lastupdate!);
            setTrl(formdata.trl!);
            setDescription(chunk);
            setCategories([formdata.category!]);
            setTech(formdata.category!.toLowerCase().startsWith("tecnolog"));
            getThumb();
        }
    }, [chunk, formdata, lang]);

    // parse if an html tag is present
    const mydecode = (text: string) => {

        const start = text.indexOf("<b>");
        const stop = text.indexOf("<\/b>");
        if (start < 0)
            return (<span>{decode(text)}</span>);
        const partt = decode(text.slice(0, start));
        const word = decode(text.slice(start + 3, stop));
        const rest = decode(text.slice(stop + 4));
        return (<span>{partt}<span className="rounded-full font-semibold">{word}</span>{mydecode(rest)}</span>)
    }

    const scoreToText = (score: number) => {
        if (score > 0.8)
            return <>{dict.search.match}</>
        return <>{dict.search.maybe}</>
    }

    //flex ***items-center***  justify-center transition-all duration-800 ${showfilter ? "max-h-400" : "max-h-0"}`
    /// center item on h 

    return (
        <div className={`flex max-h-[${3 * height}px] justify-center transition-opacity duration-300 ease-in-out  ${hidden ? "opacity-50" : "opacity-100"}`}>
            {/*restrict card **max-w-4xl** */}
            <div className="w-full mx-auto p-4">
                <div onClick={() => window.location.href = `${BASE_URL}/scheda/${lang}/${slug}`} className="bg-background-light dark:bg-background-dark shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row border border-primary/20 dark:border-primary/30 cursor-pointer hover:bg-gray-200">
                    {/* no badge 2025-11-20*/}
                    {/* Badge of scores or none */}
                    {true && score !== null &&
                        (<div className={`absolute ${score! > 0.6 ? 'bg-green-500 text-black' : score! < 0.3 ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'} rounded-full h-10 w-40 flex items-center justify-center text-sm font-bold shadow-lg`}>
                            {scoreToText(score!)}
                        </div>)
                    }

                    <div className={`md:w-1/4 pt-8 pl-8 object-cover transition-opacity duration-500 ${thumb ? "opacity-100" : "opacity-0"}`}>
                        {title && thumb && (//w-full
                            // altetnative text is nearby warning
                            <img alt="" width={width} height={height} className={`max-h-[200px] `} src={thumb} />
                        )}
                    </div>

                    <div className="md:w-3/4 p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-800 mb-2">{decode(title)}</h2>
                            {/*text appears as heading*/}
                            <h3 className="text-xl text-gray-800 my-2">id: {cardnumber} </h3>
                            {/* <div className="grid grid-flow-col auto-cols-max md:auto-cols-min gap-4"> */}
                            <div className="flex flex-wrap items-center gap-4">
                                {classes.sort((clsa, clsb) => clsa.length - clsb.length).map((cls, indx) => {
                                    if (cls !== '') return <span key={indx} className="bg-emerald-600 text-white whitespace-nowrap px-2 py-1 rounded-full text-xs font-semibold truncate">{cls}</span>
                                })}
                            </div>
                            <div className="flex items-center space-x-2 my-4">
                                {cat.map((ent, indx) => {
                                    if (ent !== '') return <span key={indx} className="bg-fuchsia-600 text-white px-2 py-1 rounded-full text-xs font-semibold">{ent}</span>
                                })}
                            </div>
                            <div className="flex items-center space-x-2 mb-4">
                                {rights.map((ent, indx) => {
                                    if (ent !== '') return <span key={indx} className="bg-sky-600 text-white px-2 py-1 rounded-full text-xs font-semibold">{ent}</span>
                                })}
                            </div>
                            {description !== undefined && (
                                <p className="text-gray-900 dark:text-gray-400 text-sm md:text-xl">
                                    {mydecode(decode(description))}
                                </p>)}
                        </div>
                        <div className="mt-6 flex justify-between">
                            {tech && <p className="text-xs text-gray-500 dark:text-gray-500">TRL {trl}</p>}
                            {!tech && <p className="text-xs text-gray-500 dark:text-gray-500">--</p>}
                            <p className="text-xs text-gray-500 dark:text-gray-500">{timeAgo(lastupdate!)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export { FormTTEC }
