import {io, Socket} from "socket.io-client";
import {Store} from "redux";
import {reloadListPlayer} from "../redux/slices/game";
import Questions from "../types/question";

export default class SocketService {
    private socket?: Socket;
    private static _instance?: SocketService;
    private reduxStore?: Store;

    setReduxStore(store?: Store) {
        if (store) {
            this.reduxStore = store;
        }
    }

    constructor() {
        this.socket = undefined;
    }

    static instance(store?: Store): SocketService {
        if (!SocketService._instance) {
            SocketService._instance = new SocketService();
        }
        SocketService._instance.setReduxStore(store)
        return SocketService._instance;
    }

    userConnect(pin: string, onConnect: () => void, onWaiting: () => void) {
        this.socket = io("http://localhost:5000/");

        this.socket?.on("connect", () => {
            console.log("connect " + this.socket?.id);
            this.sendTypeUser("user")
            this.joinGame(pin)
        });
        this.socket?.on("join_success", () => {
            onConnect()
        })

        this.socket?.on("disconnect", () => {
            console.log("disconnect "); // undefined
        });

        this.socket?.on("waiting", () => {
            onWaiting()
        })

    }

    hostConnect(pin: string) {
        this.socket = io("http://localhost:5000/");

        this.socket?.on("connect", () => {
            console.log("connect " + this.socket?.id);
            this.sendTypeUser("host")
            this.joinGame(pin)
        });


        this.socket?.on("disconnect", () => {
            console.log("disconnect "); // undefined
        });


        this.socket?.on("new_list_player", (players) => {
            console.log("LVA002")
            console.log(players)
            this.reduxStore && this.reduxStore.dispatch(reloadListPlayer({listPlayer: players}))
        })
    }

    joinGame(pin: string) {
        this.socket?.emit("join", pin);
    }

    sendTypeUser(type: string) {
        this.socket?.emit("user_type", type)
    }

    enterName(name: string) {
        this.socket?.emit("enter_name", name);
    }
    startGame() {
        this.socket?.emit("start_game");
    }
    getQuestion(getListQuestion: (quests: Questions[]) => void) {
        console.log("get questions");
        this.socket?.on("questions", (quests: Questions[]) => getListQuestion(quests));

    }
}
