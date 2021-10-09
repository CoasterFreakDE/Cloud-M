import React from "react";
import { WindowData } from "../model/WindowData";
import Window from "../pages/components/Window";
import { CallbackFactory } from "../util/CallbackFactory";
import { WindowManagement } from "../util/WindowManagement";

type windowState = {
    windows: WindowData[],
    mouseX: number,
    mouseY: number;
}

export default class Windows extends React.Component<any, windowState> {

    setMousePosition(position: { x: number; y: number; }) {
        this.setState({
            mouseX: position.x,
            mouseY: position.y
        });
    }

    componentDidMount() {
        const updateMousePosition = (ev: { clientX: number; clientY: number; }) => {
            this.setMousePosition({ x: ev.clientX, y: ev.clientY });
        };

        
        window.addEventListener("mousemove", updateMousePosition);
        
        
        new WindowManagement();
        this.setState({
            windows: []
        });

        CallbackFactory.getInstance().addCallback("addWindow", (window: WindowData) => {
            this.setState({
                windows: [...this.state.windows, window]
            });
        });

        CallbackFactory.getInstance().addCallback("removeWindow", (windowId: string) => {
            console.log("removeWindow", windowId);
            setTimeout(() => {
                this.setState({
                    windows: this.state.windows.filter((window) => window.id !== windowId)
                });
            }, 50);
        });

        CallbackFactory.getInstance().addCallback("moveWindow", (windowId: string, x: number, y: number) => {
            this.setState({
                windows: this.state.windows.map((window) => {
                    if (window.id === windowId) {
                        window.x = this.state?.mouseX - x;
                        window.y = this.state?.mouseY - y;
                    }
                    return window;
                })
            });
        });

        CallbackFactory.getInstance().addCallback("resizeWindow", (windowId: string, width: number, height: number) => {
            this.setState({
                windows: this.state.windows.map((window) => {
                    if (window.id === windowId) {
                        window.width = width;
                        window.height = height;
                    }
                    return window;
                })
            });
        });
        
        CallbackFactory.getInstance().addCallback("focusWindow", (windowId: string) => {
            this.setState({
                windows: this.state.windows.map((window) => {
                    if (window.id === windowId) {
                        window.zIndex = this.state.windows.length;
                    } else {
                        window.zIndex = window.zIndex - 1;
                    }
                    return window;
                })
           });
        });
    }


    render() {

        let windows = this.state?.windows?.map((window) => {
            return <Window 
                        key={window.id}
                        id={window.id}
                        title={window.title}
                        draggable={window.draggable}
                        resizable={window.resizable}

                        x={window.x}
                        y={window.y}
                        width={window.width}
                        height={window.height}

                        minWidth={window.minWidth}
                        minHeight={window.minHeight}

                        content={window.content}

                        zIndex={window.zIndex}
                     />
        });

        return (
            <>{windows}</>
        );
    }

}
