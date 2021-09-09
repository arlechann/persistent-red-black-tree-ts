import { Pair, RBT, isEmpty, find, include, insert, toArray, remove, } from "./persistentRedBlackTree";
export { Pair };
export class OrderedMap {
    constructor(data = RBT.new(), length = 0) {
        this._data = data;
        this._length = length;
    }
    isEmpty() {
        return isEmpty(this._data);
    }
    length() {
        return this._length;
    }
    find(key) {
        return find(this._data, key);
    }
    include(key) {
        return include(this._data, key);
    }
    insert(key, value) {
        return new OrderedMap(insert(this._data, Pair.from(key, value)), this._length + 1);
    }
    remove(key) {
        const [rbtree, node] = remove(this._data, key);
        return new OrderedMap(rbtree, node === null ? this._length : this._length - 1);
    }
    toArray() {
        return toArray(this._data);
    }
}
