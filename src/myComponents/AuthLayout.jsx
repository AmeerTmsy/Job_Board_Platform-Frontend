import { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowUpRight, Compass, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthRoleContext } from './AuthRoleContext';

export default function AuthLayout({ signup = false, children }) {
    const [role, setRole] = useState('employee');
    const employer = role === 'employer';
    const StoryIcon = employer ? Users : Compass;
    return <AuthRoleContext.Provider value={{ role, setRole }}>
        <main className="auth-page">
            <section className="auth-story">
                <Link className="back-link" to="/">← Back to jobs</Link>
                <div className="auth-story-copy">
                    <span className="eyebrow">{employer ? 'GREAT TEAMS START WITH GREAT PEOPLE' : 'YOUR AMBITION DESERVES A PLACE TO GROW'}</span>
                    <h1>{employer ? signup ? <>Your next great hire.<br /><em>Starts here.</em></> : <>Welcome back.<br /><em>Build what’s next.</em></> : signup ? <>Your next chapter.<br /><em>Starts with you.</em></> : <>Your next move.<br /><em>Is waiting for you.</em></>}</h1>
                    <p>{employer ? signup ? 'Introduce your company, post your first job, and connect with candidates who can move your team forward.' : 'Find candidates, manage your job listings, and pick up the conversations that bring your next hire closer.' : signup ? 'Share your experience, discover teams that inspire you, and find work that fits your ambitions.' : 'Explore fresh opportunities, revisit your saved jobs, and follow the progress of your applications.'}</p>
                    <div className="auth-art" aria-hidden="true"><StoryIcon size={62} strokeWidth={1} /><span>{employer ? 'Find your people.' : 'Find your direction.'}<br /><strong>{employer ? 'Grow your team.' : 'Make your move.'}</strong></span><Sparkles size={27} /></div>
                </div>
                <div className="auth-story-bottom"><span className="small-dot" />{employer ? 'Good people. Great possibilities.' : 'Work that takes you somewhere.'}<ArrowUpRight size={16} /></div>
            </section>
            <section className="auth-panel"><div className="auth-panel-inner"><span className="eyebrow">{signup ? 'LET’S GET TO KNOW YOU' : 'PICK UP WHERE YOU LEFT OFF'}</span><h2>{signup ? 'Make yourself at home.' : 'Welcome back.'}</h2><p className="auth-intro">{employer ? signup ? 'Create an employer account and find your next great hire.' : 'Log in to find candidates and manage your hiring.' : signup ? 'Create your profile and open the door to what’s next.' : 'Log in to find your next great opportunity.'}</p>{children}</div></section>
        </main>
    </AuthRoleContext.Provider>;
}
AuthLayout.propTypes = { signup: PropTypes.bool, children: PropTypes.node.isRequired };
