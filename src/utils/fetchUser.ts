export const fetchNewsById = async (id: string) => {
    try {
        const res = await fetch(`NEXT_PUBLIC_API_BASE_URL/api/news/${id}`, { cache: 'no-store' });
        const data = await res.json();
        return data
    } catch (err) {
        console.log(err)
    }
}

export const fetchNewsByLimit = async() => {
    const res = await fetch('NEXT_PUBLIC_API_BASE_URL/api/getNews?limit=3', { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch news');
    }
    return res.json();
}

export const fetchNewsAll = async() => {
    const res = await fetch('NEXT_PUBLIC_API_BASE_URL/api/getNews', { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch news');
    }
    return res.json();
}
export const fetchNewsByCategory = async(id: string) => {
    const res = await fetch(`NEXT_PUBLIC_API_BASE_URL/api/getNews?category=${id}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch news');
    }
    return res.json();
}
export const fetchCategory = async() => {
    const res = await fetch('NEXT_PUBLIC_API_BASE_URL/api/categories', { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch category');
    }
    return res.json();
}
