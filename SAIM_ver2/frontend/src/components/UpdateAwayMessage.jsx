import { Fragment, useState, useEffect, useContext } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import aolemoji from "../images/aolemoji.png";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import Boop from "./Boop";
import { animated } from 'react-spring';
const UpdateAwayMessage = (props) => {
    console.log("pros", props);
    // const { id } = useParams();
    const [awayMessageLabel, setAwayMessageLabel] = useState(props.label);
    console.log(awayMessageLabel);
    const [awayMessage, setAwayMessage] = useState(props.message);
    const [awayMessageCreator, setAwayMessageCreator] = useState(props.creator);


    const helper = (message, object) => {
        console.log(message, object);
        return object;
    };

    const [open, setOpen] = useState(false);
    const [awayMessagesList, setAwayMessagesList] = useState([]);
    console.log("awaymlist", awayMessagesList);
    const [usersList, setUsersList] = useState([]);
    const { user, setUser, socket } = useContext(UserContext);
    const userScreenName = user["screenName"];

    const [errors, setErrors] = useState([]);

        useEffect(() => {
        axios
            .get("http://localhost:8000/api/awayMessages/")
            .then((response) =>
                setAwayMessagesList(
                    response.data,
                    response.data.awayMessageCreator,
                    console.log("All Away Messages:", response.data)
                )
            )
            .catch((err) => console.log(err));
    }, []);


    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8000/api/awayMessages/" + props.id)
    //         .then((response) =>{
    //             setAwayMessageLabel(response.data.awayMessageLabel)
    //             setAwayMessage(response.data.awayMessage)
    //             setAwayMessageCreator(response.data.awayMessageCreator)
    //         }
    //         )
    //         .catch((err) => console.log(err));
            
    // }, []);

        const newAwayMessage = {
            awayMessageLabel: awayMessageLabel,
            awayMessageCreator: user.screenName,
            awayMessage: awayMessage,
        }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .put("http://localhost:8000/api/awayMessages/" + helper("id", props.id), newAwayMessage)
            .then(() => {
              console.log("Creation successful on backend")
              alert("Away Message has been updated!")
            })
            .catch((err) => {
                console.log(err);
                const errorRes = err.response.data.error.errors;
                const errorArray = [];
                for (const key of Object.keys(errorRes)) {
                    errorArray.push(errorRes[key].message);
                }
                setErrors(errorArray);
            });
    };
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <div className="grid grid-cols-1 content-center">
                <Fragment>
                    <div>
                        <Boop rotation={"2"} timing={"200"}>
                            <Button
                                onClick={handleOpen}
                                variant="gradient"
                                color="green"
                                size="lg"
                            >
                                <div className="text-sm font-extrabold">Update Away Message</div>
                            </Button>
                        </Boop>
                    </div>
                    <Dialog open={open} handler={handleOpen}>
                        <DialogHeader>
                            Update an Away Message
                            <img
                                src={aolemoji}
                                style={{ height: "100px", width: "150px" }}
                                alt="aolemoji"
                            />
                        </DialogHeader>
                        <DialogBody divider>
                            <div>
                                
                                <form onSubmit={onSubmitHandler}>
                                    {
                        errors.length > 0 && errors.map((error, i)=>(
                            <>
                                <p key ={i} className="text-danger">{error}</p>
                            </>
                        ))
                    }
                                    <div className="flex w-72 flex-col gap-6">
                                        <Input
                                            type="text"
                                            color="purple"
                                            label="Away Message Title"
                                            value={awayMessageLabel}
                                            onChange={(e) =>
                                                setAwayMessageLabel(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Input
                                            type="text"
                                            color="indigo"
                                            value={awayMessage}
                                            label="Away Message"
                                            onChange={(e) =>
                                                setAwayMessage(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="m-4 animate-bounce">
                                        <Boop rotation={"15"} timing={"200"}>
                                            <Button
                                                type="submit"
                                                variant="gradient"
                                                color="green"
                                            >
                                                <span>Update!</span>
                                            </Button>
                                        </Boop>

                                    </div>
                                </form>
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
        </>
    );
};
export default UpdateAwayMessage;
