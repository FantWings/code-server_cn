/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import { h, FunctionComponent, Fragment } from 'preact';
import styles from './time-view.css';
import {
  useMemo,
  useCallback,
  useContext,
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
} from 'preact/hooks';
import { VsCodeApi } from 'vscode-js-profile-core/out/esm/client/vscodeApi';
import { ILocation, IGraphNode } from 'vscode-js-profile-core/out/esm/cpu/model';
import { classes } from 'vscode-js-profile-core/out/esm/client/util';
import { IOpenDocumentMessage } from 'vscode-js-profile-core/out/esm/cpu/types';
import { addToSet, removeFromSet, toggleInSet } from 'vscode-js-profile-core/out/esm/array';
import * as ChevronDown from 'vscode-codicons/src/icons/chevron-down.svg';
import * as ChevronRight from 'vscode-codicons/src/icons/chevron-right.svg';
import { Icon } from 'vscode-js-profile-core/out/esm/client/icons';
import VirtualList from 'preact-virtual-list';
import { getLocationText, decimalFormat } from 'vscode-js-profile-core/out/esm/cpu/display';

type SortFn = (node: ILocation) => number;

const selfTime: SortFn = n => n.selfTime;
const aggTime: SortFn = n => n.aggregateTime;

type NodeAtDepth = { node: IGraphNode; depth: number; position: number };

const getGlobalUniqueId = (node: IGraphNode) => {
  const parts = [node.id];
  for (let n = node.parent; n; n = n.parent) {
    parts.push(n.id);
  }

  return parts.join('-');
};

export const TimeView: FunctionComponent<{
  data: ReadonlyArray<IGraphNode>;
}> = ({ data }) => {
  const listRef = useRef<{ base: HTMLElement }>();
  const [sortFn, setSort] = useState<SortFn | undefined>(() => selfTime);
  const [focused, setFocused] = useState<undefined | IGraphNode>(undefined);
  const [expanded, setExpanded] = useState<ReadonlySet<IGraphNode>>(new Set<IGraphNode>());

  const getSortedChildren = (node: IGraphNode) => {
    const children = Object.values(node.children);
    if (sortFn) {
      children.sort((a, b) => sortFn(b) - sortFn(a));
    }

    return children;
  };

  // 1. Top level sorted items
  const sorted = useMemo(
    () => (sortFn ? data.slice().sort((a, b) => sortFn(b) - sortFn(a)) : data),
    [data, sortFn],
  );

  // 2. Expand nested child nodes
  const rendered = useMemo(() => {
    const output: NodeAtDepth[] = sorted.map(node => ({ node, position: 1, depth: 0 }));
    for (let i = 0; i < output.length; i++) {
      const { node, depth } = output[i];
      if (expanded.has(node)) {
        const toAdd = getSortedChildren(node).map((node, i) => ({
          node,
          position: i + 1,
          depth: depth + 1,
        }));
        output.splice(i + 1, 0, ...toAdd);
        // we don't increment i further since we want to recurse and expand these nodes
      }
    }

    return output;
  }, [sorted, expanded, sortFn]);

  const onKeyDown = useCallback(
    (evt: KeyboardEvent, node: IGraphNode) => {
      let nextFocus: IGraphNode | undefined;
      switch (evt.key) {
        case 'Enter':
        case 'Space':
          setExpanded(toggleInSet(expanded, node));
          evt.preventDefault();
          break;
        case 'ArrowDown':
          nextFocus = rendered[rendered.findIndex(n => n.node === node) + 1]?.node;
          break;
        case 'ArrowUp':
          nextFocus = rendered[rendered.findIndex(n => n.node === node) - 1]?.node;
          break;
        case 'ArrowLeft':
          if (expanded.has(node)) {
            setExpanded(removeFromSet(expanded, node));
          } else {
            nextFocus = node.parent;
          }
          break;
        case 'ArrowRight':
          if (node.childrenSize > 0 && !expanded.has(node)) {
            setExpanded(addToSet(expanded, node));
          } else {
            nextFocus = rendered.find(n => n.node.parent === node)?.node;
          }
          break;
        case 'Home':
          if (listRef.current) {
            listRef.current.base.scrollTop = 0;
          }

          nextFocus = rendered[0]?.node;
          break;
        case 'End':
          if (listRef.current) {
            listRef.current.base.scrollTop = listRef.current.base.scrollHeight;
          }

          nextFocus = rendered[rendered.length - 1]?.node;
          break;
        case '*':
          const nextExpanded = new Set(expanded);
          for (const child of Object.values(focused?.parent?.children || {})) {
            nextExpanded.add(child);
          }
          setExpanded(nextExpanded);
          break;
      }

      if (nextFocus) {
        setFocused(nextFocus);
        evt.preventDefault();
      }
    },
    [rendered, expanded, getSortedChildren],
  );

  useEffect(() => listRef.current?.base.setAttribute('role', 'tree'), [listRef.current]);

  useLayoutEffect(() => {
    const el = listRef.current?.base;
    if (!el || !focused) {
      return;
    }

    setTimeout(() => {
      const button: HTMLButtonElement | null = el.querySelector(
        `[data-row-id="${getGlobalUniqueId(focused)}"]`,
      );
      button?.focus();
    });
  }, [focused]);

  const renderRow = useCallback(
    (row: NodeAtDepth) => (
      <TimeViewRow
        onKeyDown={onKeyDown}
        node={row.node}
        depth={row.depth}
        position={row.position}
        expanded={expanded}
        onExpandChange={setExpanded}
        onFocus={setFocused}
      />
    ),
    [expanded, setExpanded, onKeyDown],
  );

  return (
    <Fragment>
      <TimeViewHeader sortFn={sortFn} onChangeSort={setSort} />
      <VirtualList
        ref={listRef}
        className={styles.rows}
        data={rendered}
        renderRow={renderRow}
        rowHeight={25}
        overscanCount={10}
      />
    </Fragment>
  );
};

