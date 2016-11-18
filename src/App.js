import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    value: `  thread 'v1::tests::mocked::eth::rpc_eth_sign_transaction' panicked at 'assertion failed: \`(left == right)\` (left: \`Some("{\\"jsonrpc\\":\\"2.0\\",\\"result\\":{\\"raw\\":\\"0xf869018609184e72a0008276c094d46e8dd67c5d32be8058bb8eb970870f07244567849184e72a801ca02a6d18dffb60d0e01d24bedaba7e5c70b9916c4e2040ec18f33a102c000f9bc5a071423b228fcf4fbb2fc6cdc2ea1e87a8be3dbd13784b02132a5b92ae2c8a2aa4\\",\\"tx\\":{\\"blockHash\\":null,\\"blockNumber\\":null,\\"creates\\":null,\\"from\\":\\"0x3bb005236cac6920a1cac3d635a7e3c767675b59\\",\\"gas\\":\\"0x76c0\\",\\"gasPrice\\":\\"0x9184e72a000\\",\\"hash\\":\\"0x90e7f6031b5f5d872c8aafc4b25432dc0315c6acdf5e939a770a43442ff0b48e\\",\\"input\\":\\"0x\\",\\"nonce\\":\\"0x1\\",\\"publicKey\\":\\"0x558c4e4263ccbe3d2384a3582063636b0e129715fe92eb4d57f53d05db6079587fec622d35a6d98e78f6ec8044609818b95850c5f47735ef29b3ecb3d69c180f\\",\\"r\\":\\"0x2a6d18dffb60d0e01d24bedaba7e5c70b9916c4e2040ec18f33a102c000f9bc5\\",\\"raw\\":\\"0xf869018609184e72a0008276c094d46e8dd67c5d32be8058bb8eb970870f07244567849184e72a801ca02a6d18dffb60d0e01d24bedaba7e5c70b9916c4e2040ec18f33a102c000f9bc5a071423b228fcf4fbb2fc6cdc2ea1e87a8be3dbd13784b02132a5b92ae2c8a2aa4\\",\\"s\\":\\"0x71423b228fcf4fbb2fc6cdc2ea1e87a8be3dbd13784b02132a5b92ae2c8a2aa4\\",\\"to\\":\\"0xd46e8dd67c5d32be8058bb8eb970870f07244567\\",\\"transactionIndex\\":null,\\"v\\":1,\\"value\\":\\"0x9184e72a\\"}},\\"id\\":1}")\`, right: \`Some("{\\"jsonrpc\\":\\"2.0\\",\\"result\\":{\\"raw\\":\\"0xf869018609184e72a0008276c094d46e8dd67c5d32be8058bb8eb970870f07244567849184e72a801ca02a6d18dffb60d0e01d24bedaba7e5c70b9916c4e2040ec18f33a102c000f9bc5a071423b228fcf4fbb2fc6cdc2ea1e87a8be3dbd13784b02132a5b92ae2c8a2aa4\\",\\"tx\\":{\\"blockHash\\":null,\\"blockNumber\\":null,\\"creates\\":null,\\"from\\":\\"0x3bb005236cac6920a1cac3d635a7e3c767675b59\\"\\"gas\\":\\"0x9184e72a000\\",\\"gasPrice\\":\\"0x9184e72a000\\",\\"hash\\":\\"0x90e7f6031b5f5d872c8aafc4b25432dc0315c6acdf5e939a770a43442ff0b48e\\",\\"input\\":\\"0x\\",\\"nonce\\":\\"0x1\\",\\"publicKey\\":\\"0x558c4e4263ccbe3d2384a3582063636b0e129715fe92eb4d57f53d05db6079587fec622d35a6d98e78f6ec8044609818b95850c5f47735ef29b3ecb3d69c180f\\",\\"r\\":\\"0x2a6d18dffb60d0e01d24bedaba7e5c70b9916c4e2040ec18f33a102c000f9bc5\\",\\"raw\\":\\"0x\\"f869018609184e72a0008276c094d46e8dd67c5d32be8058bb8eb970870f07244567849184e72a801ca02a6d18dffb60d0e01d24bedaba7e5c70b9916c4e2040ec18f33a102c000f9bc5a071423b228fcf4fbb2fc6cdc2ea1e87a8be3dbd13784b02132a5b92ae2c8a2aa4\\"\\",\\"s\\":\\"0x71423b228fcf4fbb2fc6cdc2ea1e87a8be3dbd13784b02132a5b92ae2c8a2aa4\\",\\"to\\":\\"0xd46e8dd67c5d32be8058bb8eb970870f07244567\\",\\"transactionIndex\\":null,\\"v\\":\\"1\\",\\"value\\":\\"0x9184e72a\\"}},\\"id\\":1}")\`)', rpc/src/v1/tests/mocked/eth.rs:825`,
    error: null,
    left: null,
    right: null
  };

  componentDidMount() {
    this.reParse({
      target: {
        value: this.state.value
      }
    });
  }

  reParse = (el) => {
    const regex = /left: `(.+)`, right: `(.+)`/;
    let { value } = el.target;
    value = value.replace(/\\"/g, '"');
    const matches = value.match(regex);
    if (!matches) {
      this.setState({
        value, error: `Unable to find pattern: ${regex}`
      });
    } else {
      const [_, left, right] = matches;
      this.setState({
        error: null,
        value, left, right
      });
    }
  };

  render() {

    const { value } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Failures Visualiser</h2>
        </div>
        <div className="App-container">
          <p className="App-intro">
            Visualise assertion failures from your rust tests.
          </p>
          <div>
            <input className="App-input" type="text" value={ value } onChange={ this.reParse } />
            { this.renderError() }
            { this.renderVis() }
          </div>
        </div>
      </div>
    );
  }

  renderVis() { 
    const { left, right } = this.state;
    if (!left) {
      return null;
    }

    const leftVis = [].map.call(left, (char, idx) => {
      if (char === right[idx]) {
        return (<span key={idx} className="diff-ok">{char}</span>);
      }

      return (<span key={idx} className="diff-bad">{char}</span>);
    });

    const rightVis = [].map.call(right, (char, idx) => {
      if (char === left[idx]) {
        return (<span key={idx} className="diff-ok">{char}</span>);
      }

      return (<span key={idx} className="diff-bad">{char}</span>);
    })

    return (
      <div style={{width:'100%',overflow:'auto'}}>
        <pre>{ leftVis }</pre>
        <pre>{ rightVis }</pre>
      </div>
    );
  }

  renderError() {
    const { error } = this.state;

    return (
      <p className="error">{ error ? error : '' }</p>
    );
  }
}

export default App;
