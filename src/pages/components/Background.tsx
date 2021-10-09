import React from "react";
import '../styles/background.scss'

type backgroundState = {
    background: string;
}

export default class Background extends React.Component<any, backgroundState> {

    constructor(props: any) {
        super(props);
        this.state = {
            background: "assets/img/wallpaper.jpg"
        }
    }


    render() {
        const { background } = this.state;
        console.log(background);
        return (
            <div className="background">
                <div className="background-image" style={{backgroundImage: `url("${background}")`}}/>
            </div>
        );
    }
}