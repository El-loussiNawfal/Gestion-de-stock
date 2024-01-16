
function Main({ children, mid }) {
    return (
        <div className="main-content">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className={mid ? "col-12 col-lg-10 col-xl-8" : "col-12"}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main