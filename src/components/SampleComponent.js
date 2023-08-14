import React from 'react';
import SockJsClient from 'react-stomp';

class SampleComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    sendMessage = (msg) => {
        this.clientRef.sendMessage('/topic/messages', "fdsfds");
    }

    render() {
        return (
            <div>
                <button onClick={this.sendMessage}>Click</button>
                <SockJsClient url='http://localhost:8080/api/ws' topics={['/topic/messages']}
                              onMessage={(msg) => { console.log(msg + "oke"); }}
                              ref={ (client) => { this.clientRef = client }} />
            </div>
        );
    }
}

export default SampleComponent