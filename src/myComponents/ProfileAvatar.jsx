import { useState } from 'react';
import PropTypes from 'prop-types';
export default function ProfileAvatar({ profile }) {
    const [failed, setFailed] = useState(null);
    return <span className="profile-avatar">{profile.profileImage && profile.profileImage !== failed ? <img src={profile.profileImage} alt="" onError={() => setFailed(profile.profileImage)} /> : (profile.name || 'You').split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase()}</span>;
}
ProfileAvatar.propTypes = { profile: PropTypes.object.isRequired };
