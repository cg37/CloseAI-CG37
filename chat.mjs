import * as readline from "node:readline/promises"
import chalk from "chalk"
import fetch from "node-fetch"
import split from "split"
import fs from "node:fs"

import {stdin as input, stdout as output} from "node:process"
const rl = readline.createInterface({
  input,
  output,
})

let messages = []

while(true){
  //让用户输入问题
  const question = await rl.question('You: ')

  if (question.trim() === ''){
    continue
  }

  if (question.trim === ".exit") {
    rl.close
    break
  }

  if (question.trim().startsWith('.save')) {
    let file = question.trim().slice(6).trim()
    fs.writeFileSync(file, `
    <!DOCTYPE html>
    <script>
      let chatHistory = ${JSON.stringify(messages)}
    </script>

    <script>
      for (let msg of chatHistory) {
        if (msg.role === "user") {
          document.write('<p> You: ' + msg.content + '</p>')
        } else {
          document.write('<p style="color: #00a89a;">AI: ' + msg.content + '</p>')
        }
      }
    </script>
    `)
    console.log('Saved.')
    continue
  }

  if(question.trim().startsWith('.load')) {
    let filePath = question.trim().slice(6).trim()
    let fileContent = fs.readFileSync(filePath).toString()

    let jsonText = fileContent.match( /var chatHistory ?\= ?(.*)\n/)[1]
    let chatHistory = JSON.parse(jsonText)

    messages = chatHistory
    for (let msg of messages) {
      if (msg.role === "user") {
        console.log('You: ' + msg.content)
      } else {
        console.log('AI: msg.content')
      }
    }
    continue
  }

  if (question.trim() === ".clear") {
    messages = []
    console.log("Conversation Cleared.")
    continue
  }
  messages.push({
    role:'user',
    content: question
  })

  let res = await fetch('https://api.openai-proxy.org/v1/chat/completions', {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-BR3a8D8hFjCtI9x4KpCHizuHr0a2DlQzvb2bcNZ6y9yAalaB",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: messages,
    })
  })

  let aiAnswerStream = res.body.pipe( split('\n\n') )

  let answer = ''

  process.stdout.write(chalk.red("AI: "))

  await new Promise(resolve => {

    aiAnswerStream.on('data', data=>{
      let str = data.toString()
      let d = str.slice(6) // 剔除 "data: "前缀
      if (d.trim() === "[DONE]") {
        resolve()
        return
      }

      if (!d) {
        return
      }

      let obj = JSON.parse(d)

      process.stdout.write(chalk.cyan(obj.choices[0].delta.content ?? ''))
      //process.stdout.write(obj.choices[0].delta.content ?? '')

      answer += obj.choices[0].delta.content ?? ''

    })

    process.stdout.write('\n')

    messages.push({
      role: 'assistant',
      content: answer,
    })
  })
}
