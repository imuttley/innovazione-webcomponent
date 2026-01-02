import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { form2pdf } from "./lib/form2pdf";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "./costants";
import type { formTTEC, scheda, SchedaData } from "./lib/type";
import * as dictit from "./ui/it.json";
import * as dicten from "./ui/en.json";
import React, { useEffect, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


interface Printprops {
    id: string
}

export const DownloadPDFButton: React.FC<Printprops> = ({
    id
}) => {

    const [formdata, setFormdata] = useState<formTTEC | null>(null);

    const langAttribute = document.getElementsByTagName('html')[0]!.getAttribute('lang');
    const lang: "en" | "it" = langAttribute === 'it' ? 'it' : 'en';
    const dict = lang === 'it' ? dictit : dicten;

    const getAndDownload = async () => {
        if (formdata) {
            const form = await (await fetch(`${BASE_URL}/v1/record/${formdata.scheda_num}`)).json() as SchedaData;
            const slug = lang === 'it' ? formdata.slug_it : formdata.slug_en;
            const pdfBlob = await form2pdf(form, lang, dict, `${BASE_URL}/scheda/${lang}/${slug}`);
            if (!pdfBlob) {
                console.log("error creating pdf");
                return;
            }
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${slug}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    const askform = async () => {
        const resp = await fetch(`${BASE_URL}/v1/publiccard/${id}`);
        if (resp.status === 200) {
            const form = await resp.json() as formTTEC;
            setFormdata(form);
        } else {
            console.log("error fetching form data for cardnumber " + id + " status " + resp.status);
        }
    }

    useEffect(() => {
        getAndDownload();
    }, [formdata]);

    const dwlpdf = () => {
        if (id !== undefined) {
            askform();
        }
    };

    const label = lang === 'it' ? 'Scarica PDF' : 'Download PDF';
    const title = lang === 'it' ? 'stampa' : 'print';

    return <button vocab="https://schema.org/" typeof="DownloadAction" property="potentialAction" title={title} aria-label={label} type="button" onClick={dwlpdf} className="ml-5 p-2  bg-[#0b4b8a] hover:bg-[#2b6baa] mt-8 text-white rounded-md cursor-pointer">
        {label}<FontAwesomeIcon icon={faPrint} size='xl' className="fa-fw" />
    </button>
}