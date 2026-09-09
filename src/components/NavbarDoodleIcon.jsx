const iconPaths = {
    home: (
        <>
            <path d="m4 10 8-7 8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
            <path d="M9 20v-6h6v6M2 11l10-9 10 9" />
        </>
    ),
    about: (
        <>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="8" cy="10" r="2" />
            <path d="M5.5 16c.8-2 4.2-2 5 0M13 9h5M13 13h5M13 17h3" />
        </>
    ),
    skills: (
        <>
            <path d="m14 5 5 5M4 20l3.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10Z" />
            <path d="m12 7 5 5M5 16l3 3M3 21l3-1" />
        </>
    ),
    projects: (
        <>
            <path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
            <path d="M3 9h18" />
        </>
    ),
    contact: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6M4 18l5-5M20 18l-5-5" />
        </>
    ),
};

export default function NavbarDoodleIcon({ name }) {
    return (
        <svg className="navbar-doodle-icon" viewBox="0 0 24 24" aria-hidden="true">
            {iconPaths[name]}
        </svg>
    );
}