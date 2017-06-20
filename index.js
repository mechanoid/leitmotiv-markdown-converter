const MarkdownIt = require('markdown-it')

class MarkdownConverter {
  constructor (engine) {
    this.engine = engine
  }

  render (content) {
    return this.engine && this.engine.render(content)
  }
}

const converter = new MarkdownConverter(new MarkdownIt())

module.exports = (leitmotiv) => {
  leitmotiv.converters['md'] = (content) => converter.render(content.toString())
}
