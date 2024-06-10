interface Props {
    message: string
    handleConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined
    handleCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export function MyConfirm(props: Props) {

    return (
        <>
            <div className="modal-header">Confirm</div>
            <div className="modal-content">
                {props.message}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-cancel" onClick={props.handleCancel}>Cancel</button>
                <button type="button" className="btn btn-confirm" onClick={props.handleConfirm}>Confirm</button>
            </div>
        </>
    )
}