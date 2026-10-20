import { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { installRevealMotion } from '@/lib/revealMotion';

export default function MotionSurface({ children }) {
    const root = useRef(null);
    useLayoutEffect(() => installRevealMotion(root.current), []);
    return <div className="app-shell" ref={root}>{children}</div>;
}
MotionSurface.propTypes = { children: PropTypes.node.isRequired };
