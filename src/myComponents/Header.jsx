import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, BriefcaseBusiness, ChevronDown, Menu, X, UserRound, Pencil, Plus, Building2, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getNavigation, isNavigationActive } from '@/lib/navigation';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import ThemeColor from './icon/ThemeColor';

export default function Header() {
    const { user, isLoggedIn } = useSelector(state => state.user);
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggle = useRef(null);
    const header = useRef(null);
    const menuId = useId();
    const role = user?.userType;
    const links = getNavigation(role, isLoggedIn);
    const closeMenu = () => setMenuOpen(false);
    const accountPath = `/${role}/account`;
    const home = isLoggedIn && role === 'employer' ? '/employer/employer_jobs_listed' : '/';

    useEffect(() => { setMenuOpen(false); }, [location.pathname]);
    useEffect(() => {
        if (!menuOpen) return;
        const escape = event => { if (event.key === 'Escape') { setMenuOpen(false); toggle.current?.focus(); } };
        const outside = event => { if (!header.current?.contains(event.target)) setMenuOpen(false); };
        document.addEventListener('keydown', escape);
        document.addEventListener('pointerdown', outside);
        return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside); };
    }, [menuOpen]);

    const navigation = links.map(item => <Link key={item.to} to={item.to} className={isNavigationActive(location.pathname, item) ? 'active' : ''} aria-current={isNavigationActive(location.pathname, item) ? 'page' : undefined} onClick={closeMenu}>{item.label}</Link>);
    return <header className="site-header app-navigation" ref={header}><div className="header-inner">
        <Link to={home} className="brand" aria-label="Hired home" onClick={closeMenu}><span className="brand-mark"><BriefcaseBusiness size={21} /></span>hired<span className="brand-dot">.</span></Link>
        <nav className="desktop-navigation" aria-label="Main navigation">{navigation}</nav>
        <div className="header-actions"><ThemeColor />
            {isLoggedIn ? <>
                <DropdownMenu><DropdownMenuTrigger asChild><button type="button" className={`header-account ${location.pathname.includes('/account') ? 'account-active' : ''}`} aria-label="Account menu"><span className="account-link">{user?.name?.charAt(0).toUpperCase() || 'A'}</span><ChevronDown size={14} /></button></DropdownMenuTrigger>
                    <DropdownMenuContent className="header-account-menu" align="end" sideOffset={10}>
                        <DropdownMenuLabel><span className="account-menu-name">{user?.name || 'Your account'}</span><span className="account-menu-role">{role === 'admin' ? 'Administrator' : role === 'employer' ? 'Employer' : 'Job seeker'}</span></DropdownMenuLabel><DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link to={accountPath}><UserRound size={16} />My profile</Link></DropdownMenuItem>
                        {role !== 'admin' && <DropdownMenuItem asChild><Link to={`/${role}/account_edit`}><Pencil size={16} />Edit profile</Link></DropdownMenuItem>}
                        {role === 'employer' && <><DropdownMenuSeparator /><DropdownMenuItem asChild><Link to="/employer/company_create"><Plus size={16} />Add a company</Link></DropdownMenuItem><DropdownMenuItem asChild><Link to="/employer/new_job_create"><Plus size={16} />Post a job</Link></DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem asChild><Link to="/employer/companies"><Building2 size={16} />Browse companies</Link></DropdownMenuItem><DropdownMenuItem asChild><Link to="/"><Search size={16} />Browse all jobs</Link></DropdownMenuItem></>}
                    </DropdownMenuContent>
                </DropdownMenu>
            </> : <><Link className="login-link desktop-auth" to="/login">Log in</Link><Link className="primary-link desktop-auth" to="/sign_up">Get started <ArrowUpRight size={16} /></Link></>}
            <button className="mobile-menu-toggle" type="button" ref={toggle} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls={menuId} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        <nav id={menuId} className="mobile-navigation" aria-label="Mobile navigation" hidden={!menuOpen}>{navigation}{isLoggedIn ? <Link to={accountPath} onClick={closeMenu}>My profile</Link> : <div className="mobile-auth"><Link className="outline-action" to="/login" onClick={closeMenu}>Log in</Link><Link className="primary-link" to="/sign_up" onClick={closeMenu}>Get started <ArrowUpRight size={16} /></Link></div>}</nav>
    </div></header>;
}
