import React from 'react';

function MessageList({ messages, notifications, uuid }) {
  const elems = [...messages, ...notifications];

  function isValidUrl (string) {
    try {
      new URL(`http://${string}`);
    } catch (err) {
      return false;  
    }
    return true;
  }

  function wordParser (content) {
    const re = /\/(.*?)\((.*?)\)/;
    try {
      if (!content.match(re)) {
        throw err;
      };
    } catch (err) {
      return content;
    }
    const regexed = content.match(re);
    const [, cmd, value] = regexed;

    return { cmd, value };
  }

  const chatMap = {

    'img': function(url) {
      try { 
        if (!isValidUrl(url)) {
          throw err;
        }
      } catch (err) {
        return (undefined);
      }
      return (
        <span key={ uuid() }>
          <br /><img key={ uuid() } className="img-msg" src={ url } /><br />
        </span>
      );
    },

    'link': function(url, content) {
      try { 
        if (!isValidUrl(url)) {
          throw err;
        }
      } catch (err) {
        return (undefined);
      }
      return (
        <a key={ uuid() } href={ `//${url}` }>{ content || url } </a>
      );
    },

    'bold': function(content) {
      return (
        <strong key={ uuid() }>{ content } </strong>
      );
    },

    'ital': function(content) {
      return (
        <em key={ uuid() }>{ content } </em>
      );
    },

    'under': function(content) {
      return (
        <u key={ uuid() }>{ content } </u>
      );
    }
  }

  elems.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  const elemArr = elems.map(message => {
    const { id, timestamp, content, user } = message;

    let msgArr = content.split(/(?!\(.*)\s(?![^(]*?\))/g);

    const parsed = msgArr.map((word) => {
      let parsedWord = wordParser(word);
      if (parsedWord.cmd) {
        let { cmd, value } = parsedWord; 
        let newVal;
        if (cmd === 'link') {
          newVal = value.split('; ');
          let [ url, name ] = newVal;
          return chatMap[cmd](url, name);
        }
        return chatMap[cmd](value); 
      }
      return parsedWord + ' ';
    });

    const colorStyles = (user) ? { color: user.userColor } : { color: "#000000" };
    return (
      <div key={ id.toString() } data-time={ timestamp } className={ `${message.type}` }>

        { message.type === 'messages' && 
        <span className="message-username" style={ colorStyles }>
          { user.username || 'Anonymous' }
        </span> }

        <span className={ `${message.type}-content` }>
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