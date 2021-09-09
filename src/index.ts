import {
  Pair,
  RBT,
  isEmpty,
  find,
  include,
  insert,
  toArray,
  remove,
} from "./persistentRedBlackTree";

export { Pair };

export class OrderedMap<T, S> {
  private readonly _data: RBT<T, S>;
  private readonly _length: number;

  constructor(data: RBT<T, S> = RBT.new(), length: number = 0) {
    this._data = data;
    this._length = length;
  }

  isEmpty(): boolean {
    return isEmpty(this._data);
  }

  length(): number {
    return this._length;
  }

  find(key: T): Pair<T, S> | null {
    return find(this._data, key);
  }

  include(key: T): boolean {
    return include(this._data, key);
  }

  insert(key: T, value: S): OrderedMap<T, S> {
    return new OrderedMap(insert(this._data, Pair.from(key, value)), this._length + 1);
  }

  remove(key: T): OrderedMap<T, S> {
    const [rbtree, node] = remove(this._data, key);
    return new OrderedMap(rbtree, node === null ? this._length : this._length - 1);
  }

  toArray(): Pair<T, S>[] {
    return toArray(this._data);
  }
}
