import React from "react";
import '../styles/status-bar.scss'

type ClockState = {
    date: Date
}

export default class StatusBar extends React.Component<any, ClockState> {

    private nameOfMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    componentDidMount() {
        setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    render() {
        const date = this.state?.date;
        if(!date) return <></>;

        const dayOfWeek = date.toLocaleDateString('en-US', {weekday: 'long'});
        const day = date.getDate();
        const month = this.nameOfMonths[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2});
        const minutes = date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2});
        const seconds = date.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2});
        return (
            <div className="status-bar">
                <p className="status-bar-date">{`${day} ${dayOfWeek} ${month} ${year}`}</p>
                <p className="status-bar-time">{`${hours}:${minutes}:${seconds}`}</p>
            </div>
        );
    }
}