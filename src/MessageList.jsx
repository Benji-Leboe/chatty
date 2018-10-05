import React, { Component } from 'react';

function MessageList(props) {
  const elems = [...props.messages, ...props.notifications];

  String.prototype.hashish = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  };

  function isValidUrl (string) {
    try {
      new URL(string);
    } catch (err) {
      return false;  
    }
    return true;
  }

  function parseMessage (content) {
    const re = /\/(.*?)\((.*?)\)/;
    try {
      if (!content.match(re)) {
        throw err;
      };
    } catch (err) {
      return content;
    }
    const regexed = content.match(re);
    const [find, cmd, value] = regexed;
    const message = content.replace(find, "");

    return {message, cmd, value};
  }

  const chatMap = {
    'img': function(url) {
      return (<img key={url.hashish()} className="img-msg" src={ url } />);
    },
    'link': function(url, content) {
      return (<a key={url.hashish()} href={ `//${url}` }> { content || url } </a>);
    },
    'bold': function(content) {
      return (<strong key={content.hashish()}>{ content }</strong>);
    },
    'ital': function(content) {
      return (<em key={content.hashish()}>{ content }</em>);
    },
    'under': function(content) {
      return (<u key={content.hashish()}>{ content }</u>);
    }
  }
  
  

  elems.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  const elemArr = elems.map(message => {
    const { id, timestamp, content, user } = message;
    let msgInsert = content;

    const parsed = parseMessage(msgInsert);

    const cmdConstruct = msgInsert === parsed ? undefined 
      : [parsed.message, chatMap[parsed.cmd](parsed.value)];

    cmdConstruct ? msgInsert = cmdConstruct[0] : msgInsert;


    let colorStyles = (user) ? {color: user.userColor} : {color: "#000000"};

    return (
      <div key={ id.toString() } data-time={ timestamp } className={ `${message.type}` }>

        { message.type === 'messages' && <span className="message-username" style={colorStyles}>
          { user.username || 'Anonymous' }
        </span> }

        <span className={`${message.type}-content`}>
          { cmdConstruct === undefined && msgInsert }  
          { cmdConstruct !== undefined && cmdConstruct }
          { message.type === 'images' && <img className="image" src={ imgLink } /> }
        </span>

        
      </div>
    );
  });

  return (
    <div>{ elemArr }</div>  
  );
}

export default MessageList;