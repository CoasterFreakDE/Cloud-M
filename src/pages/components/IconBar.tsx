import React from "react";

import '../styles/icon-bar.scss'

import MusicSVG from '../../svgs/Music.svg'
import MediaSVG from '../../svgs/Media.svg'
import FilesSVG from '../../svgs/Files.svg'
import RadioSVG from '../../svgs/Radio.svg'
import SettingsSVG from '../../svgs/Settings.svg'
import LogoutSVG from '../../svgs/Logout.svg'
import { CallbackFactory } from "../../util/CallbackFactory";

export default class IconBar extends React.Component {


    openFiles() {
        CallbackFactory.getInstance().executeCallbacks("openFiles");
    }

    openMusic() {
        CallbackFactory.getInstance().executeCallbacks("openMusic");
    }

    openMedia() {
        CallbackFactory.getInstance().executeCallbacks("openMedia");
    }

    openRadio() {
        CallbackFactory.getInstance().executeCallbacks("openRadio");
    }

    openSettings() {
        CallbackFactory.getInstance().executeCallbacks("openSettings");
    }

    openLogout() {
        CallbackFactory.getInstance().executeCallbacks("openLogout");
    }


    render() {
        return <div className="icon-bar">
            <div className="icon-bar__item" onClick={this.openMusic}>
                <img className="icon-bar__img" src={MusicSVG} alt="MusicSVG Logo" />
            </div>
            <div className="icon-bar__item" onClick={this.openMedia}>
                <img className="icon-bar__img" src={MediaSVG} alt="MediaSVG Logo" />
            </div>
            <div className="icon-bar__item" onClick={this.openFiles}>
                <img className="icon-bar__img" src={FilesSVG} alt="FilesSVG Logo" />
            </div>
            <div className="icon-bar__item" onClick={this.openRadio}>
                <img className="icon-bar__img" src={RadioSVG} alt="RadioSVG Logo" />
            </div>
            <div className="icon-bar__item" onClick={this.openSettings}>
                <img className="icon-bar__img" src={SettingsSVG} alt="SettingsSVG Logo" />
            </div>
            <div className="icon-bar__item" onClick={this.openLogout}>
                <img className="icon-bar__img" src={LogoutSVG} alt="LogoutSVG Logo" />
            </div>
        </div>
    }
}