import { useParams } from 'react-router-dom';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import EmployerFormLayout from '@/myComponents/EmployerFormLayout';
import EmployerJobForm from '@/myComponents/EmployerJobForm';

export default function EmployerJobEdit() {
    const { id } = useParams();
    const [job, loading, error] = useFetchDataDetail(`jobs/${id}`);
    return <EmployerFormLayout editing loading={loading} error={error || (!loading && !job ? 'Job not found.' : undefined)}>{job && <EmployerJobForm key={job._id} job={job} />}</EmployerFormLayout>;
}
