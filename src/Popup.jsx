import React from "react";
import Popup from "reactjs-popup";

export default () => (
  <Popup trigger={ <button className="chatbar-button">See Commands</button> } modal closeOnDocumentClick>
    <div>
      <p>To use commands, simply use this format: /bold(Your Bold Text)</p>
      <p>Available text formatting commands are /bold(), /ital(), and /under().</p>
      <p>You can also post images with /img(http://www.your-image-url.com).</p>
      <p>Hyperlinks can also be shared, with an optional alias: /link(www.your-url-here.com; Your Link Alias)</p>
    </div>
  </Popup>
);