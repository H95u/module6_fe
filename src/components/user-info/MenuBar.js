import React from "react";

export default function MenuBar () {
    return(
        <>
            <div className={"setting_main-menu col-lg-3 col-md-3 col-sm-12 col-xs-12"}>
                <div className={"menu"}>
                    <div className={"menu_setting  panel-group"}>
                        <div className={"menu__setting--main panel panel-default"}>
                            <div className={"panel-heading"}>
                                <div className={"panel-title"}>
                                    <a aria-expanded={"true"} role={"button"} href={"#"}>
                                        "TÀI KHOẢN"
                                        <i className={"fas fa-chevron-down"}></i>
                                    </a>
                                </div>
                            </div>
                            <div className={"panel-collapse collapse in"}>
                                <div className={"panel-collapse collapse in"}>
                                    <div className={"panel-body"}>
                                        <div className={"panel-group"}>
                                            <div className={"menu_setting-sub panel panel-default"}>
                                                <div className={"setting_main"}>
                                                    <div className={"active panel-title"}>
                                                        <i className={"fas fa-user-tie"}>
                                                            "Thông tin cá nhân"
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"menu_setting-sub panel panel-default"}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}