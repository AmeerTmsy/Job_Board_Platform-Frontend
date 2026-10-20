import { Outlet, useLoaderData, useRevalidator } from 'react-router-dom';
import Header from '@/myComponents/Header';
import Footer from '@/myComponents/Footer';
import StorNSdata from '@/verified/storNSdata';
import MotionSurface from '@/myComponents/MotionSurface';

export default function Root() {
    const { sessionError } = useLoaderData();
    const revalidator = useRevalidator();
    return (
        <MotionSurface>
            <Header />
            {sessionError ? (
                <main className="job-detail-page">
                    <section className="empty-jobs" role="alert">
                        <h1>We couldn’t check your session.</h1>
                        <p>Please check your connection and try again.</p>
                        <button className="primary-link" disabled={revalidator.state === 'loading'} onClick={() => revalidator.revalidate()}>
                            {revalidator.state === 'loading' ? 'Checking…' : 'Try again'}
                        </button>
                    </section>
                </main>
            ) : <><StorNSdata /><Outlet /></>}
            <Footer />
        </MotionSurface>
    );
}
