import React from "react";

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            'innovazione-filter': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                applications: string;
                technologies: string;
                licenses: string;
                trl: string;
                showfilter: boolean;
            },
            'innovazione-search': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                baseurl: string;
            },
            'innovazione-results': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                baseurl: string;
            },
            'innovazione-event-logger': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            }
        }
    }
}
