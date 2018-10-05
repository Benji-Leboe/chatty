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
    return hash += (Math.random*10).toString().slice(2,4);
  };

  function isValidUrl (string) {
    try {
      new URL(string);
    } catch (err) {
      return false;  
    }
    return true;
  }

  const re = /\/(.*?)\((.*?)\)/;
  function parser (content) {
    try {
      if (!content.match(re)) {
        throw err;
      };
    } catch (err) {
      return content;
    }
    const regexed = content.match(re);
    const [, cmd, value] = regexed;
    // const message = content.replace(find, "");

    return {cmd, value};
  }

  const chatMap = {
    'img': function(url) {
      return (<span><br /><img key={url.hashish()} className="img-msg" src={ url } /><br /></span>);
    },
    'link': function(url, content) {
      return (<a key={url.hashish()} href={ `//${url}` }> { content || url } </a>);
    },
    'bold': function(content) {
      //console.log("test bold",content);
      return (<strong key={content.hashish()}>{ content } </strong>);
    },
    'ital': function(content) {
      return (<em key={content.hashish()}>{ content } </em>);
    },
    'under': function(content) {
      return (<u key={content.hashish()}>{ content } </u>);
    }
  }
  
  

  elems.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  const elemArr = elems.map(message => {
    const { id, timestamp, content, user } = message;

    let msgArr = content.split(/\s^\/^(.*?)^\(^(.*?)^\)/);
    console.log(msgArr);

    const parsed = msgArr.map((curr, i) => {
      let parsedWord = parser(curr);
      if (parsedWord.cmd) {
        let { cmd, value } = parsedWord;
        return chatMap[cmd](value); 
      }
      console.log(parsedWord);
      return parsedWord + ' ';
    });

    console.log(parsed);

    let colorStyles = (user) ? {color: user.userColor} : {color: "#000000"};

    return (
      <div key={ id.toString() } data-time={ timestamp } className={ `${message.type}` }>

        { message.type === 'messages' && <span className="message-username" style={colorStyles}>
          { user.username || 'Anonymous' }
        </span> }

        <span className={`${message.type}-content`}>
          { parsed }
        </span>

        
      </div>
    );
  });

  return (
    <div>{ elemArr }</div>  
  );
}

export default MessageList;