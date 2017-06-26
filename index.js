const MarkdownIt = require('markdown-it')

// NASTY_BUG: passing a module-wide nodeRef object, that gives access, to the
//                     current node in progress. This nasty solution was chosen because of
//                     the bad implementations for markdown variables.
//                     But it "should" work properly because, the set and get run in no time
//                     after another. But yes, ... this is the root of all evil.
const nodeRef = {
  node: null,

  getNodeData () {
    return this.node && this.node.data
  },

  setNodeData (node) {
    this.node = node
  }
}

class MarkdownConverter {
  constructor (engine) {
    this.converter = engine
  }

  init (leitmotiv) {
    leitmotiv.converters['md'] = (node) => {
      nodeRef.setNodeData(node)
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

const mdVariables = require('mdvariables')
const engine = new MarkdownIt()
// Adding variables for all users, because the implementation is rather complicated.
// see NASTY_BUG comment above
  .use(mdVariables(nodeRef.getNodeData.bind(nodeRef)))

module.exports = new MarkdownConverter(engine)
