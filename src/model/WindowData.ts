export interface WindowData {
    id: string;
    title: string;

    draggable: boolean;
    resizable: boolean;

    x: number;
    y: number;
    width: number;
    height: number;

    minWidth: number;
    minHeight: number;

    content: JSX.Element;

    zIndex: number;
}