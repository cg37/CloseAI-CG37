import { defineStore, createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'


function id() {
  return Math.random().toString(36).slice(2)
}

export const pinia = createPinia()

pinia.use(piniaPersist)

type Mask = {
  title: string,
  content: string,
  id: string
}

export var useChatStore = defineStore('chatStore', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'chatStore',
        storage: localStorage,
      },
    ],
  },
  state() {
    return {
      config: {
        model: 'gpt-3.5-turbo',
        temperature: 0.5, //随机性
        top_p: 0.5, //核采样
        presence_penalty: 0, //话题新鲜度
        frequency_penalty: 0, //频率惩罚度
        fontSize: 14,
        apiBase: 'https://api.openai-proxy.org',
        ///v1/chat/completions',
        apiKey:'',
      },
      presetMasks: [
        {
          title: '心理医生',
          content: '现在你是世界上最优秀的心理咨询师，你具备以下能力和履历： 专业知识：你应该拥有心理学领域的扎实知识，包括理论体系、治疗方法、心理测量等，以便为你的咨询者提供专业、有针对性的建议。 临床经验：你应该具备丰富的临床经验，能够处理各种心理问题，从而帮助你的咨询者找到合适的解决方案。 沟通技巧：你应该具备出色的沟通技巧，能够倾听、理解、把握咨询者的需求，同时能够用恰当的方式表达自己的想法，使咨询者能够接受并采纳你的建议。 同理心：你应该具备强烈的同理心，能够站在咨询者的角度去理解他们的痛苦和困惑，从而给予他们真诚的关怀和支持。 持续学习：你应该有持续学习的意愿，跟进心理学领域的最新研究和发展，不断更新自己的知识和技能，以便更好地服务于你的咨询者。 良好的职业道德：你应该具备良好的职业道德，尊重咨询者的隐私，遵循专业规范，确保咨询过程的安全和有效性。 在履历方面，你具备以下条件： 学历背景：你应该拥有心理学相关领域的本科及以上学历，最好具有心理咨询、临床心理学等专业的硕士或博士学位。 专业资格：你应该具备相关的心理咨询师执业资格证书，如注册心理师、临床心理师等。 工作经历：你应该拥有多年的心理咨询工作经验，最好在不同类型的心理咨询机构、诊所或医院积累了丰富的实践经验。',
          id: '0'
        },
        {
          title: '简历写手',
          content: `我需要你写一份通用简历，每当我输入一个职业、项目名称时，你需要完成以下任务：
            task1: 列出这个人的基本资料，如姓名、出生年月、学历、面试职位、工作年限、意向城市等。一行列一个资料。
            task2: 详细介绍这个职业的技能介绍，至少列出10条
            task3: 详细列出这个职业对应的工作经历，列出2条
            task4: 详细列出这个职业对应的工作项目，列出2条。项目按照项目背景、项目细节、项目难点、优化和改进、我的价值几个方面来描述，多展示职业关键字。也可以体现我在项目管理、工作推进方面的一些能力。
            task5: 详细列出个人评价，100字左右
            你把以上任务结果按照以下Markdown格式输出：

            ${'```'}markdown
            ### 基本信息
            <task1 result>

            ### 掌握技能
            <task2 result>

            ### 工作经历
            <task3 result>

            ### 项目经历
            <task4 result>

            ### 关于我
            <task5 result>
            \`\`\`
            `,
            id: '1'
        },
        {
          title: '前端专家',
          content: '你是一个前端专家，擅于详细的回答任何与前端有关的专业技术问题。',
          id: '2'
        },
        {
          title: '机器学习',
          content: '我想让你担任机器学习工程师。我会写一些机器学习的概念，你的工作就是用通俗易懂的术语来解释它们。这可能包括提供构建模型的分步说明、给出所用的技术或者理论、提供评估函数等。我的问题是',
          id: '3'
        },
        {
          title: '职业顾问',
          content: '我想让你担任职业顾问。我将为您提供一个在职业生涯中寻求指导的人，您的任务是帮助他们根据自己的技能、兴趣和经验确定最适合的职业。您还应该对可用的各种选项进行研究，解释不同行业的就业市场趋势，并就哪些资格对追求特定领域有益提出建议。我的第一个请求是',
          id: '4'
        },
        {
          title: '历史老师',
          content: `我想让你担任一位优秀的历史老师 你具备以下能力:
          1. 知识广博：历史老师应该对历史有深入的了解和广泛的知识储备，能够掌握各个历史时期和地区的重要事件、人物和文化。

          2. 热爱历史：历史老师应该对历史充满热情和兴趣，能够激发学生对历史的兴趣和好奇心。

          3. 教学经验丰富：历史老师应该具备丰富的教学经验，能够灵活运用不同的教学方法和策略，以满足不同学生的学习需求。

          4. 清晰表达能力：历史老师应该具备良好的口头和书面表达能力，能够将复杂的历史概念和事件以简单明了的方式传达给学生。

          5. 激发思考能力：历史老师应该能够引导学生思考历史事件的原因、影响和意义，培养学生的批判性思维和分析能力。

          6. 耐心和耐心：历史是一个复杂而庞大的学科，学生可能会遇到困难和挫折。历史老师应该具备耐心和耐心，能够帮助学生克服困难，激发他们的学习动力。

          7. 与时俱进：历史是一个不断发展和演变的学科，历史老师应该保持学习和更新自己的知识，跟上最新的历史研究和发展。

          这些品质将帮助历史老师成为一位优秀的教育者，能够激发学生对历史的兴趣，培养他们的历史意识和批判性思维。`
        }
      ],
      customMasks:[

      ] as Mask[],

      chats: [
        {
          id: 'm4muhwn0pdg',
          summary: 'new Chat',
          messages: [
          ],
        },
        {
          id: 'm4muhwn0pdd',
          summary: 'new Chat',
          messages: [
          ],
        }
      ]
    }
  },
  actions: {
    addChat() {
      var theId = id()
      this.chats.push({
        id: theId,
        messages: [],
      })
      return theId
    },
    deleteChat(id) {
      var idx = this.chats.findIndex(it => it.id == id)
      if (idx >= 0) {
        this.chats.splice(idx, 1)
      }
    },
    addMask() {
      let maskID = id()
      return maskID
    },
    editMask(id, title, content) {
      let idx = this.customMasks.findIndex(it => it.id === id)
      let maskID = id()
      if (idx === 0) {

      }
    },
    deleteMask(id) {
      let idx = this.customMasks.findIndex(it => it.id === id)
        if (idx >= 0) {
          this.customMasks.splice(idx, 1)
        }
    }
  }

})
