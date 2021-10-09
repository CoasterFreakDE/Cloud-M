import React, { ReactElement } from "react";
import Toast from 'react-bootstrap/Toast'
import { Properties } from "./Properties";

type ToastState = {
    toasts: ReactElement[]
}

export default class ToastFactory extends React.Component<{}, ToastState> {

    private static instance: ToastFactory;

    componentDidMount() {
        ToastFactory.instance = this
        this.setState({toasts: []})
    }

    removeToast() {
        const toasts = this.state.toasts
        toasts.shift()
        this.setState({
            toasts: toasts
        })
    }

    showToast(title: ReactElement | string, body: ReactElement | string, small: ReactElement | string = "") {
        const toasts = this.state.toasts
        toasts.push(<Toast onClose={() => this.removeToast()} show={true} delay={3000} autohide animation={true} key={Properties.createRandomToken(4)}>
        <Toast.Header>
          <strong className="mr-auto">{title}</strong>
          <small>{small}</small>
        </Toast.Header>
        <Toast.Body>{body}</Toast.Body>
      </Toast>)
        this.setState({
            toasts: toasts
        })
    }

    render() {
        const toasts = this.state ? this.state.toasts : [];
        return (
            <div
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'fixed',
                minHeight: '300px',
                minWidth: '500px',
                zIndex: 500,
                top: 0,
                right: 0,
            }}
            >
            <div
                style={{
                position: 'absolute',
                top: 100,
                right: 20,
                }}
            >
            {toasts}
            </div>
        </div>
        )
    }

    public static getInstance(): ToastFactory {
        return ToastFactory.instance;
    }
}