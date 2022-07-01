import {
    Box,
    Button, Center, Flex,
    Image,
    Text,
    useToast
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "hooks";
import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import BACKGROUND from "../assets/img_bacground.webp";
import ICON_USER from "../assets/icon_user.png";
import {get} from 'lodash';
import Report from "../types/report";
import SocketService from "../socket/socket-service";
import store from "../redux/store";

function Play() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {state} = useLocation();
    const socket = SocketService.instance(store);
    const players = useAppSelector((state) => state.game.listPlayer);

    console.log(players)
    let report: Report = get(state, "report", undefined)
    if (!!report) {
        console.log(report)
        socket.hostConnect(report.pin_code)
    } else {
        navigate(-1)
    }
    const handleStart = () => {
        socket.startGame()
    }

    return (
        <Box h='calc(100vh)'>
            <Image src={BACKGROUND} boxSize='100%' pos="absolute"/>
            <Flex h='calc(16vh)' flex={{base: 1}} align="center" pos="absolute" boxShadow="md" borderBottom="1px" borderColor="gray.100" w='100%'>

                <Flex ml="30px" align="center" >
                    <Image boxSize="40px" src={ICON_USER}/>
                    <Text  color='teal' fontWeight='bold' fontSize='30'>
                        {players.length}
                    </Text>
                </Flex>
                <Flex  flex={{base: 1}} align="center" justify="center" >
                    <Text  color='teal' fontWeight='bold' fontSize='40'>
                        PIN: {report.pin_code}
                    </Text>
                </Flex>
                <Button colorScheme='teal' variant='outline' mr='50px' onClick={handleStart}>
                    Start
                </Button>
            </Flex>
            <Flex mt='calc(16vh)' h='calc(84vh)' flex={{base: 1}} align="center" pos="absolute" w='100%'>
                <Flex  flex='1' flexDirection='column' align="center" justify="center" >
                    {players.map((item)=>{
                        return <Text key={item.player_id} color='teal' fontWeight='bold' fontSize='32'>
                            {item.name}
                        </Text>
                    })
                    }

                </Flex>
            </Flex>

        </Box>
    );
}

// style={{
//     height: '100%',
//         width: '100%',
//         position: 'absolute',
// }}
export default Play;
