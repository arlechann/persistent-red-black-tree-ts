export const Pair = {
    from(key, value) {
        return { key, value };
    }
};
export const RBT = {
    new() {
        return null;
    },
    from(color, left, pair, right) {
        return { color, left, pair, right };
    },
    copy(rbtree) {
        return rbtree === null ? RBT.new() : RBT.from(rbtree.color, rbtree.left, rbtree.pair, rbtree.right);
    }
};
class LogicError extends Error {
    constructor(message = '') {
        super(message);
        this.name = 'LogicError';
    }
}
export function isEmpty(rbtree) { return rbtree === null; }
export function find(rbtree, key) {
    if (rbtree === null) {
        return null;
    }
    const { left, pair, right } = rbtree;
    if (key < pair.key) {
        return find(left, key);
    }
    else if (key > pair.key) {
        return find(right, key);
    }
    else {
        return pair;
    }
}
export function include(rbtree, key) {
    const found = find(rbtree, key);
    return found === null ? false : true;
}
function balance(color, left, pair, right) {
    if (color === 'red') {
        return RBT.from(color, left, pair, right);
    }
    if (left !== null && left.color === 'red') {
        if (left.left !== null && left.left.color === 'red') {
            const l = left, lpair = left.pair, ll = left.left, llpair = left.left.pair;
            const st1 = ll.left, st2 = ll.right, st3 = l.right, st4 = right;
            const nl = RBT.from('black', st1, llpair, st2), nr = RBT.from('black', st3, pair, st4);
            return RBT.from('red', nl, lpair, nr);
        }
        if (left.right !== null && left.right.color === 'red') {
            const l = left, lpair = left.pair, lr = left.right, lrpair = left.right.pair;
            const st1 = l.left, st2 = lr.left, st3 = lr.right, st4 = right;
            const nl = RBT.from('black', st1, lpair, st2), nr = RBT.from('black', st3, pair, st4);
            return RBT.from('red', nl, lrpair, nr);
        }
    }
    if (right !== null && (right === null || right === void 0 ? void 0 : right.color) === 'red') {
        if (right.left !== null && right.left.color === 'red') {
            const r = right, rpair = right.pair, rl = right.left, rlpair = right.left.pair;
            const st1 = left, st2 = rl.left, st3 = rl.right, st4 = r.right;
            const nl = RBT.from('black', st1, pair, st2), nr = RBT.from('black', st3, rpair, st4);
            return RBT.from('red', nl, rlpair, nr);
        }
        if (right.right !== null && right.right.color === 'red') {
            const r = right, rpair = right.pair, rr = right.right, rrpair = right.right.pair;
            const st1 = left, st2 = r.left, st3 = rr.left, st4 = rr.right;
            const nl = RBT.from('black', st1, pair, st2), nr = RBT.from('black', st3, rrpair, st4);
            return RBT.from('red', nl, rpair, nr);
        }
    }
    return RBT.from(color, left, pair, right);
}
function insertImpl(rbtree, pair) {
    if (rbtree === null) {
        return RBT.from('red', RBT.new(), pair, RBT.new());
    }
    const { color, left, pair: p, right } = rbtree;
    if (pair.key < p.key) {
        return balance(color, insertImpl(left, pair), p, right);
    }
    else if (pair.key > p.key) {
        return balance(color, left, p, insertImpl(right, pair));
    }
    else {
        return rbtree;
    }
}
;
export function insert(rbtree, pair) {
    const { left, pair: p, right } = insertImpl(rbtree, pair);
    return RBT.from('black', left, p, right);
}
function restructureLeft(color, left, pair, right, p) {
    if (p === null || p.color === 'red') {
        return [RBT.from(color, left, pair, right), p];
    }
    if (right === null) {
        return [RBT.from(color, left, pair, right), p];
    }
    if (right.color === 'black') {
        if (right.left !== null && right.left.color === 'red') {
            const st1 = left, st2 = right.left.left, st3 = right.left.right, st4 = right.right;
            const nl = RBT.from('black', st1, pair, st2), nr = RBT.from('black', st3, right.pair, st4);
            const nn = RBT.from(color, nl, right.left.pair, nr);
            return [nn, { color: 'red', pair: p.pair }];
        }
        else if (right.right !== null && right.right.color === 'red') {
            const st1 = left, st2 = right.left, st3 = right.right.left, st4 = right.right.right;
            const nl = RBT.from('black', st1, pair, st2), nr = RBT.from('black', st3, right.right.pair, st4);
            const nn = RBT.from(color, nl, right.pair, nr);
            return [nn, { color: 'red', pair: p.pair }];
        }
        else {
            const st1 = left, st2 = right.left, st3 = right.right;
            const nr = RBT.from('red', st2, right.pair, st3);
            const nn = RBT.from('black', st1, pair, nr);
            return [nn, { color: color, pair: p.pair }];
        }
    }
    else {
        const st1 = left, st2 = right.left, st3 = right.right;
        const [nl, _] = restructureLeft('red', st1, pair, st2, p);
        const nn = RBT.from('black', nl, right.pair, st3);
        return [nn, { color: 'red', pair: p.pair }];
    }
}
function restructureRight(color, left, pair, right, p) {
    if (p === null || p.color === 'red') {
        return [RBT.from(color, left, pair, right), p];
    }
    if (left === null) {
        return [RBT.from(color, left, pair, right), p];
    }
    if (left.color === 'black') {
        if (left.right !== null && left.right.color === 'red') {
            const st1 = left.left, st2 = left.right.left, st3 = left.right.right, st4 = right;
            const nl = RBT.from('black', st1, left.pair, st2), nr = RBT.from('black', st3, pair, st4);
            const nn = RBT.from(color, nl, left.right.pair, nr);
            return [nn, { color: 'red', pair: p.pair }];
        }
        else if (left.left !== null && left.left.color === 'red') {
            const st1 = left.left.left, st2 = left.left.right, st3 = left.right, st4 = right;
            const nl = RBT.from('black', st1, left.left.pair, st2), nr = RBT.from('black', st3, pair, st4);
            const nn = RBT.from(color, nl, left.pair, nr);
            return [nn, { color: 'red', pair: p.pair }];
        }
        else {
            const st1 = left.left, st2 = left.right, st3 = right;
            const nl = RBT.from('red', st1, left.pair, st2);
            const nn = RBT.from('black', nl, pair, st3);
            return [nn, { color: color, pair: p.pair }];
        }
    }
    else {
        const st1 = left.left, st2 = left.right, st3 = right;
        const [nr, _] = restructureRight('red', st2, pair, st3, p);
        const nn = RBT.from('black', st1, left.pair, nr);
        return [nn, { color: 'red', pair: p.pair }];
    }
}
function removeLeftMost(rbtree) {
    const { color, left, pair, right } = rbtree;
    if (right === null) {
        if (left === null) {
            return [RBT.new(), { color, pair }];
        }
        else {
            return [RBT.copy(left), { color, pair }];
        }
    }
    else {
        const [r, p] = removeLeftMost(right);
        if (r === null) {
            return [RBT.from(color, left, pair, r), p];
        }
        else {
            const [n, q] = restructureRight(r.color, r.left, r.pair, r.right, p);
            if (q === null) {
                throw new LogicError();
            }
            return [RBT.from(color, left, pair, n), q];
        }
    }
}
function removeImpl(rbtree, key) {
    if (rbtree === null) {
        return [rbtree, null];
    }
    const { color, left, pair, right } = rbtree;
    if (key < pair.key) {
        const [l, p] = removeImpl(left, key);
        const [n, q] = restructureLeft(color, l, pair, right, p);
        return [n, q];
    }
    else if (key > pair.key) {
        const [r, p] = removeImpl(right, key);
        const [n, q] = restructureRight(color, left, pair, r, p);
        return [n, q];
    }
    if (left === null && right === null) {
        return [RBT.new(), { color, pair }];
    }
    else if (left === null) {
        return [RBT.copy(right), { color, pair }];
    }
    else if (right === null) {
        return [RBT.copy(left), { color, pair }];
    }
    else {
        const [l, p] = removeLeftMost(left);
        return [RBT.from(color, l, p.pair, right), { color: p.color, pair }];
    }
}
export function remove(rbtree, key) {
    const [rbt, p] = removeImpl(rbtree, key);
    return [rbt, p];
}
export function toArray(rbtree) {
    if (rbtree === null) {
        return [];
    }
    else {
        return [...toArray(rbtree.left), rbtree.pair, ...toArray(rbtree.right)];
    }
}
