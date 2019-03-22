import React, { Component } from 'react';

import PetitionDetail from './PetitionDetail';
import CountBox from './CountBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      petition: {
        attributes: {
          background: 'Loading...',
          signature_count: 0,
          signatures_by_country: []
        }
      }
    };
  }

  componentDidMount() {
    fetch("https://petition.parliament.uk/petitions/241584.json")
        .then(res => res.json())
        .then(
            (result) => {
              console.log(result.data);
              this.setState({
                error: null,
                isLoaded: true,
                petition: result.data
              });
            }
        )
  }

  getUkSignatureCount = (gbFormat) => {
    if (!this.state.isLoaded)
      return;

    const ukSignatures = this.state.petition.attributes.signatures_by_country.find(vbc =>
        vbc.name == "United Kingdom" && vbc.code == "GB"
    );

    return (gbFormat) ? ukSignatures.signature_count.toLocaleString('en-GB') : ukSignatures.signature_count;
  }

  getUkSignaturePercentage = () => {
    if (!this.state.isLoaded)
      return;

    const ukSignatures = this.getUkSignatureCount(false);
    const totalSignatures = this.state.petition.attributes.signature_count;

    return ((ukSignatures / totalSignatures) * 100).toFixed(2);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-12">
            <PetitionDetail description={this.state.petition.attributes.background} loading={this.state.isLoaded} />
          </div>
        </div>
        <div className="row">
          <CountBox count={this.state.petition.attributes.signature_count.toLocaleString('en-GB')}
                    label="Total Signatures"
                    loading={this.state.isLoaded}
          />
          <CountBox count={this.getUkSignatureCount(true)}
                    label="UK Signatures"
                    loading={this.state.isLoaded}
          />
          <CountBox count={this.getUkSignaturePercentage()}
                    label="% of votes from UK"
                    loading={this.state.isLoaded}
          />
        </div>
      </div>
    );
  }
}

export default App;
