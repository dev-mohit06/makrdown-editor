import { useState } from 'react';
import DownloadIcon from './assets/images/download.svg';
import Header from './components/header';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
import AIicon from './assets/images/ai.svg';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


function App() {

  const markdownText = `# Markdown

Markdown is a lightweight markup language that can be used to format text. Here are some examples of how to use markdown:

## Headers

Headers in markdown are created using the \`#\` symbol. The more \`#\` symbols you use, the smaller the header size.

\`\`\`
# This is an H1 header 
## This is an H2 header
### This is an H3 header
\`\`\`

## Emphasis

You can italicize text using \`*asterisks*\` or \`_underscores_\`

You can bold text using \`**double asterisks**\` or \`__double underscores__\`

\`\`\`
*This text is italicized*
**This text is bold**
\`\`\`

## Lists

Unordered lists use \`-\` \`*\` or \`+\`

\`\`\`
- Item 1
- Item 2
- Item 3
\`\`\`

Ordered lists use numbers

\`\`\`
1. Item 1
2. Item 2
3. Item 3
\`\`\`

## Links

Format links using \`[]\` for the text and \`()\` for the URL

\`\`\`
[Visit GitHub](https://www.github.com)
\`\`\`

## Blockquotes 

Use \`>\` for blockquote formatting:

\`\`\`
> This is a blockquote
\`\`\`

## Code Blocks

Code blocks are fenced using triple backticks \`\`\`\` before and after the code block:

\`\`\`
function test() {
  console.log("Markdown is easy!");
}
\`\`\`

Those are some of the basic markdown syntax elements to help get you started!
`;
  const [raw, setRaw] = useState(markdownText);
  const [isDisable, setIsDisable] = useState(false);

  const customRenderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''

      return !inline ? (
        <SyntaxHighlighter
          style={docco}
          language={language}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }

  const handleDownload = (e) => {
    const file = new Blob([raw], { type: 'text/plain' });
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'markdown.md';
    a.click();
    e.setAttribute('disabled', true);
    URL.revokeObjectURL(url);
    e.removeAttribute('disabled');
  }

  const makeAiRequest = async (e) => {
    setIsDisable(true);
    if (!raw) {
      toast.error('Please enter some content');
      setIsDisable(false);
      return;
    }

    const loading = toast.loading('AI is working on your content');

    try {
      const response = await axios.post(import.meta.env.VITE_SERVER_URL + "/generate-md", {
        content: raw
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      toast.dismiss(loading);
      setIsDisable(false);
      if (response.status === 200) {
        setRaw(response.data.data);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.dismiss(loading);
      toast.error('An error occurred');
      setIsDisable(false);
    }
  }


  return (
    <div className="container">
      <Toaster />
      <div className="editor">
        <div className='editor__header'>
          <h1>Markdown Editor</h1>
          <div className='actions'>
            <a className={`actions ${isDisable == true ? "pointer-none" : ""}`} onClick={makeAiRequest}>
              <img src={AIicon} title="AI Response" />
            </a>
            <img src={DownloadIcon} onClick={handleDownload} title="Download" />
          </div>
        </div>
        <div className="editor__body">
          <textarea value={raw} name="editor" id="editor" onChange={(e) => setRaw(e.target.value)}></textarea>
        </div>
      </div>
      <div className="preview">
        <div className="editor__header preview__header">
          <h1>Preview</h1>
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}
          components={customRenderers} className="preview__body" id="preview">
          {raw}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default App
