import { Properties } from "../util/Properties";
import ToastFactory from "../util/ToastFactory";
import Background from "./components/Background";
import IconBar from "./components/IconBar";
import StatusBar from "./components/StatusBar";
import Windows from "./Windows";

export function Dashboard() {

    if(!Properties.USER && !Properties.tryLogin()) {
        window.location.href = "/login";
    }

    return (
        <>
            <Background />
            <StatusBar />
            <IconBar />
            <Windows />
        </>
    );
}