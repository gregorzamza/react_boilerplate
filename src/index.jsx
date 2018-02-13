import React from 'react';
import {render} from 'react-dom';

require('./app.scss');
require('./app.less');

class App extends React.Component {
  render () {
    return <p> Hello World</p>;
  }
}

render(<App/>, document.getElementById('app'));