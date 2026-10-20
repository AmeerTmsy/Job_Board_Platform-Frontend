import PropTypes from 'prop-types';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ signup = false, children }) {
    return <main className="auth-page"><section className="auth-story"><Link className="back-link" to="/">← Back to opportunities</Link><div className="auth-story-copy"><span className="eyebrow">A LITTLE AMBITION GOES A LONG WAY</span><h1>{signup ? <>Your next chapter.<br /><em>Starts with you.</em></> : <>Good to see you.<br /><em>Great things ahead.</em></>}</h1><p>New possibilities. Inspiring teams. Work that means something to you. It all starts here.</p><div className="auth-art" aria-hidden="true"><Compass size={62} strokeWidth={1} /><span>Find your direction.<br /><strong>Make your move.</strong></span><Sparkles size={27} /></div></div><div className="auth-story-bottom"><span className="small-dot" /> A world of opportunity <ArrowUpRight size={16} /></div></section><section className="auth-panel"><div className="auth-panel-inner"><span className="eyebrow">{signup ? 'LET’S GET TO KNOW YOU' : 'PICK UP WHERE YOU LEFT OFF'}</span><h2>{signup ? 'Make yourself at home.' : 'Welcome back.'}</h2><p className="auth-intro">{signup ? 'Create your profile and open the door to what’s next.' : 'Log in to find your next great opportunity.'}</p>{children}</div></section></main>;
}
AuthLayout.propTypes = { signup: PropTypes.bool, children: PropTypes.node.isRequired };
