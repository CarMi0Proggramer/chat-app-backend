import type { Server } from "socket.io";
import { MessageModel } from "../models/message";
import { ChatRoomModel } from "../models/chatroom";
import { JWT } from "../utils/jwt";
import { UserModel } from "../models/user";
import { MessageMapper } from "../mappers/message";

export default (io: Server) => {
    io.on("connection", (socket) => {
        socket.emit("connection", "WebSockets connected...");

        socket.on("msg", async (data) => {
            const userData = JWT.verify(data.userToken);

            if (typeof userData == "object" && userData.role == "user") {
                const user = await UserModel.getByEmail(userData.email);

                if (user) {
                    const chatRoom = await ChatRoomModel.getByName(
                        data.roomName
                    );
                    const message = await MessageModel.create(
                        data.msg,
                        user,
                        chatRoom
                    );
                    const mappedMessage = MessageMapper.map(message);

                    socket.emit("msg", mappedMessage);
                }
            }
        });

        socket.on("disconnection", async (userEmail) => {
            const user = await UserModel.getByEmail(userEmail);

            if (user) {
                UserModel.setDisconnected(user.id);
                UserModel.setLastConnectionTime(user.id);

                console.log(
                    "WebSockets disconnected for user with id: ",
                    user.id
                );
            }
        });
    });
};
