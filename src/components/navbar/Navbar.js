import "./Navbar.css"
export default function Navbar () {
    return (
        <>
            <header className="menu_header" id="header-menu">
                <div className="menu_navbar fix-menu">
                    <div className="navbar-header">
                        <a href="/" className="logo">
                            <img src="./loverLogo.png" alt="logo lover"/>
                        </a>
                    </div>
                    <div className="navbar">
                        <ul className="nav navbar-nav navbar-left">
                            <li className="item-search">
                                <nav className="Navbar_Item">
                                    <div className="Navbar_Link">
                                        <div className="Group-search visible">
                                            <span className="search input-group">
                                                <input type="text" placeholder="Nickname/Url..." className="form-control"/>
                                                    <span className="input-group-addon">
                                                    <button type="button" className="btn btn-default">
                                                        <i className="fa fa-search" aria-hidden="true"></i>
                                                    </button>
                                                    </span>
                                            </span>
                                        </div>
                                    </div>
                                </nav>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-center">
                            <li className="item-icon">
                                <a href="" className="group-user active">
                                    <i className="fa fa-home" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="item-icon group-fb">
                                <a href=""></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}