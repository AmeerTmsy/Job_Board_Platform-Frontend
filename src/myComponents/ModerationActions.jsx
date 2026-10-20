import PropTypes from 'prop-types';

export default function ModerationActions({ status, updating, subject, onApprove, onReject }) {
    return <div className="moderation-actions" aria-busy={updating}>
        <button type="button" className="moderation-button moderation-approve" disabled={updating || status === 'approved'} onClick={onApprove}>Approve {subject}</button>
        <button type="button" className="moderation-button moderation-reject" disabled={updating || status === 'rejected'} onClick={onReject}>Reject {subject}</button>
    </div>;
}
ModerationActions.propTypes = {
    status: PropTypes.string,
    updating: PropTypes.bool.isRequired,
    subject: PropTypes.string.isRequired,
    onApprove: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
};
