import React, { useEffect, useState } from 'react';

import CodeDiff from './components/CodeDiff/CodeDiff';
import logo from './logo.svg';
import './App.css';
import { styled } from './styles/stitches';
import { FolderIcon } from '@heroicons/react/solid';
import { DocumentTextIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { response } from './constants';
import { Routes } from 'react-router-dom';
const Layout = styled('main', {
  display: 'grid',
  // gridTemplateColumns: '300px 1fr',
});

const Sidebar = styled('div', {
  padding: '1rem',
});

const SidebarItem = styled('div', {
  $$basePadding: '0px',
  padding: '6px 8px',
  paddingLeft: 'calc(6px + $$basePadding)',
  borderRadius: 6,

  display: 'flex',
  alignItems: 'center',
  gap: '7px',

  '&:hover': {
    backgroundColor: 'rgba(177,186,196,0.12)',
  },

  '& svg': {
    width: '22px',
    display: 'block',
    fill: '#8b949e',
  },

  variants: {
    file: {
      true: {
        '& svg': {
          fill: 'none',
          color: '#8b949e',
        },
      },
    },
    folder: {
      true: {
        '& svg': {
          fill: '#8b949e',
        },
      },
    },
    depth: {
      '1': {
        $$basePadding: '10px',
      },
      '2': {
        $$basePadding: '20px',
      },
    },
  },
});

function App() {
  const [changedCode, setChangedCode] = useState(response.changed_file);
  const [originalCode, setOriginalCode] = useState(response.original_file);
  const [filePath, setFilePath] = useState(response.file_path);

  // curl --location --request GET 'http://139.59.14.101/commit-data/'
  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://kodikas.xperiments.dev/commit-data/?commit_id=b671a4c04bab9f504ff913015322e91cae95e366'
  //     )
  //     .then((res) => {
  //       console.log(res, 'RES');
  //       setChangedCode(res.data.changed_file);
  //       setOriginalCode(res.data.original_file);
  //       setFilePath(res.data.file_path);
  //     });
  // }, []);

  const stringArray = String(originalCode).split('\\n');
  const changeStringArray = String(changedCode).split('\\n');
  // console.log(stringArray, 'STRING');
  let finalMultiLineString = ``;
  let changedMultilineString = ``;

  const x = stringArray.map((each, index) => {
    finalMultiLineString += `${each}
`;
    // console.log(finalMultiLineString, each, index);
  });
  const y = changeStringArray.map((each) => {
    changedMultilineString += `${each}
`;
  });

  const onLineNumberClick = (lineId, e) => {
    const selectedLineNumberElement = e.target;
    const selectedClassName = e.target.className;
    // Number().closest("tr").querySelector("pre.css-m5i1c8-line-number").textContent)

    const LeftSideNumber = Number(
      selectedLineNumberElement
        .closest('tr')
        .querySelectorAll(`.${selectedClassName}`)[0].textContent
    );
    selectedLineNumberElement.closest('tr').style.backgroundColor = '#485201';
    const [splitDirection, lineNumber] = lineId.split('-');

    console.log(
      changeStringArray[lineNumber],
      changeStringArray,
      stringArray[lineNumber - 1],
      changeStringArray[lineNumber - 1]
    );
    const r = [...changeStringArray];
    const l = [...stringArray];

    console.log(l[LeftSideNumber - 1], 'leftSideString');
    if (l[lineNumber - 1] !== '') {
      l[LeftSideNumber - 1] = r[lineNumber - 1];
    } else {
      console.log(lineNumber - 1, r[lineNumber - 1], 'SDJKSDJKSJD');
      l.splice(lineNumber - 1, 0, r[lineNumber - 1]);
    }

    console.log(r[lineNumber - 1], lineNumber, 'LEFT SIDE CODE');

    const leftSideString = l.reduce((accum, currentString, currentIndex) => {
      if (currentIndex !== 0) {
        return accum + '\\n' + currentString;
      }
      return currentString;
    }, '');
    console.log(leftSideString, 'LEFT SIDE STRING');

    setOriginalCode(leftSideString);
  };

  return (
    <>
      <Layout>
        {/* <Sidebar>
        <SidebarItem folder>
          <FolderIcon /> src/components
        </SidebarItem>
        <SidebarItem depth="1">
          <FolderIcon /> layout
        </SidebarItem>
        <SidebarItem depth="2" file>
          <DocumentTextIcon />
          Layout.tsx
        </SidebarItem>
      </Sidebar> */}
        <div>
          <CodeDiff
            oldCode={finalMultiLineString}
            newCode={changedMultilineString}
            onLineNumberClick={onLineNumberClick}
          />{' '}
        </div>
      </Layout>
    </>
  );
}

export default App;
