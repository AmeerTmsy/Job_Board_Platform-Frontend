import { useParams } from 'react-router-dom';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import EmployerFormLayout from '@/myComponents/EmployerFormLayout';
import EmployerCompanyForm from '@/myComponents/EmployerCompanyForm';

export default function EditCompany() {
    const { id } = useParams();
    const [company, loading, error] = useFetchDataDetail(`companies/${id}`);
    return <EmployerFormLayout company editing loading={loading} error={error || (!loading && !company ? 'Company not found.' : undefined)}>{company && <EmployerCompanyForm key={company._id} company={company} />}</EmployerFormLayout>;
}