const TimeViewHeader: FunctionComponent<{
  sortFn: SortFn | undefined;
  onChangeSort: (newFn: () => SortFn | undefined) => void;
}> = ({ sortFn, onChangeSort }) => (
  <div className={styles.row}>
    <div
      id="self-time-header"
      className={classes(styles.heading, styles.timing)}
      aria-sort={sortFn === selfTime ? 'descending' : undefined}
      onClick={useCallback(() => onChangeSort(() => (sortFn === selfTime ? undefined : selfTime)), [
        sortFn,
      ])}
    >
      {sortFn === selfTime && <Icon i={ChevronDown} />}
      Self Time
    </div>
    <div
      id="total-time-header"
      className={classes(styles.heading, styles.timing)}
      aria-sort={sortFn === aggTime ? 'descending' : undefined}
      onClick={useCallback(() => onChangeSort(() => (sortFn === aggTime ? undefined : aggTime)), [
        sortFn,
      ])}
    >
      {sortFn === aggTime && <Icon i={ChevronDown} />}
      Total Time
    </div>
    <div className={styles.heading}>File</div>
  </div>
);

const TimeViewRow: FunctionComponent<{
  node: IGraphNode;
  depth: number;
  position: number;
  expanded: ReadonlySet<IGraphNode>;
  onExpandChange: (expanded: ReadonlySet<IGraphNode>) => void;
  onKeyDown?: (evt: KeyboardEvent, node: IGraphNode) => void;
  onFocus?: (node: IGraphNode) => void;
}> = ({
  node,
  depth,
  position,
  expanded,
  onKeyDown: onKeyDownRaw,
  onFocus: onFocusRaw,
  onExpandChange,
}) => {
  const vscode = useContext(VsCodeApi);
  const onClick = useCallback(
    (evt: MouseEvent) =>
      vscode.postMessage<IOpenDocumentMessage>({
        type: 'openDocument',
        callFrame: node.callFrame,
        location: node.src,
        toSide: evt.altKey,
      }),
    [vscode, node],
  );

  const onToggleExpand = useCallback(() => {
    onExpandChange(toggleInSet(expanded, node));
  }, [expanded, onExpandChange, node]);

  const onKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      onKeyDownRaw?.(evt, node);
    },
    [onKeyDownRaw, node],
  );

  const onFocus = useCallback(() => {
    onFocusRaw?.(node);
  }, [onFocusRaw, node]);

  let root = node;
  while (root.parent) {
    root = root.parent;
  }

  const location = getLocationText(node);
  const expand = (
    <span className={styles.expander}>
      {node.childrenSize > 0 ? <Icon i={expanded.has(node) ? ChevronDown : ChevronRight} /> : null}
    </span>
  );

  return (
    <div
      className={styles.row}
      data-row-id={getGlobalUniqueId(node)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onClick={onToggleExpand}
      tabIndex={0}
      role="treeitem"
      aria-posinset={position}
      aria-setsize={node.parent?.childrenSize ?? 1}
      aria-level={depth + 1}
      aria-expanded={expanded.has(node)}
    >
      <div className={styles.duration} aria-labelledby="self-time-header">
        <ImpactBar impact={node.selfTime / root.selfTime} />
        {decimalFormat.format(node.selfTime / 1000)}ms
      </div>
      <div className={styles.duration} aria-labelledby="total-time-header">
        <ImpactBar impact={node.aggregateTime / root.aggregateTime} />
        {decimalFormat.format(node.aggregateTime / 1000)}ms
      </div>
      {!location ? (
        <div
          className={classes(styles.location, styles.virtual)}
          style={{ marginLeft: depth * 15 }}
        >
          {expand} <span className={styles.fn}>{node.callFrame.functionName}</span>
        </div>
      ) : (
        <div className={styles.location} style={{ marginLeft: depth * 15 }}>
          {expand} <span className={styles.fn}>{node.callFrame.functionName}</span>
          <span className={styles.file}>
            <a href="#" onClick={onClick}>
              {location}
            </a>
          </span>
        </div>
      )}
    </div>
  );
};

const ImpactBar: FunctionComponent<{ impact: number }> = ({ impact }) => (
  <div className={styles.impactBar} style={{ transform: `scaleX(${impact})` }} />
);
