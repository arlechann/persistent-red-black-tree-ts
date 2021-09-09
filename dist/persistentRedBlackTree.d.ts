export declare type Color = 'red' | 'black';
export declare type Pair<T, S> = {
    readonly key: T;
    readonly value: S;
};
export declare const Pair: {
    from<T, S>(key: T, value: S): Pair<T, S>;
};
export declare type RBT<T, S> = {
    color: Color;
    left: RBT<T, S>;
    pair: Pair<T, S>;
    right: RBT<T, S>;
} | null;
export declare const RBT: {
    new<T, S>(): RBT<T, S>;
    from<T_1, S_1>(color: Color, left: RBT<T_1, S_1>, pair: Pair<T_1, S_1>, right: RBT<T_1, S_1>): {
        color: Color;
        left: RBT<T_1, S_1>;
        pair: Pair<T_1, S_1>;
        right: RBT<T_1, S_1>;
    };
    copy<T_2, S_2>(rbtree: RBT<T_2, S_2>): RBT<T_2, S_2>;
};
export declare function isEmpty<T, S>(rbtree: RBT<T, S>): boolean;
export declare function find<T, S>(rbtree: RBT<T, S>, key: T): Pair<T, S> | null;
export declare function include<T, S>(rbtree: RBT<T, S>, key: T): boolean;
export declare function insert<T, S>(rbtree: RBT<T, S>, pair: Pair<T, S>): RBT<T, S>;
declare type RemovedNode<T, S> = {
    color: Color;
    pair: Pair<T, S>;
};
export declare function remove<T, S>(rbtree: RBT<T, S>, key: T): [RBT<T, S>, RemovedNode<T, S> | null];
export declare function toArray<T, S>(rbtree: RBT<T, S>): Pair<T, S>[];
export {};
//# sourceMappingURL=persistentRedBlackTree.d.ts.map