import { Pair, RBT } from "./persistentRedBlackTree";
export { Pair };
export declare class OrderedMap<T, S> {
    private readonly _data;
    private readonly _length;
    constructor(data?: RBT<T, S>, length?: number);
    isEmpty(): boolean;
    length(): number;
    find(key: T): Pair<T, S> | null;
    include(key: T): boolean;
    insert(key: T, value: S): OrderedMap<T, S>;
    remove(key: T): OrderedMap<T, S>;
    toArray(): Pair<T, S>[];
}
//# sourceMappingURL=index.d.ts.map