import { PureComponent } from 'react';
import ReactDiffViewer, {
  ReactDiffViewerStylesOverride,
} from 'react-diff-viewer';
import { computeLineInformation } from '../../compute-line';

const P = (window as any).Prism;

const oldCode = `
import re


def func(a, b):
    return a + b


def hello():
    return "hello world"


def special_characters_in_string():
    string = "boooo"
    regex_pattern = re.compile("[@_!#$%^&'*()<>?/\|}\"{~:=]")

    if regex_pattern.search(string):
        return True
    return False


# ------------------

from concurrent.futures import ThreadPoolExecutor, as_completed
from time import time


start = time()

print("*******")


def boo(hello=[]):
    with ThreadPoolExecutor() as executor:
        futures = []
        futures.append(executor.submit(special_characters_in_string))
        futures.append(executor.submit(special_characters_in_string))
        for future in as_completed(futures):
            print(future.result())
    return special_characters_in_string()
`;
const newCode = `
import re


def func(a: int, b: int) -> int:
    return a + b


def hello() -> str:
    return "hello world"


def special_characters_in_string() -> bool:
    string = "boooo"
    regex_pattern = re.compile("[@_!#$%^&'*()<>?/\|}\"{~:=]")

    if regex_pattern.search(string):
        return True
    return False


# ------------------

from concurrent.futures import ThreadPoolExecutor, as_completed
from time import time
from typing import Any, List


start = time()

print("*******")


def boo(hello: List[Any]=[]) -> bool:
    with ThreadPoolExecutor() as executor:
        futures = []
        futures.append(executor.submit(special_characters_in_string))
        futures.append(executor.submit(special_characters_in_string))
        for future in as_completed(futures):
            print(future.result())
    return special_characters_in_string()
`;

class Diff extends PureComponent {
  syntaxHighlight = (str: string): any => {
    if (!str) return;
    // console.log(str);
    const language = P.highlight(str, P.languages.python);
    // console.log(str, language, 'language');
    return <span dangerouslySetInnerHTML={{ __html: language }} />;
  };
  render = () => {
    const { lineInformation, diffLines } = computeLineInformation(
      oldCode,
      newCode,
      false
      // compareMethod,
    );

    const newStyles: ReactDiffViewerStylesOverride = {
      variables: {
        dark: {
          diffViewerBackground: '#0d1117',
          emptyLineBackground: '#0d1117',
          gutterBackground: '#0d1117',
          highlightBackground: 'grey',
          highlightGutterBackground: '#ffcd3c',
          addedBackground: '#2ea04326',
          addedColor: 'white',
          removedBackground: '#f8514926',
          removedColor: 'white',
          wordRemovedBackground: 'white',
          addedGutterBackground: '#3fb9504d',
          addedGutterColor: 'white',
          removedGutterColor: 'white',
          diffViewerTitleColor: '#c9d1d9',
          codeFoldBackground: '#388bfd26',
          codeFoldGutterBackground: '#388bfd66',
          codeFoldContentColor: '#8b949e',
        },
      },
      line: {
        padding: '10px 2px',
        '&:hover': {
          background: '#11161e',
        },
      },
      content: {
        width: 'auto',
        borderRight: '1px solid #20272c',
      },
    };

    return (
      <ReactDiffViewer
        showDiffOnly={false}
        styles={newStyles}
        oldValue={this.props.oldCode}
        splitView
        newValue={this.props.newCode}
        renderContent={this.syntaxHighlight}
        onLineNumberClick={this.props.onLineNumberClick}
        useDarkTheme
        leftTitle="webpack.config.js master@2178133 - pushed 2 hours ago."
        rightTitle="webpack.config.js master@64207ee - pushed 13 hours ago."
      />
    );
  };
}

export default Diff;
