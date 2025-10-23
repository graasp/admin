import type { JSX } from 'react';
import ReactMarkdown, { ExtraProps } from 'react-markdown';

import { styled } from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { Highlight, themes } from 'prism-react-renderer';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { getCurrentAccountOptions } from '@/openapi/client/@tanstack/react-query.gen.js';

import {
  ALL_MEMBERS_ID,
  ALL_MEMBERS_MEMBER,
  UNKNOWN_USER_NAME,
} from '../constants.js';
import { useMessagesContext } from '../context/MessagesContext.js';
import { getIdMention } from '../utils.js';

const StyledReactMarkdown = styled(ReactMarkdown)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  '& *': {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  '& div.prism-code': {
    fontFamily:
      'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace',
    margin: theme.spacing(1),
    backgroundColor: 'transparent',
    fontSize: '0.8rem',
    padding: theme.spacing(1, 0),
  },
  // set margins for all elements
  '& h1, p': {
    marginTop: theme.spacing(1),
  },
  '& p': {
    lineHeight: '1.5',
    fontSize: '1rem',
  },
  '& ul, ol': {
    // define offset for list
    paddingInlineStart: theme.spacing(2),
  },
  '& code': {
    padding: '0.2em 0.4em',
    borderRadius: theme.spacing(1),
    backgroundColor: 'silver',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    fontSize: '90%',
    fontFamily:
      'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace',
  },
  '& pre': {
    margin: theme.spacing(1, 1),
    backgroundColor: 'rgba(197, 197, 197, 0.37)',
    // border: 'solid 1px silver',
    borderRadius: theme.spacing(1),
  },
  '& blockquote': {
    borderLeft: 'solid darkgray 4px',
    color: 'darkgray',
    marginLeft: '0',
    paddingLeft: theme.spacing(2),
    marginInlineEnd: theme.spacing(1),
  },
  '& table, th, td, tr': {
    border: 'solid black 1px ',
  },
  '& table': {
    borderCollapse: 'collapse',
  },
  // alternate background colors in table rows
  '& tr:nth-of-type(even)': {
    backgroundColor: 'lightgray',
  },
  '& img': {
    maxWidth: '100%',
  },
}));

type Props = {
  messageBody: string;
};

function Code(props: JSX.IntrinsicElements['code'] & ExtraProps) {
  const { className: language, children, ...rest } = props;

  const { data: currentAccount } = useQuery(getCurrentAccountOptions());
  const { members = [] } = useMessagesContext();

  const match = /language-(\w+)/.exec(language ?? '');
  const mentionText = String(children).replace(/\n$/, '');
  // try to match a legacy mention
  const mention = getIdMention(mentionText);
  if (mention?.groups) {
    const userId = mention.groups?.id;
    const userName =
      [...members, ALL_MEMBERS_MEMBER].find((m) => m.id === userId)?.name ??
      UNKNOWN_USER_NAME;

    return (
      <span
        style={{
          ...((userId === currentAccount?.id || userId === ALL_MEMBERS_ID) && {
            backgroundColor: '#e3c980',
          }),
          fontWeight: 'bold',
        }}
      >
        @{userName}
      </span>
    );
  }
  return match ? (
    <Highlight
      theme={themes.vsLight}
      code={mentionText}
      language={match[1]}
      {...props}
    >
      {({ className, tokens, getLineProps, getTokenProps }): JSX.Element => (
        <div className={className}>
          {tokens.map((line, i) => (
            <div
              {...getLineProps({
                line,
                key: i,
              })}
            >
              {line.map((token, key) => (
                <span
                  {...getTokenProps({
                    token,
                    key,
                  })}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </Highlight>
  ) : (
    <code className={language} {...rest}>
      {children}
    </code>
  );
}

export function MessageBody({ messageBody }: Readonly<Props>) {
  return (
    <StyledReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{ code: Code }}
    >
      {messageBody}
    </StyledReactMarkdown>
  );
}
