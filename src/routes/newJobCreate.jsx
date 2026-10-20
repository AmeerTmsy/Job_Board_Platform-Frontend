import { useSelector } from 'react-redux';
import { useFetchList } from '@/myHooks/fetchList';
import EmployerFormLayout from '@/myComponents/EmployerFormLayout';
import EmployerJobForm from '@/myComponents/EmployerJobForm';

export default function NewJobCreate() {
    const { user } = useSelector(state => state.user);
    const [companies, loading, error] = useFetchList(`companies?createdBy=${user.id || user._id}`);
    return <EmployerFormLayout><EmployerJobForm companies={Array.isArray(companies) ? companies : []} companiesLoading={loading} companiesError={error} /></EmployerFormLayout>;
}
