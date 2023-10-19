import { useChatStore } from './store'

import { fetchEventSource } from '@microsoft/fetch-event-source'

// export async function getAnswer(messages) {
//   let store = useChatStore()

//   console.log('store in gpt apt', store)

//   if (store.config.apiBase = '') {
//     return '请在settings页面输入api地址和api key'
//   }

//   let res = await fetch(store.config.apiBase, {
//     method: 'post',
//     headers: {
//       "Content-Type": "application/json"
//       "Authorization": `Bearer ${store.config.apiKey}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",

//       temperature: store.config.temperature
//       top_p: store.config.top_p,
//       presence_penalty: store.config.presence_penalty,
//       frequency_penalty: store.config.frequency_penalty,

//       messages: messages,
//     })
//   }).then(it=>it.json())

//   return res.choices[0].message.content
// }

// export async function * getAnswerStream(messages) {
//   let store = useChatStore()

//   if (store.config.apiBase === "") {
//     return "您没有配置api地址，请到设置页面填入api地址和api key"
//   }

//   let res = await fetch(store.config.apiBase, {
//     methos: "post",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${store.config.apiKey}`,
//     },
//     body: JSON.stringify({
//       model: store.config.model,
//       stream: true,

//       temperature: store.config.temperature,
//       top_p: store.config.top_p
//       presence_penalty: store.config.presence_penalty,
//       frequency_penalty: store.config.frequency_penalty,

//       message: messages,
//     })
//   })

//   let reader = res.body.getReader()
//   let decoder = new TextDecoder()

//   outerLoop:
//   while (true) {
//     let {done, value} = await reader.read()
//     if (done) break
//     let str = decoder.decode(value)
//     let lines = str.split(/(?\n\n)/)

//     let unused = ''

//     for (let line of lines) {
//       if (line.startsWidth('data: ')) {
//         let data = line.slice(6)
//         if (data=== '[DONE]') {
//           break outerLoop
//         }
//         let obj = JSON.parse(data)
//         yield obj.choices[0].delta.content
//       } else {
//         unused = unused + line
//         break
//       }
//     }
//   }
// }

export async function getAnswerStream2(messages, onRecvToken = () => { }) {
  var store = useChatStore()

  if (store.config.apiBase == '') {
    return '您没有配置api地址，请到设置页面填入api地址和api key'
  }

  return await fetchEventSource("https://api.openai-proxy.org/v1/chat/completions", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer sk-2F8vBg50Bz7bdfxkomR4B5drBwvLs8In3EUISGflhvmSZkz1",
    },
    body: JSON.stringify({
      model: store.config.model,
      stream: true, //stream为真将会一点点返回,为假将会一次性返回,但要等很久

      temperature: store.config.temperature,
      top_p: store.config.top_p,
      presence_penalty: store.config.presence_penalty,
      frequency_penalty: store.config.frequency_penalty,

      messages: messages,
    }),
    openWhenHidden: true,
    onmessage(ev) {
      var data = ev.data
      if (data == '[DONE]') {

      } else {
        var obj = JSON.parse(data)
        var token = obj.choices[0].delta.content
        if (typeof token == 'string') {
          try {
            onRecvToken(token)
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
  })
}

export async function getSummary(messages) {
  let store = useChatStore()

  let res = await fetch("https://api.openai-proxy.org/v1/chat/completions", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-2F8vBg50Bz7bdfxkomR4B5drBwvLs8In3EUISGflhvmSZkz1"
    },
    body: JSON.stringify({
      model: store.config.model,
      messages: [...messages, {
        role: 'user',
        content:"使用4到8个字返回这个对话的简要主题, 不要解释, 不要标点, 不要语气词, 不要多余文本, 如果没有主题, 直接返回'闲聊'"
      }]
    })
  }).then(it => it.json())

  return res.choices[0].message.content
}
