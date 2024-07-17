import React from "react";
import { Outlet } from "react-router-dom";

import Title from "../Components/Title";
import Navbar from "../Components/NavbarMojo";
import MojoSearch from "../Components/MojoSearch";
import ChatList from "../Components/Chat/ChatList";
import Chat from "../Components/Chat/Chat";
import { useMyChatsQuery } from "../../redux/api/api";
import { useSelector } from "react-redux";
import { ChatsLoader } from "./MojoLoaders";
import useErrors from "../Hooks/Errors";

function MojoLayout () {

    const user = useSelector(state => state.auth.user)

    const {isLoading, data, isError, error, refetch} = useMyChatsQuery(user?._id)

    useErrors([{isError, error}])

    

    return (
        <>
            <Title/>
            <div className="w-full h-auto fixed top-0">
                <Navbar />
                <div className="w-full h-[60px] sm:hidden flex justify-center items-center">
                    <MojoSearch />
                </div>
            </div>
            <div className="h-[100vh] w-full flex justify-center items-end flex-row">
                <div className="h-[calc(100vh-130px)] sm:h-[calc(100vh-70px)] w-full flex flex-row items-center">
                    <div className="hidden sm:flex flex-col h-full sm:w-[40%] xl:w-[22%] items-center relative">
                        <div className=" w-[90%] ">
                            <MojoSearch/>
                        </div>
                        <div className="w-[90%] h-[calc(100vh-200px)] overflow-y-auto" id="scrollHome">
                            {
                                isLoading ? 
                                <ChatsLoader /> : <ChatList chats={data?.chats} />
                            }
                        </div>
                    </div>
                    <div className="w-full h-full flex justify-center items-center sm:hidden">
                        <div className="w-[90%] max-w-[400px] h-[95%] bg-green-300 rounded-xl">
                            <ChatList />
                        </div>
                    </div>
                    <div className="hidden sm:flex h-full sm:w-[60%] xl:w-[60%]">
                        <Chat />
                    </div>
                    <div className="hidden h-full xl:block xl:w-[18%]">Third</div>
                </div>
            </div>
        </>
    )
}

export default MojoLayout