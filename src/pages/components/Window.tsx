import React from "react";
import { WindowData } from "../../model/WindowData";
import '../styles/window.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { CallbackFactory } from "../../util/CallbackFactory";

type OffsetState = {
    x: number;
    y: number;
}

export default class Window extends React.Component<WindowData, OffsetState> {

    private dragging = false;

    componentDidMount() {
        setInterval(this.tick.bind(this), 10);
    }

    onWindowDetach = () =>{
        CallbackFactory.getInstance().executeCallbacks("removeWindow", this.props.id);
    }

    focus = () => {
        CallbackFactory.getInstance().executeCallbacks("focusWindow", this.props.id);
    }

    startDragging = (element: any) => {
        const mouseX = element.clientX;
        const mouseY = element.clientY;
        this.setState({
            x: mouseX - parseInt(element.target.parentNode.parentNode.style.left.replace("px", "")),
            y: mouseY - parseInt(element.target.parentNode.parentNode.style.top.replace("px", ""))
        });
        this.dragging = true;
    }

    endDragging = (element: any) => {
        this.dragging = false;
    }

    tick() {
        if(this.dragging) {
            CallbackFactory.getInstance().executeCallbacks("moveWindow", this.props.id, this.state?.x, this.state?.y);
        }
    }

    render() {
        return (
            <div className="window" style={{
                left: this.props.x,
                top: this.props.y,
                width: this.props.width,
                height: this.props.height,
                minWidth: this.props.minWidth,
                minHeight: this.props.minHeight,
                zIndex: this.props.zIndex,
                resize: this.props.resizable ? "both" : "none"
            }} onMouseDown={this.focus}>
                <div className="window-titlebar" onMouseDown={this.startDragging} onMouseUp={this.endDragging}>
                    <div className="window-titlebar-title">{this.props.title}</div>
                    <div className="window-titlebar-buttons">
                        <div className="window-titlebar-button" onClick={this.onWindowDetach}>
                            <FontAwesomeIcon icon={faWindowClose} />
                        </div>
                    </div>
                </div>
                <div className="window-content">
                    {this.props.content}
                </div>
            </div>
        );
    }

}