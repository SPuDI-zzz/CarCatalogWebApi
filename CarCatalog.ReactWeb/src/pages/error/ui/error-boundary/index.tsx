import { Outlet } from "react-router-dom";
import ErrorPage from "../error-page";
import React from "react";

export default class ErrorBoundary extends React.Component<any, any> {
    state: {
        hasError: boolean;
        error?: any;
    }

    constructor(props: any) {
        super(props);

        this.state = {
            hasError: false,
            error: undefined,
        }
    }

    static getDerivedStateFromError(error: any) {
        return {
            hasError: true,
            error: error
        }
    }

    componentDidCatch(error: any, errorInfo: React.ErrorInfo): void {
        console.log("ОШИБКА!");
        console.error(error);
        console.error(errorInfo);
    }
    
    render(): React.ReactNode {
        if (this.state.hasError) {
            return <ErrorPage error={this.state.error}/>
        } else {
            return <Outlet/>
        }
    }
}
