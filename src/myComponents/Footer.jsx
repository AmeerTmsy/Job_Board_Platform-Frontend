import { Link } from 'react-router-dom';
export default function Footer() {
    return <footer className="site-footer"><Link className="brand" to="/">hired<span className="brand-dot">.</span></Link><p>A little ambition. A whole new chapter.</p><span>Built for your next move.</span></footer>;
}
