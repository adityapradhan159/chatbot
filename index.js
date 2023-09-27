const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { sendMessage, getTextMessageInput } = require("./messageHelper");
require("dotenv").config();
const app = express().use(bodyParser.json());
const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;

app.get("/", (req, res) => {
  res.status(200).send("hello this is webhook setup");
});
app.post('/', function (req, res) {
  console.log(req.body.message)
  var data = getTextMessageInput("8801786686408", req.body.message);
  sendMessage(data)
    .then(function (response) {
      res.sendStatus(200);
      return;
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    });
});

app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let Challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];
  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
      res.status(200).send(Challenge);
      console.log(Challenge);
    } else {
      res.status(403);
    }
  }
});

app.post("/webhook", (req, res) => {
  console.log("outside if")
  let body_params = req?.body;
  console.log(JSON.stringify(body_params, null, 2));

  if (body_params?.object) {
    if (
      body_params.entry &&
      body_params.entry[0].changes &&
      body_params.entry[0].changes[0].value.messages &&
      body_params.entry[0].changes[0].value.messages[0]
    ) {
      let phone_no_id =
        body_params.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body_params.entry[0].changes[0].value.messages[0].from;
      let msg_body =
        body_params.entry[0].changes[0].value.messages[0].text.body;
      axios({
        method: "POST",
        url:
          "https://graph.facebook.com/v15.0/" +
          phone_no_id +
          "/messages?access_token=" +
          token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: {
            body: "hi... i am mynul",
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

app.listen(process.env.PORT, () => {
  console.log("web hook is listening");
});


