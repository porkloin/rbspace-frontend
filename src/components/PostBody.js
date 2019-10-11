import React from "react"
//import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
//import { atomDark } from 'react-syntax-highlighter/styles/prism';
//import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
//import uuidv1 from 'uuid/v1';

  /*const transform = (node, index) => {
  if (node.type === 'tag' && node.name === 'pre') {
    node.name = 'SyntaxHighlighter';
    let lang = node.children[1].attribs.class ? node.children[1].attribs.class.split('-')[1] : 'javascript';
    return <SyntaxHighlighter style={atomDark} key={uuidv1()} language={lang}>{node.children[1].children[0].data}</SyntaxHighlighter>
  }
}*/

const PostBody = ({ body }) => (
  <div dangerouslySetInnerHTML={{__html: body}}></div>
)

export default PostBody
