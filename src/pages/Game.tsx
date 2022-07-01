import {Button, Image, Input, useToast} from "@chakra-ui/react";
import {useAppDispatch} from "hooks";
import React, {useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import logo from "../assets/Logo.png";

function Game() {


    const gamePinRef = useRef<HTMLInputElement>(null);

    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { game_id } = useParams();

    async function handleLogin() {
        const game = gamePinRef.current?.value;

        if (!game ) {
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

        // const res = await api.post("/auth", {
        //     email: email,
        //     password: password,
        // });

        // if (res.status === 200) {
        //     dispatch(login(res.data));
        //     navigate("/library");
        //     return;
        // }

        toast({
            title: "Enter game failed.",
            description: "Something was wrong.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
    }

    return (
        <div className="w-full h-screen flex justify-center bg-gray-200">
            <div className="w-1/3 flex flex-col items-center justify-center space-y-12 bg-white my-20 rounded-3xl">
                <div >
                    <Image h="100" src={logo} />
                </div>
                <div className="w-full px-20 flex flex-col space-y-6">
                    <div>
                        <Input
                            ref={gamePinRef}
                            type="text"
                            placeholder="Game pin"
                            focusBorderColor="green.300"
                        />
                    </div>
                    <Button
                        backgroundColor="green.600"
                        colorScheme="green"
                        color="white"
                        size="md"
                        onClick={handleLogin}
                    >
                        Enter
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Game;
