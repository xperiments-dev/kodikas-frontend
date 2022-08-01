import React, { useEffect, useState } from 'react';

import CodeDiff from './components/CodeDiff/CodeDiff';
import logo from './logo.svg';
import './App.css';
import { styled } from './styles/stitches';
import { FolderIcon } from '@heroicons/react/solid';
import { DocumentTextIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { response } from './constants';
import { Routes, useParams, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRepos } from './utils/hooks';
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

const AutoCommitBtn = styled('button', {
  background: '#238636',
  color: 'white',
  padding: '5px 16px',
  borderRadius: '6px',
  border: '1px solid rgba(240,246,252,0.1)',
  fontFamily: 'JetBrains Mono',
  cursor: 'pointer',
  '&:hover': {
    background: '#2ea043',
  },
});

const postAutoCommitData = (newCommitData: {
  file_name: String;
  file_data: String;
}) => {
  return axios.post(
    'https://kodikas.xperiments.dev/auto-commit',
    newCommitData
  );
};

function App() {
  const latestCommitId = useSearchParams()[0].get('latest_commit_id');
  console.log(latestCommitId, 'LATEST_COMMIT_ID');
  const [changedCode, setChangedCode] = useState(response.changed_file);
  const [originalCode, setOriginalCode] = useState(response.original_file);
  const [filePath, setFilePath] = useState(response.file_path);

  const { data, isLoading } = useRepos(latestCommitId || '');
  const {
    mutateAsync,
    isSuccess,
    isLoading: isMutatingCommit,
  } = useMutation(postAutoCommitData);

  console.log(data, 'DATA');

  useEffect(() => {
    if (data) {
      setOriginalCode(data?.original_file);
      setChangedCode(data?.changed_file);
    }
  }, [data]);

  const stringArray = String(originalCode).split('\n');
  const changeStringArray = String(changedCode).split('\n');
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
    selectedLineNumberElement.closest('tr').style.backgroundColor =
      'rgb(154 99 223 / 58%)';
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
        return accum + '\n' + currentString;
      }
      return currentString;
    }, '');
    console.log(leftSideString, 'LEFT SIDE STRING');

    setOriginalCode(leftSideString);
  };

  const postCommitData = () => {
    console.log('possoososos', originalCode);
    mutateAsync({
      file_name: 'xyz.py',
      file_data: originalCode,
    }).then(() => {
      console.log('successs.....');
    });
  };

  return (
    <>
      <Layout>
        <Sidebar>
          <AutoCommitBtn onClick={() => postCommitData()}>
            {isMutatingCommit
              ? 'Loading...'
              : isSuccess
              ? 'Committed'
              : ' Auto-commit ⚡️'}
          </AutoCommitBtn>
          {/* <SidebarItem folder>
          <FolderIcon /> src/components
        </SidebarItem>
        <SidebarItem depth="1">
          <FolderIcon /> layout
        </SidebarItem>
        <SidebarItem depth="2" file>
          <DocumentTextIcon />
          Layout.tsx
        </SidebarItem> */}
        </Sidebar>
        <div>
          {!isLoading && (
            <CodeDiff
              oldCode={finalMultiLineString}
              newCode={changedMultilineString}
              onLineNumberClick={onLineNumberClick}
              fileName={response.file_path}
            />
          )}
        </div>
      </Layout>
    </>
  );
}

export default App;
