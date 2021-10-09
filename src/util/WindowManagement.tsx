import { CallbackFactory } from "./CallbackFactory";
import { Properties } from "./Properties";
import { WindowData } from "../model/WindowData";
import FileWindow from "../pages/components/windows/FileWindow";

export class WindowManagement {


    constructor() {
        CallbackFactory.getInstance().addCallback("openFiles", () => {
            const id = Properties.createRandomToken(5)
            const window: WindowData = {
                id: id,
                title: `Files`,
                draggable: true,
                resizable: true,
                x: 750,
                y: 400,
                width: 1048,
                height: 512,
                minWidth: 300,
                minHeight: 300,
                content: <FileWindow key={id} />,
                zIndex: 1000
            }

            CallbackFactory.getInstance().executeCallbacks("addWindow", window);
        });
    }

}