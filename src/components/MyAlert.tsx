interface Props {
    message: string
    handleConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export function MyAlert(props: Props) {

    return (
        <>
            <div className="modal-header">Alert</div>
            <div className="modal-content">
                {props.message}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-confirm" style={{width: '100%', margin: 0}} onClick={ props.handleConfirm}>Confirm</button>
            </div>
        </>
    )
}