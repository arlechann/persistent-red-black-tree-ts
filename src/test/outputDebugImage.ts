import { Graph, Node, digraph } from "graphviz";
import { RBT } from '../redBlackTree';

type ToString = {
  toString(): string,
};

const createNilId = (() => {
  let n = 0;
  return () => {
    return `NIL${n++}`
  }
})();

function outputDebugImageImpl<T extends ToString, S>(rbtree: RBT<T, S>, graph: Graph): Node {
  if (rbtree === null) {
    const gNilNode = graph.addNode(createNilId());
    gNilNode.set('shape', 'box');
    gNilNode.set('label', 'Nil');
    gNilNode.set('color', 'black');
    gNilNode.set('fontcolor', 'black');
    return gNilNode;
  }
  const { color, left, pair, right } = rbtree;
  const gNode = graph.addNode(pair.key.toString());
  gNode.set('color', color);
  gNode.set('fontcolor', color);
  const gLeftNode = outputDebugImageImpl(left, graph);
  const eLeft = graph.addEdge(gNode, gLeftNode);
  eLeft.set('style', 'solid');
  const gRightNode = outputDebugImageImpl(right, graph);
  const eRight = graph.addEdge(gNode, gRightNode);
  eRight.set('style', 'dotted');
  return gNode;
}

export function outputDebugImage<T extends ToString, S>(rbtree: RBT<T, S>, title: string): void {
  const graph = digraph('RBT');
  outputDebugImageImpl(rbtree, graph);
  graph.output('png', `./img/${title}`);
}
