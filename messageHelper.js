var axios = require('axios');

function sendMessage(data) {
  var config = {
    method: 'post',
    url: `https://graph.facebook.com/v15.0/109085088681247/messages`,
    headers: {
      'Authorization': `Bearer EAAQtC31ExHEBAKgNtF9ZCx1HlZCEXkzwZCbikb75OEVB9oV88WF1B8527l1TXWfcfFU3vjiZAWRcPhwzQfxfShezfl0l2evMGAkOmIUZCE7OgJklkjyMZBPKlZCC3Mx5sORTro1vAsKSpSCW4tsESKzMBfWN28keRWZAx1EZCI6lB6uVsDVKJ7mLZCOTvNN4Oor8EQsZBaWHwSZBtgZDZD`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)
}

function getTextMessageInput(recipient, text) {
  return JSON.stringify({
    "messaging_product": "whatsapp",
    "preview_url": false,
    "recipient_type": "individual",
    "to": recipient,
    "type": "text",
    "text": {
        "body": text
    }
  });
}

module.exports = {
  sendMessage: sendMessage,
  getTextMessageInput: getTextMessageInput
};