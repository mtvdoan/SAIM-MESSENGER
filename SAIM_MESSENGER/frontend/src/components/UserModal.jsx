import { Fragment, useState, useEffect, useContext } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { animated } from "react-spring";
import axios from "axios";
import Boop from "./Boop";
import aolemoji from "../images/aolemoji.png";

const UserModal = (props) => {
    const helper = (message, object) => {
        console.log(message, object);
        return object;
    };
    // const { email, screenName } = props;
    const [open, setOpen] = useState(false);
    const { user, socket } = useContext(UserContext);
    const [screenName, setScreenName] = useState(props.sn);
    const [email, setEmail] = useState(props.email);

    const [usersList, setUsersList] = useState([]);
    const handleOpen = () => setOpen(!open);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/")
            .then((response) => {
                setUsersList(response.data.allUsers);
                console.log("allusers in usermodal", response.data.allUsers);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 content-starts">
                {usersList.length > 0 &&
                    usersList.map((user, index) => (
                        <div className="flex ml-10">
                            <Fragment>
                                <div className="m-2 text-center flex flex-col m">
                                    <Boop rotation={"2"} timing={"200"}>
                                        <Button
                                            onClick={handleOpen}
                                            color="white"
                                            size="lg"
                                        >
                                            <div className="text-sm font-extrabold">
                                                {user.screenName}
                                            </div>
                                        </Button>
                                    </Boop>
                                </div>
                                <Dialog open={open} handler={handleOpen}>
                                    <DialogHeader
                                        className="text-3xl whitespace-normal"
                                        style={{ maxWidth: "1000px" }}
                                    >
                                        user sn will go here
                                        <Boop rotation={"5"} timing={"200"}>
                                            <img
                                                src={aolemoji}
                                                style={{
                                                    height: "100px",
                                                    width: "150px",
                                                }}
                                                alt="aolemoji"
                                            />
                                        </Boop>
                                    </DialogHeader>
                                    <DialogBody
                                        divider
                                        className="whitespace-normal"
                                    >
                                        <div className="text-2xl">
                                            {}
                                        </div>
                                    </DialogBody>
                                    <DialogFooter>
                                        <div className="">
                                            <Button
                                                variant="text"
                                                color="red"
                                                onClick={handleOpen}
                                                className="mr-1"
                                            >
                                                <span>Cancel</span>
                                            </Button>
                                        </div>
                                    </DialogFooter>
                                </Dialog>
                            </Fragment>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default UserModal;
