/* eslint-disable functional/no-this-expression */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable functional/no-class */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something was wrong</h1>;
        }
        return this.props.children;
    }
}
