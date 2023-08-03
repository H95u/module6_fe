import "./user-info.css"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip, Button,
} from "@material-tailwind/react";

const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
export default function EditUserInfo() {

    return (
        <div className={"user-info"}>
            <Typography variant="h1" color="light-blue" className="mb-2 text-center" textGradient>
                Thông tin cá nhân
            </Typography>
            <div className={"container"}>
                <div className={"col-md-3"}>
                    <Card className="w-96">
                        <CardHeader floated={false} className="h-80">
                            <img className="h-80 w-80 rounded-full object-center mx-auto justify-items-center" src={loggingUser.img} alt="profile-picture"/>
                        </CardHeader>
                        <CardBody>
                            <Button >
                                Cài đặt
                            </Button>
                        </CardBody>
                        <CardFooter className="flex justify-center gap-7 pt-2">
                            <Tooltip content="Like">
                                <Typography
                                    as="a"
                                    href="#facebook"
                                    variant="lead"
                                    color="blue"
                                    textGradient
                                >
                                    <i className="fab fa-facebook"/>
                                </Typography>
                            </Tooltip>
                            <Tooltip content="Follow">
                                <Typography
                                    as="button"
                                    href="#"
                                    variant="lead"
                                    color="light-blue"
                                    textGradient
                                >
                                    <i className="fab fa-twitter"/>
                                </Typography>
                            </Tooltip>
                            <Tooltip content="Follow">
                                <Typography
                                    as="button"
                                    href="#"
                                    variant="lead"
                                    color="purple"
                                    textGradient
                                >
                                    <i className="fab fa-instagram"/>
                                </Typography>
                            </Tooltip>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>

    )
}