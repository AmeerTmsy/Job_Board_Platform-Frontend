import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, LoaderCircle, WifiOff } from 'lucide-react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { authenticatUser } from '@/redux/slices/userSlice';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import AccountLayout from '@/myComponents/AccountLayout';
import ProfileAvatar from '@/myComponents/ProfileAvatar';
export default function AccountEdit() {
    const { user } = useSelector(state => state.user);
    const [account, loading, error] = useFetchDataDetail(`${user.userType === 'employee' ? 'users' : 'employers'}/${user.id || user._id}`);
    return <AccountLayout eyebrow="MAKE IT YOURS" title="Tell your story." description="Keep your profile up to date, so the right team can get to know you."><Link className="back-link" to={`/${user.userType}/account`}><ArrowLeft size={15} />Back to profile</Link>{loading ? <div className="detail-panel detail-loading" aria-label="Loading profile editor"><SkeletonCard /></div> : error || !account ? <div className="empty-jobs"><WifiOff size={30} /><h2>We couldn’t load your profile.</h2><p>Please try again in a moment.</p></div> : <ProfileForm key={account._id || user.id} account={account} />}</AccountLayout>;
}
function ProfileForm({ account }) {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [preview, setPreview] = useState(null);
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({ defaultValues: { name: account.name || '', email: account.email || '', profession: account.profession || '', experienced: account.experienced ?? '', bio: account.bio || '' } });
    const image = watch('profileImage')?.[0];
    useEffect(() => { if (!image) { setPreview(null); return; } const url = URL.createObjectURL(image); setPreview(url); return () => URL.revokeObjectURL(url); }, [image]);
    const save = async data => {
        setServerError('');
        const form = new FormData();
        for (const field of ['name', 'email', 'profession', 'experienced', 'bio']) form.append(field, data[field]);
        if (data.profileImage?.[0]) form.append('profileImage', data.profileImage[0]);
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/${user.userType === 'employee' ? 'users' : 'employers'}/${user.id || user._id}`, form, { withCredentials: true });
            const updated = response?.data?.data || {};
            dispatch(authenticatUser({ id: user.id || updated._id, userType: user.userType, name: updated.name || data.name, email: updated.email || data.email, profileImage: updated.profileImage || account.profileImage }));
            toast({ description: 'Your profile is up to date.' });
            navigate(`/${user.userType}/account`);
        } catch (error) { setServerError(error?.response?.data?.message || 'We couldn’t save your changes. Please try again.'); }
    };
    const field = (name, label, type = 'text', options = {}) => <div className="auth-field"><label htmlFor={`profile-${name}`}>{label}</label><input id={`profile-${name}`} type={type} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `profile-error-${name}` : undefined} {...register(name, options)} />{errors[name] && <span id={`profile-error-${name}`} role="alert" className="field-error">{errors[name].message}</span>}</div>;
    return <form className="detail-panel profile-edit-form" onSubmit={handleSubmit(save)} noValidate><div className="profile-photo-edit"><ProfileAvatar profile={{ ...account, profileImage: preview || account.profileImage }} /><div><label htmlFor="profile-image">Profile photo</label><p>A familiar face makes a great first impression.</p><input id="profile-image" type="file" accept="image/*" aria-describedby={errors.profileImage ? 'profile-error-image' : undefined} {...register('profileImage', { validate: files => !files?.[0] || files[0].type.startsWith('image/') || 'Choose an image file.' })} />{errors.profileImage && <span id="profile-error-image" className="field-error" role="alert">{errors.profileImage.message}</span>}</div></div><div className="profile-edit-section"><span className="eyebrow">THE BASICS</span><h2>Your introduction</h2><div className="auth-field-row">{field('name', 'Full name', 'text', { required: 'Enter your name.', maxLength: { value: 25, message: 'Use 25 characters or fewer.' } })}{field('email', 'Email address', 'email', { required: 'Enter your email address.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' } })}</div><div className="auth-field-row">{field('profession', 'Profession')}{field('experienced', 'Years of experience', 'number', { min: { value: 0, message: 'Enter zero or more years.' } })}</div></div><div className="profile-edit-section"><span className="eyebrow">A LITTLE MORE YOU</span><h2>About yourself</h2><div className="auth-field"><label htmlFor="profile-bio">Bio</label><textarea id="profile-bio" rows={5} placeholder="Share your experience, what inspires you, and where you want to go next…" {...register('bio')} /></div></div>{serverError && <div className="auth-error" role="alert">{serverError}</div>}<div className="profile-form-actions"><Link className="outline-action" to={`/${user.userType}/account`}>Cancel</Link><button type="submit" className="primary-link" disabled={isSubmitting}>{isSubmitting ? <LoaderCircle size={16} className="animate-spin" /> : <Check size={16} />}{isSubmitting ? 'Saving…' : 'Save changes'}</button></div></form>;
}
ProfileForm.propTypes = { account: PropTypes.object.isRequired };
