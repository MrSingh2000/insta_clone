import React from 'react'
import { DesktopNav, MobileNav } from './Navbar';
import { TbSend } from "react-icons/tb";
import { useSelector } from 'react-redux';
import nopp from "../static/home/no_pp.jpg";
import { useState } from 'react';
import { sendPrivateMessage, socket } from '../socket';
import { useEffect } from 'react';
import audioSrc from "../static/mess_audio.mp3";

function Chat() {
    let chats = useSelector((store) => store.adminChat.value);
    let admin = useSelector((store) => store.userDetails.value);
    const [mess, setMess] = useState("");
    let audio;

    const [nowChat, setNowChat] = useState({ friend: "", pic: "", chat: [] });
    const [chatMess, setChatMess] = useState([]);
    const handleClick = (index) => {
        setNowChat({ friend: chats[index].friend, pic: chats[index].pic, chat: chats[index].chat });
        setChatMess(chats[index].chat);
        setMess("");
    }

    const sendMessage = (username) => {
        // console.log("message sent")
        sendPrivateMessage(username, mess, admin.username);
        setChatMess((cMessages) => [...cMessages, {
            from: "a",
            to: "b",
            message: mess,
        }]);
    }

    useEffect(() => {
        socket.on("private message recieve", ({ message, from }) => {
            handleAudio();
            if (nowChat.friend === from) {
                setChatMess((cMessages) => [...cMessages, {
                    from: "b",
                    to: "a",
                    message: message,
                }]);
            }
            else {
                console.log("pass");
            }
        })
    }, [nowChat]);
    
    const handleAudio = () => {
        audio = new Audio(audioSrc);
        audio.play();
    }


    return (
        <div className="flex flex-col items-center h-screen overflow-hidden">
            <DesktopNav />

            <div className={`flex lg:w-8/12 w-full justify-center grow`} style={{ marginTop: '60px' }}>
                <div className={`${nowChat.friend ? "hidden sm:block" : ""} grow sm:w-40 text-center`}>
                    <p className="border-l-2 border-r-2">Username</p>
                    <div className="container border-t-2 border-l-2 border-r-2 flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 shadow">
                        <ul className="flex flex-col divide divide-y w-full overflow-auto h-4/6">
                            {chats?.length === 0 ? (
                                <li className="h-20 flex justify-center items-center font-semibold text-sm">
                                    <p>
                                        No chats available
                                    </p>
                                </li>
                            ) : chats?.map((item, index) => {
                                return (
                                    <li key={item._id} onClick={() => handleClick(index)} className="flex flex-row w-full items-start">
                                        <div className="select-none cursor-pointer flex p-4">
                                            <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                                                {/* eslint-disable-next-line */}
                                                <a href="#" className="block relative">
                                                    <img alt="profil" src={item.pic ? item.pic : nopp} className="mx-auto object-cover rounded-full h-10 w-10" />
                                                </a>
                                            </div>
                                            <div className="flex-1 pl-1 mr-16">
                                                <div className="font-medium dark:text-white">
                                                    {item.friend}
                                                </div>
                                                <div className="text-gray-600 dark:text-gray-200 text-sm">
                                                    Developer
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="w-8/12 sm:block hidden flex border-l-2 border-r-2">
                    {!nowChat.friend ? (
                        <>
                            <div className="flex flex-col">

                                <div className="h-full mt-52 flex justify-center items-center flex-col">
                                    <TbSend size={100} className="p-4 border-4 border-black rounded-full" />
                                    <p className="text-xl">Your Messages</p>
                                    <p className="text-sm">Send private photos and messages to a friend.</p>
                                </div>
                            </div>

                        </>
                    ) : chatMess.length === 0 ? (
                        <>
                            <div className="flex flex-col">
                                <div className="flex p-2 items-center sticky border-b-2">
                                    <img src={nowChat.pic ? nowChat.pic : nopp} alt="pp" className="mx-2 object-cover rounded-full h-10 w-10" />
                                    <p className="font-semibold">{nowChat.friend}</p>
                                </div>

                                <div className="h-full text-xs italic grow mt-52 flex justify-center items-center flex-col">
                                    No new chats
                                </div>
                                <div className="flex flex-col items-center my-5">
                                    <input onChange={(e) => setMess(e.target.value)} className="ml-2 w-52 border-2 rounded-xl p-1" type="text" placeholder="Say Hi!" />
                                    <button onClick={() => sendMessage(nowChat.friend)} type="button" className="m-2 py-1 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-36 rounded-lg ">
                                        Send
                                    </button>

                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col h-full w-full overflow-hidden">

                                <div className="flex p-2 items-center sticky border-b-2">
                                    <img src={nowChat.pic ? nowChat.pic : nopp} alt="pp" className="mx-2 object-cover rounded-full h-10 w-10" />
                                    <p className="font-semibold">{nowChat.friend}</p>
                                </div>

                                <div className="p-1 overflow-auto h-4/6 block">
                                    {/* <ul className="h-full overflow-auto"> */}
                                    {chatMess.map((item, index) => {
                                        return (
                                            <p key={index} style={{
                                                float: `${item.from === 'a' ? 'right' : 'left'}`,
                                                clear: 'both',
                                                maxWidth: '20rem'
                                            }} className={` m-1 p-1 rounded-lg bg-yellow-200`}>
                                                {item.message}
                                            </p>
                                        )
                                    })}
                                    {/* </ul> */}
                                </div>

                                <div className="flex border-2">
                                    <input onChange={(e) => setMess(e.target.value)} className="w-full ml-2 rounded-xl p-1" type="text" placeholder="send message" />
                                    <button onClick={() => sendMessage(nowChat.friend)} type="button" className="mx-2 py-1 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-13 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Send
                                    </button>

                                </div>

                            </div>
                        </>
                    )}

                </div>

                {/* mobile chat*/}
                {nowChat.friend ? (
                    <div className={`sm:hidden block mt-15 w-full mx-2`}>
                        {chatMess.length === 0 ? (
                            <>
                                <div className="flex flex-col">
                                    <div className="flex p-2 items-center sticky border-b-2">
                                        <img src={nowChat.pic ? nowChat.pic : nopp} alt="pp" className="mx-2 object-cover rounded-full h-10 w-10" />
                                        <p className="font-semibold">{nowChat.friend}</p>
                                    </div>

                                    <div className="h-full text-xs italic grow mt-52 flex justify-center items-center flex-col">
                                        No new chats
                                    </div>
                                    <div className="flex flex-col items-center my-5">
                                        <input onChange={(e) => setMess(e.target.value)} className="ml-2 w-52 border-2 rounded-xl p-1" type="text" placeholder="Say Hi!" />
                                        <button onClick={() => sendMessage(nowChat.friend)} type="button" className="m-2 py-1 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-36 rounded-lg ">
                                            Send
                                        </button>

                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col h-full w-full overflow-hidden">

                                    <div className="flex p-2 items-center sticky border-b-2">
                                        <img src={nowChat.pic ? nowChat.pic : nopp} alt="pp" className="mx-2 object-cover rounded-full h-10 w-10" />
                                        <p className="font-semibold">{nowChat.friend}</p>
                                    </div>

                                    <div className="p-1 overflow-auto h-4/6 block">
                                        {/* <ul className="h-full overflow-auto"> */}
                                        {chatMess.map((item, index) => {
                                            return (
                                                <p key={index} style={{
                                                    float: `${item.from === 'a' ? 'right' : 'left'}`,
                                                    clear: 'both',
                                                    maxWidth: '20rem'
                                                }} className={` m-1 p-1 rounded-lg bg-yellow-200`}>
                                                    {item.message}
                                                </p>
                                            )
                                        })}
                                        {/* </ul> */}
                                    </div>

                                    <div className="flex mt-8">
                                        <input onChange={(e) => setMess(e.target.value)} className="border-2 w-full ml-2 rounded-xl p-1" type="text" placeholder="send message" />
                                        <button onClick={() => sendMessage(nowChat.friend)} type="button" className="mx-2 py-1 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-13 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            Send
                                        </button>

                                    </div>

                                </div>
                            </>)}

                    </div>) : (null)}

            </div>

            <MobileNav />
        </div >
    )
}

export default Chat