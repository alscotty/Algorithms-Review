// A markdown processor is capable of handling a multitude of string to html tag formats.
// ​​For now, we just want to focus on supporting a few features ...

// You'll need to parse these tags:
// <p/>: A sequence of two or more consecutive newline characters starts a new paragraph.
// Other formatting commands do not cross paragraphs.
// <br/>: A single newline character is a soft line break, <br/>
// <blockquote/>: A blockquote is one or more consecutive lines where the first two characters on the line are '> ' (a greater than sign followed by a space).
// <del/>: Text in strikethrough (<del> </del>) is surrounded by a pair of ~~ (two tildes). "~~hello~~" > "<del>hello</del>"

const input = `This is another paragraph that has
> Some text that
> is in a
> block quote.`

const handleBlockQuotes = (htmlString) => {
  let pattern = '<br/>> ';
  let blockQuoteStarted = false;
  let outputString = ''

  for (let idx = 0; idx < htmlString.length - 7; idx++) {
    let htmlStringSection = htmlString.slice(idx, idx+7);

    if (htmlStringSection === pattern && !blockQuoteStarted) {
      outputString += '<blockquote>';
      idx += 7
      blockQuoteStarted = true;
    } else if ( htmlStringSection !== pattern && blockQuoteStarted) {
      outputString += htmlString;
      outputString += '</blockquote>';
      break
    } else {
      outputString += htmlString[idx];
    }

  }

  return outputString;
}

const markdownToHtml = (markdownString) => {
  let paragraphEls = markdownString.split('\n\n')
  paragraphEls = paragraphEls.map(el => {
    return `<p>${el}</p>`
  })

  let htmlString = paragraphEls.join(' ');
  htmlString = htmlString.replaceAll('\n', '<br/>')

  console.log(handleBlockQuotes(htmlString))


  return htmlString;
}

console.log(markdownToHtml(input))

/**
Expected Output:
<p>This is a paragraph with a soft<br />line break.</p>

<p>This is another paragraph that has <br />
  <blockquote>
    Some text that<br />
    is in a<br />
    block quote.
  </blockquote>
</p>

<p>This is another paragraph with a <del>strikethrough</del> word.</p>

Note:
It's not important to produce this specific output! We only care if the HTML is valid.
*/