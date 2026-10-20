import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

function ResumeAttachCard({ job }) {
    const { user } = useSelector(state => state.user);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [resumeFile, setResumeFile] = useState(null);
    const [allowedApply, setAllowedApply] = useState(false);

    useEffect(() => {
        async function appliedJob() {
            if (user && job) {
                const url = `${import.meta.env.VITE_API_BASE_URL}/applications/applicable`
                await axios.post(url, { jobId: job._id }, { withCredentials: true })
                    .then(() => setAllowedApply(true))
                    .catch(() => setAllowedApply(false))/*console.log(error, "|| Unable to fetch list");*/
            }
        }
        appliedJob();
    }, [job, user]);

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append("jobId", job._id);
        if (resumeFile) formData.append("resume", resumeFile);
        else {
            console.error("No resume attached");
            return;
        }

        try {
            toast({
                description: "Your application is uploading",
                style: {
                    backgroundColor: '#00fff2',
                    color: 'black'
                }
            })
            const url = `${import.meta.env.VITE_API_BASE_URL}/applications`;
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            console.log("Application submitted successfully:", response.data);
            toast({
                description: "Your application has successfull uploaded",
                style: {
                    backgroundColor: '#90ee90',
                    color: 'black'
                }
            })
            setTimeout(() => {
                window.location.href = '/employee/applied_jobs';
            }, 1300);
        } catch (error) {
            console.error("Error submitting application:", error);
            toast({
                description: error?.response?.data?.message,
                style: {
                    backgroundColor: '#ff5151',
                    color: 'black'
                }
            })
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setResumeFile(file); // Store the selected file in state

    };

    return <form className="resume-form" onSubmit={handleSubmit(onSubmit)}>
        {allowedApply ? <><label htmlFor="resume-upload">Attach your resume</label><input id="resume-upload" type="file" {...register('resume', { required: true })} onChange={handleFileChange} aria-invalid={Boolean(errors.resume)} aria-describedby={errors.resume ? 'resume-error' : undefined} />{errors.resume && <span id="resume-error" className="field-error" role="alert">Attach your resume before applying.</span>}<button type="submit" disabled={isSubmitting} className="primary-link">{isSubmitting ? 'Submitting…' : 'Send application ↗'}</button></> : <p>Application unavailable. You may have already applied for this role.</p>}
    </form>;
}
ResumeAttachCard.propTypes = { job: PropTypes.object.isRequired };
export default ResumeAttachCard;
