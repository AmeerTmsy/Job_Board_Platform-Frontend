import { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, ArrowRight } from 'lucide-react';
export default function SearchBar({ field, setUrlParam }) {
    const [inputValue, setInputValue] = useState('');
    return <form className="job-search" onSubmit={event => { event.preventDefault(); setUrlParam(inputValue.trim() ? `?searchKey=${encodeURIComponent(inputValue.trim())}` : ''); }}>
        <Search size={21} aria-hidden="true" /><input aria-label={`Search ${field}`} placeholder={field === 'Job' ? 'Job title, keyword, or company' : `Search ${field.toLowerCase()}`} value={inputValue} onChange={event => setInputValue(event.target.value)} /><button type="submit">Search <ArrowRight size={17} /></button>
    </form>;
}
SearchBar.propTypes = { field: PropTypes.string.isRequired, setUrlParam: PropTypes.func.isRequired };
