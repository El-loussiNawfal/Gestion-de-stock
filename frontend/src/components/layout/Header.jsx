
function Header({ preTitle, title, action: ActionButton }) {
    return (
        <div className="header mt-md-5">
            <div className="header-body">
                <div className="row align-items-center">
                    <div className="col">
                        <h6 className="header-pretitle">{preTitle}</h6>

                        <h1 className="header-title">{title}</h1>
                    </div>
                    <div className="col-auto">
                        {ActionButton && <ActionButton />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header