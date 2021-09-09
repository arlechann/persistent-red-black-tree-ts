import { describe, it } from "mocha";
import { assert } from "chai";
import seedrandom from "seedrandom";
import {
  Pair,
  RBT,
  isEmpty,
  find,
  include,
  insert,
  toArray,
  remove,
} from "../persistentRedBlackTree";

describe('Pair', () => {
  context('from', () => {
    it('値が primitive の場合', () => {
      assert.deepStrictEqual(Pair.from(1, 'one'), { key: 1, value: 'one' });
      assert.deepStrictEqual(Pair.from(2, 'two'), { key: 2, value: 'two' });
      assert.deepStrictEqual(Pair.from(3, 'three'), { key: 3, value: 'three' });
    });

    it('値が object の場合', () => {
      assert.deepStrictEqual(Pair.from('one', { value: 1 }), { key: 'one', value: { value: 1 } });
      assert.deepStrictEqual(Pair.from('two', { value: 2 }), { key: 'two', value: { value: 2 } });
      assert.deepStrictEqual(Pair.from('three', { value: 3 }), { key: 'three', value: { value: 3 } });
    });
  });
});

describe('RBT', () => {
  context('isEmpty', () => {
    it('空の場合', () => {
      assert.isTrue(isEmpty(RBT.new()));
    });
    it('空でない場合', () => {
      const rbtree = insert(RBT.new(), Pair.from(1, 'one'));
      assert.isFalse(isEmpty(rbtree));
    })
  });

  context('find', () => {
    it('keyが存在しない場合', () => {
      let rbtree = RBT.new();
      rbtree = insert(rbtree, Pair.from(50, 50));
      rbtree = insert(rbtree, Pair.from(100, 100));
      rbtree = insert(rbtree, Pair.from(5, 5));
      rbtree = insert(rbtree, Pair.from(51, 51));
      assert.isNull(find(rbtree, 1));
      assert.isNull(find(rbtree, 10));
      assert.isNull(find(rbtree, 20));
      assert.isNull(find(rbtree, 30));
      assert.isNull(find(rbtree, 1000));
    });
    it('keyが存在する場合', () => {
      let rbtree = RBT.new();
      rbtree = insert(rbtree, Pair.from(100, 100));
      rbtree = insert(rbtree, Pair.from(1, 1));
      rbtree = insert(rbtree, Pair.from(51, 51));
      rbtree = insert(rbtree, Pair.from(50, 50));
      assert.deepStrictEqual(find(rbtree, 1), { key: 1, value: 1 });
      assert.deepStrictEqual(find(rbtree, 50), { key: 50, value: 50 });
      assert.deepStrictEqual(find(rbtree, 51), { key: 51, value: 51 });
      assert.deepStrictEqual(find(rbtree, 100), { key: 100, value: 100 });
    });
  })

  context('include', () => {
    it('keyが存在しない場合', () => {
      let rbtree = RBT.new();
      rbtree = insert(rbtree, Pair.from(50, 50));
      rbtree = insert(rbtree, Pair.from(100, 100));
      rbtree = insert(rbtree, Pair.from(5, 5));
      rbtree = insert(rbtree, Pair.from(51, 51));
      assert.isFalse(include(rbtree, 1));
      assert.isFalse(include(rbtree, 10));
      assert.isFalse(include(rbtree, 20));
      assert.isFalse(include(rbtree, 30));
      assert.isFalse(include(rbtree, 1000));
    });
    it('keyが存在する場合', () => {
      let rbtree = RBT.new();
      rbtree = insert(rbtree, Pair.from(100, 100));
      rbtree = insert(rbtree, Pair.from(1, 1));
      rbtree = insert(rbtree, Pair.from(51, 51));
      rbtree = insert(rbtree, Pair.from(50, 50));
      assert.isTrue(include(rbtree, 1));
      assert.isTrue(include(rbtree, 50));
      assert.isTrue(include(rbtree, 51));
      assert.isTrue(include(rbtree, 100));
    });
  })

  context('insert', () => {
    const createRandomNumbers = (length: number, seed: string) => {
      const srand = seedrandom(seed);
      return [...new Set(
        [...Array(length)].map(x => Math.floor(srand() * 100000) % 100000)
      )];
    }

    it('ランダム数値 10個', () => {
      const randomNumbers = createRandomNumbers(10, 'insert 1');
      const sortedRandomNumbers = [...randomNumbers].sort((a, b) => a - b);

      let rbtree: RBT<number, number> = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      assert.deepStrictEqual(toArray(rbtree), sortedRandomNumbers.map(num => Pair.from(num, num)));
    });

    it('ランダム数値 100個', () => {
      const randomNumbers = createRandomNumbers(100, 'insert 2');
      const sortedRandomNumbers = [...randomNumbers].sort((a, b) => a - b);

      let rbtree: RBT<number, number> = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      assert.deepStrictEqual(toArray(rbtree), sortedRandomNumbers.map(num => Pair.from(num, num)));
    });

    it('ランダム数値 1000個', () => {
      const randomNumbers = createRandomNumbers(1000, 'insert 3');
      const sortedRandomNumbers = [...randomNumbers].sort((a, b) => a - b);

      let rbtree: RBT<number, number> = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      assert.deepStrictEqual(toArray(rbtree), sortedRandomNumbers.map(num => Pair.from(num, num)));
    });

    it('ランダム数値 10000個', () => {
      const randomNumbers = createRandomNumbers(10000, 'insert 4');
      const sortedRandomNumbers = [...randomNumbers].sort((a, b) => a - b);

      let rbtree = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      assert.deepStrictEqual(toArray(rbtree), sortedRandomNumbers.map(num => Pair.from(num, num)));
    });

    it('ランダム数値 20000個', () => {
      const randomNumbers = createRandomNumbers(20000, 'insert 5');
      const sortedRandomNumbers = [...randomNumbers].sort((a, b) => a - b);

      let rbtree = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      assert.deepStrictEqual(toArray(rbtree), sortedRandomNumbers.map(num => Pair.from(num, num)));
    });

    it('ランダム数値 40000個', () => {
      const randomNumbers = createRandomNumbers(40000, 'insert 6');
      const sortedRandomNumbers = [...randomNumbers].sort((a, b) => a - b);

      let rbtree = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      assert.deepStrictEqual(toArray(rbtree), sortedRandomNumbers.map(num => Pair.from(num, num)));
    });

    it('ランダム数値 80000個', () => {
      const randomNumbers = createRandomNumbers(80000, 'insert 7');
      const sortedRandomNumbers = [...randomNumbers].sort((a, b) => a - b);

      let rbtree = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      assert.deepStrictEqual(toArray(rbtree), sortedRandomNumbers.map(num => Pair.from(num, num)));
    });

    it('ランダム数値 160000個', () => {
      const randomNumbers = createRandomNumbers(160000, 'insert 8');
      const sortedRandomNumbers = [...randomNumbers].sort((a, b) => a - b);

      let rbtree = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      assert.deepStrictEqual(toArray(rbtree), sortedRandomNumbers.map(num => Pair.from(num, num)));
    });

    it('ランダム数値 320000個', () => {
      const randomNumbers = createRandomNumbers(320000, 'insert 9');
      const sortedRandomNumbers = [...randomNumbers].sort((a, b) => a - b);

      let rbtree = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      assert.deepStrictEqual(toArray(rbtree), sortedRandomNumbers.map(num => Pair.from(num, num)));
    });
  })

  context('remove', () => {
    const createRandomNumbers = (length: number, seed: string) => {
      const srand = seedrandom(seed);
      return [...new Set(
        [...Array(length)].map(x => Math.floor(srand() * 100000) % 100000)
      )];
    }

    it('keyが存在しない場合', () => {
      let rbtree = RBT.new();
      [...Array(100)].forEach((_, i) => { rbtree = insert(rbtree, Pair.from(i + 1, i + 1)) });
      assert.deepStrictEqual(remove(rbtree, -1), [rbtree, null]);
      assert.deepStrictEqual(remove(rbtree, 0), [rbtree, null]);
      assert.deepStrictEqual(remove(rbtree, 1000), [rbtree, null]);
    })

    it('keyが存在する場合', () => {
      const rbtrees: RBT<number, number>[] = [];
      rbtrees.push(RBT.new());
      [...Array(100)].forEach((_, i) => { rbtrees.push(insert(rbtrees[i], Pair.from(i + 1, i + 1))) });
      assert.deepStrictEqual(toArray(remove(rbtrees[100], 100)[0]), toArray(rbtrees[99]));
    })

    it('ランダム数値 10個', () => {
      const randomNumbers = createRandomNumbers(10, 'remove 1');

      let rbtree: RBT<number, number> = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      randomNumbers.forEach((num, i) => { rbtree = remove(rbtree, num)[0]; });
      assert.deepStrictEqual(toArray(rbtree), []);
    });

    it('ランダム数値 100個', () => {
      const randomNumbers = createRandomNumbers(100, 'remove 2');

      let rbtree: RBT<number, number> = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      randomNumbers.forEach(num => { rbtree = remove(rbtree, num)[0]; });
      assert.deepStrictEqual(toArray(rbtree), []);
    });

    it('ランダム数値 1000個', () => {
      const randomNumbers = createRandomNumbers(1000, 'remove 3');

      let rbtree: RBT<number, number> = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      randomNumbers.forEach(num => { rbtree = remove(rbtree, num)[0]; });
      assert.deepStrictEqual(toArray(rbtree), []);
    });

    it('ランダム数値 10000個', () => {
      const randomNumbers = createRandomNumbers(10000, 'remove 4');

      let rbtree = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      randomNumbers.forEach(num => { rbtree = remove(rbtree, num)[0]; });
      assert.deepStrictEqual(toArray(rbtree), []);
    });

    it('ランダム数値 20000個', () => {
      const randomNumbers = createRandomNumbers(20000, 'remove 5');

      let rbtree = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      randomNumbers.forEach(num => { rbtree = remove(rbtree, num)[0]; });
      assert.deepStrictEqual(toArray(rbtree), []);
    });

    it('ランダム数値 40000個', () => {
      const randomNumbers = createRandomNumbers(40000, 'remove 6');

      let rbtree = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      randomNumbers.forEach(num => { rbtree = remove(rbtree, num)[0]; });
      assert.deepStrictEqual(toArray(rbtree), []);
    });

    it('ランダム数値 80000個', () => {
      const randomNumbers = createRandomNumbers(80000, 'remove 7');

      let rbtree = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      randomNumbers.forEach(num => { rbtree = remove(rbtree, num)[0]; });
      assert.deepStrictEqual(toArray(rbtree), []);
    });

    it('ランダム数値 160000個', () => {
      const randomNumbers = createRandomNumbers(160000, 'remove 8');

      let rbtree = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      randomNumbers.forEach(num => { rbtree = remove(rbtree, num)[0]; });
      assert.deepStrictEqual(toArray(rbtree), []);
    });

    it('ランダム数値 320000個', () => {
      const randomNumbers = createRandomNumbers(320000, 'remove 9');

      let rbtree = RBT.new();
      randomNumbers.forEach(num => { rbtree = insert(rbtree, Pair.from(num, num)); });
      randomNumbers.forEach(num => { rbtree = remove(rbtree, num)[0]; });
      assert.deepStrictEqual(toArray(rbtree), []);
    });
  })
});
