const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchNewsById = async (id: string) => {
    try {
        const res = await fetch(`${baseUrl}/api/news/${id}`, { cache: 'no-store' });
        const data = await res.json();
        return data
    } catch (err) {
        console.log(err)
    }
}

export const fetchNewsByLimit = async () => {
    const res = await fetch(`${baseUrl}/api/getNews?limit=3`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch news');
    }
    return res.json();
}

export const fetchNewsAll = async () => {
    const res = await fetch(`${baseUrl}/api/getNews`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch news');
    }
    return res.json();
}
export const fetchAnnouncement = async () => {
    const res = await fetch(`${baseUrl}/api/announcement`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch announcement');
    }
    return res.json();
}
export const fetchNewsByCategory = async (id: string) => {
    const res = await fetch(`${baseUrl}/api/getNews?category=${id}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch news');
    }
    return res.json();
}
export const fetchCategory = async () => {
    const res = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch category');
    }
    return res.json();
}