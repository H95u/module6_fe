import {Button, Input} from "@material-tailwind/react";

export default function Navbar() {


    return (
        <div className={"nav"}>
            <div className={"row"}>
                <div id={"logo"}>
                    <img src={"/loverLogo.png"}/>
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


            </div>
        </div>
    );
}