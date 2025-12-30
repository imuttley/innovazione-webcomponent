export const extractSchedanum = (text: string): number => {
    const parts: string[] | null = text.match('^TTEC_([0-9]+)_([0-9]+)');
    const docid: string = parts![1]!;
    return parseInt(docid);
}

export const timeAgo = (datestr: string): string => {
    const date: Date = new Date(datestr);

    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 4) {
        return date.toLocaleDateString();
    }
    if (weeks > 0) {
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    }
    if (days > 0) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    }
    if (hours > 0) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }
    if (minutes > 0) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }
    return "just now";
}
