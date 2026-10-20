const TARGETS = '.hero-copy, .companies-hero > div:first-child, .account-page-heading, .auth-panel-inner, .job-card, .company-card, .talent-card, .application-card, .detail-panel, .profile-panel, .company-profile-hero, .detail-hero, .account-shortcuts > a, .employer-stats > button';

// One shared observer handles initial cards, appended pages, and route changes.
// Native animations avoid an animation-library download for these small effects.
export function installRevealMotion(root, environment = window) {
    if (!environment.IntersectionObserver || !environment.MutationObserver || !environment.Element.prototype.animate) return () => {};
    const reducedMotion = environment.matchMedia('(prefers-reduced-motion: reduce)');
    const seen = new WeakSet();
    const pending = new Set();
    const active = new Map();

    const clear = element => {
        pending.delete(element);
        element.classList.remove('motion-wait');
        active.get(element)?.cancel();
        active.delete(element);
    };
    const observer = new environment.IntersectionObserver(entries => {
        let order = 0;
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target;
            observer.unobserve(element);
            pending.delete(element);
            if (reducedMotion.matches || !root.contains(element)) { clear(element); continue; }
            const animation = element.animate([
                { opacity: 0, translate: '0 18px' },
                { opacity: 1, translate: '0 0' },
            ], {
                duration: 440,
                delay: Math.min(order++ % 3 * 45, 90),
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                fill: 'both',
            });
            active.set(element, animation);
            element.classList.remove('motion-wait');
            animation.finished.then(() => {
                if (active.get(element) === animation) clear(element);
            }).catch(() => {});
        }
    }, { threshold: 0, rootMargin: '0px 0px -12px 0px' });

    const collect = node => {
        if (node.nodeType !== 1) return [];
        return [...(node.matches(TARGETS) ? [node] : []), ...node.querySelectorAll(TARGETS)];
    };
    const register = element => {
        if (seen.has(element)) return;
        seen.add(element);
        if (reducedMotion.matches) return;
        element.classList.add('motion-wait');
        pending.add(element);
        observer.observe(element);
    };
    root.querySelectorAll(TARGETS).forEach(register);
    const mutations = new environment.MutationObserver(records => {
        for (const record of records) {
            record.removedNodes.forEach(node => collect(node).forEach(element => { observer.unobserve(element); clear(element); }));
            record.addedNodes.forEach(node => collect(node).forEach(register));
        }
    });
    mutations.observe(root, { childList: true, subtree: true });
    const onPreferenceChange = () => {
        if (!reducedMotion.matches) return;
        [...pending, ...active.keys()].forEach(element => { observer.unobserve(element); clear(element); });
    };
    reducedMotion.addEventListener('change', onPreferenceChange);
    return () => {
        observer.disconnect();
        mutations.disconnect();
        reducedMotion.removeEventListener('change', onPreferenceChange);
        [...pending, ...active.keys()].forEach(clear);
    };
}
