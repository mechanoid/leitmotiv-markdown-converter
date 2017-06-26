const MarkdownIt = require('markdown-it')

class MarkdownConverter {
  constructor (engine) {
    this.converter = engine
  }

  init (leitmotiv) {
    leitmotiv.converters['md'] = (node) => {
      node.content = this.converter.render(node.content.toString(), node.data)
      return node
    }
  }

  use (plugin, ...args) {
    // allows plugin to modify the converter
    this.converter.use(plugin, ...args)

    return this
  }
}

const engine = new MarkdownIt()
module.exports = new MarkdownConverter(engine)
