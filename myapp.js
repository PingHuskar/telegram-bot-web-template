
document.title = BOTNAME+`_bot`
document.querySelector(`h1`).innerHTML = `
<a href="https://t.me/${BOTNAME}_bot" target="_blank">${BOTNAME}</a>
`

const getUpdates = `https://api.telegram.org/bot${TOKEN}/getUpdates`
axios.get(getUpdates)
.then(res => {
    console.log(res)
    return res.data
})
.then(data => {
    for (let eachIncomingMessage of data.result) {
        console.log(
            eachIncomingMessage.message.from.first_name
            , eachIncomingMessage.message.from.last_name
            , eachIncomingMessage.message.from.username
            , eachIncomingMessage.message.from.id)
    }
})

const agentOption = document.querySelector(`#toInput`);
for (let agent of Agents) {
  let option = document.createElement("option");
  option.text = agent.name;
  option.value = agent.telegramID;
  agentOption.append(option);
}

const updateImage = (t) => {
    if (t !== `*`) {
        document.querySelector(`#agentImg`).src = `./images/agents/${t}.jpg`
    } else {
        document.querySelector(`#agentImg`).src = `./images/agents/R.png`
    }
}


document.querySelector(`#form`).addEventListener(`submit`, (e) => {
  e.preventDefault();
  const text = document.querySelector(`#textInput`).value;
  const file = document.querySelector(`#fileInput`).value;
  const to = document.querySelector(`#toInput`).value;

  if (to !== `*`) {
    let me = new Bot(
      TOKEN,
      to
      //Agents.find(agent => agent.name === to).telegramID
    );

    if (file) {
      me.sendFile(`#fileInput`, text).then((res) => {
        console.log(res);
      });
    } else {
      me.sendMessage(text).then((res) => {
        console.log(res);
      });
    }
  } else {
    console.log(`sent Message to All`)
    for (let agent of Agents) {
        let me = new Bot(
            TOKEN,
            agent.telegramID
          );
      
          if (file) {
            me.sendFile(`#fileInput`, text).then((res) => {
              console.log(res);
            });
          } else {
            me.sendMessage(text).then((res) => {
              console.log(res);
            });
          }
    }
  }
});
