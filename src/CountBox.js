import React, { Component } from 'react';

class CountBox extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: this.props.loading
        };
    }

    render() {
        if (!this.state.loading) {
            return (
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">

                            <h3 className="d-block">{this.props.count}</h3>
                            <p className="d-block">{this.props.label}</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                        <h3 className="d-block">Loading...</h3>
                        <p className="d-block">{this.props.label}</p>
                    </div>
                </div>
            </div>
        )

    }
}

export default CountBox;