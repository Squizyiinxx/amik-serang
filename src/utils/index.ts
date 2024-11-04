
import { faBullhorn, faDisplay, faNewspaper } from "@fortawesome/free-solid-svg-icons";

export const navLink = [
    {
        name: "Dashboard",
        icon: faDisplay,
        link : '/admin/dashboard'
    },
    {
        name: "News",
        icon : faNewspaper,
        link: '/admin/news'
    },
    {
        name: "Pengumuman",
        icon: faBullhorn,
        link: '/admin/announcement'
    }
]

export const dropdownItem = [
    {
        name: 'Profile',
        link: '/admin/profile'
    },
    {
        name: 'Logout',
        link: 'logout'
    }
]

export const navLinkUser = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'Berita',
        link: '/berita'
    },
    {
        name: 'Visi & Misi',
        link : '/visi'
    }
]