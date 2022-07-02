import {Button, Center, Image, Input, Text, useToast} from "@chakra-ui/react";
import {useAppDispatch} from "hooks";
import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/Logo.png";
import SocketService from "../socket/socket-service";
import store from "../redux/store";

function EnterGame() {

    const gamePinRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isPin, setIsPin] = useState<boolean>(true)
    const [isWaiting, setIsWaiting] = useState<boolean>(false)

    async function handleEnterGame() {
        let game = gamePinRef.current?.value;

        if (!game) {
            toast({
                title: "Enter game failed.",
                description: "Game pin is required",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        SocketService.instance(store).userConnect(game, () => {
                setIsPin(false)
                console.log("lva")
            },
            () => {
                setIsWaiting(true)
            })

    }

    async function handleEnterName() {
        let name = nameRef.current?.value;

        if (!name) {
            toast({
                title: "Enter game failed.",
                description: "Name is required",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        SocketService.instance(store).enterName(name)

    }

    return (
        <div className="w-full h-screen flex justify-center bg-gray-200">
            <div className="w-1/3 flex flex-col items-center justify-center space-y-12 bg-white my-20 rounded-3xl">
                <div>
                    <Image h="100" src={logo}/>
                </div>
                {!isWaiting&&<div className="w-full px-20 flex flex-col space-y-6">
                    <div>
                        {isPin && <Input
                            ref={gamePinRef}
                            type="text"
                            placeholder={"Game pin"}
                            focusBorderColor="green.300"
                        />}
                        {!isPin && <Input
                            ref={nameRef}
                            type="text"
                            placeholder={"Name"}
                            focusBorderColor="green.300"
                        />}
                    </div>
                    <Button
                        backgroundColor="green.600"
                        colorScheme="green"
                        color="white"
                        size="md"
                        onClick={isPin ? handleEnterGame : handleEnterName}
                    >
                        Enter
                    </Button>
                </div>}
                {isWaiting&&<div className="w-full px-20 flex flex-col space-y-6">
                    <Center color='teal' fontWeight='bold' fontSize='28'  >
                        Waiting...
                    </Center>
                </div>}

            </div>
        </div>
    );
}

export default EnterGame;
