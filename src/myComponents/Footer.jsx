import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Footer() {
    const isAdmin = useSelector(state => state.user.user?.userType === 'admin');
    if (isAdmin) return <footer className="site-footer admin-footer"><Link className="brand" to="/">hired<span className="brand-dot">.</span></Link><span>Administration</span></footer>;
    return <footer className="site-footer"><Link className="brand" to="/">hired<span className="brand-dot">.</span></Link><p>A little ambition. A whole new chapter.</p><span>Built for your next move.</span></footer>;
}
