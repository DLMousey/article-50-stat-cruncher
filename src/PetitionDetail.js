import React, { Component } from 'react';

class PetitionDetail extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: this.props.loading
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <div className="col-sm-12">
                    <b className="d-block">Petition Description</b>
                    <em className="d-block">{this.props.description}</em>
                </div>
            );
        }

        return (
            <div className="col-sm-12">
                <b className="d-block">Petition Description</b>
                <em className="d-block">Loading petition description...</em>
            </div>
        );
    }
}

export default PetitionDetail;