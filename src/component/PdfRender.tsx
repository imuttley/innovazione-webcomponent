import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { form2pdf } from "./lib/form2pdf";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "./costants";
import type { SchedaData } from "./lib/type";
import * as dictit from "./ui/it.json";
import * as dicten from "./ui/en.json";


interface Printprops {
    form: SchedaData;
    slug: string;
}
export function DownloadPDFButton(pro: Printprops) {

    const langAttribute = document.getElementsByTagName('html')[0]!.getAttribute('lang');
    const lang: "en" | "it" = langAttribute === 'it' ? 'it' : 'en';
    const dict = lang === 'it' ? dictit : dicten;


    const dwlpdf = async () => {
        const pdfBlob = await form2pdf(pro.form, lang, dict, `${BASE_URL}/scheda/${lang}/${pro.slug}`);
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${pro.slug}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const label = lang === 'it' ? 'Scarica PDF' : 'Download PDF';
    const title = lang === 'it' ? 'stampa' : 'print';

    return <button title={title} aria-label={label} type="button" onClick={dwlpdf} className="action-button ml-5 p-2  bg-[#0b4b8a] hover:bg-[#2b6baa] mt-8 text-white">
        {label}<FontAwesomeIcon icon={faPrint} size='xl' className="fa-fw" />
    </button>
}