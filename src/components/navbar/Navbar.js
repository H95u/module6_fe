import {Button, Input} from "@material-tailwind/react";

export default function Navbar() {


    return (
        <div className={"nav"}>
            <div className={"row"}>
                <div id={"logo"}>
                    <img src={"/banner/logo.png"}/>
                </div>
                <div className={"col-lg-6"}>
                    <div className="relative flex w-full gap-2 md:w-max">
                        <Input
                            type="search"
                            label="Nhập tên..."
                            className="pr-20"
                            containerProps={{
                                className: "min-w-[300px]",
                            }}
                        />
                        <Button size="sm" className="!absolute right-1 top-1 rounded">
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
                <div className={"col-lg-6"}>
                    <Button
                        variant="gradient"
                        size="sm"
                        className="hidden lg:inline-block"
                    >
                        <span>Đăng nhập</span>
                    </Button>
                </div>

            </div>
        </div>
    );
}