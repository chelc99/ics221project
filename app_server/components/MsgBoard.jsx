const React = require("react");
const MsgList = require("./MsgList.jsx");
const NewMsg = require("./NewMsg.jsx");

class MsgBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    };

    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    fetch(`${process.env.API_URL}/msgs`)
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        this.setState({
          messages: result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }

  addMessage(message) {
    // let msgs = this.state.messages;
    // let id = msgs.length + 1;

    // add id attribute
    // message.id = id;
    // append to array
    // msgs.push(message);
    
    // reverse sort by id
    // msgs.sort((a, b) => a.id - b.id);

    // update state var
    // this.setState({
    //   messages: msgs
    // });

    // update back-end data
    fetch(`${process.env.API_URL}/msgs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
      .then(response => this.handleHTTPErrors(response))
      .then(result => result.json())
      .then(result => {
        this.setState({
          messages:
          [result].concat(this.state.messages)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <NewMsg addMsgCallback={this.addMessage} />
        <MsgList messages={this.state.messages} />
      </div>
    );
  }
}

module.exports = MsgBoard;