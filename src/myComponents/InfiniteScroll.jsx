import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { LoaderCircle } from 'lucide-react';

export default function InfiniteScroll({ loading, error, hasMore, loadMore, count }) {
    const sentinel = useRef(null);
    useEffect(() => {
        if (loading || error || !hasMore || !('IntersectionObserver' in window)) return;
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) loadMore();
        }, { rootMargin: '0px 0px 400px 0px' });
        if (sentinel.current) observer.observe(sentinel.current);
        return () => observer.disconnect();
    }, [loading, error, hasMore, loadMore]);
    return <div className="infinite-scroll" ref={sentinel}>
        {loading ? <p role="status"><LoaderCircle size={18} className="animate-spin" />Loading more…</p> : error ? <><p role="alert">{error}</p><button className="outline-action" onClick={loadMore}>Try again</button></> : hasMore ? <button className="outline-action" onClick={loadMore}>Load 9 more</button> : count > 0 ? <p role="status">You’ve seen all {count} results.</p> : null}
    </div>;
}
InfiniteScroll.propTypes = { loading: PropTypes.bool.isRequired, error: PropTypes.string, hasMore: PropTypes.bool.isRequired, loadMore: PropTypes.func.isRequired, count: PropTypes.number.isRequired };
