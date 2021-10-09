import React from "react";
import Background from "./components/Background";
import IconBar from "./components/IconBar";
import StatusBar from "./components/StatusBar";
import Windows from "./Windows";

export default class Dashboard extends React.Component {

    render() {
        return (
            <>
                <Background />
                <StatusBar />
                <IconBar />
                <Windows />
            </>
        );
    }

}