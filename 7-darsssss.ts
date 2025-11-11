function identity<T>(value: T): T {
  return value;
}

function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

function getLastElement<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

interface KeyValue<K, V> {
  key: K;
  value: V;
}

function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

function getMinValue<T extends number>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr.reduce((min, current) => (current < min ? current : min));
}

function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

function sortArray<T extends number | string>(arr: T[]): T[] {
  return [...arr].sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
}

interface DataStore<T> {
  items: T[];
  create(item: T): void;
  read(index: number): T | undefined;
  update(index: number, item: T): void;
  delete(index: number): void;
}

class SimpleDataStore<T> implements DataStore<T> {
  items: T[] = [];

  create(item: T): void {
    this.items.push(item);
  }

  read(index: number): T | undefined {
    return this.items[index];
  }

  update(index: number, item: T): void {
    if (index >= 0 && index < this.items.length) {
      this.items[index] = item;
    }
  }

  delete(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }
}

class ArrayManager<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  getLength(): number {
    return this.items.length;
  }

  getItems(): T[] {
    return this.items;
  }
}

function processValue<T extends number | string>(value: T): string {
  return `Processed: ${value}`;
}

function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

class KeyValueStore<K, V> {
  private store: Map<K, V> = new Map();

  set(key: K, value: V): void {
    this.store.set(key, value);
  }

  get(key: K): V | undefined {
    return this.store.get(key);
  }

  has(key: K): boolean {
    return this.store.has(key);
  }
}

class Stack<T> {
  private items: T[] = [];
  private maxSize: number;

  constructor(maxSize: number = Infinity) {
    this.maxSize = maxSize;
  }

  push(item: T): void {
    if (this.items.length >= this.maxSize) {
      throw new Error("Stack is full");
    }
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  isFull(): boolean {
    return this.items.length >= this.maxSize;
  }
}

function groupBy<T, K extends string | number>(
  arr: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

function mergeKeyValues<K1, V1, K2, V2>(
  kv1: { key: K1; value: V1 },
  kv2: { key: K2; value: V2 }
): { key: K1 | K2; value: V1 | V2 }[] {
  return [
    { key: kv1.key, value: kv1.value },
    { key: kv2.key, value: kv2.value },
  ];
}

class BoundedArray<T> {
  private items: T[] = [];
  private maxLength: number;

  constructor(maxLength: number) {
    this.maxLength = maxLength;
  }

  add(item: T): void {
    if (this.items.length >= this.maxLength) {
      throw new Error(
        `Cannot add item. Maximum length of ${this.maxLength} reached.`
      );
    }
    this.items.push(item);
  }

  getItems(): T[] {
    return this.items;
  }

  getLength(): number {
    return this.items.length;
  }
}

class Queue<T> {
  private items: T[] = [];
  private maxSize: number;

  constructor(maxSize: number = Infinity) {
    this.maxSize = maxSize;
  }

  enqueue(item: T): void {
    if (this.items.length >= this.maxSize) {
      throw new Error("Queue is full");
    }
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  isFull(): boolean {
    return this.items.length >= this.maxSize;
  }
}

interface NestedObject<T> {
  value: T;
  children?: NestedObject<T>[];
}

function processNestedObject<T>(obj: NestedObject<T>): void {
  console.log(obj.value);
  if (obj.children) {
    obj.children.forEach((child) => processNestedObject(child));
  }
}

function filterByType<T, U extends T>(
  arr: T[],
  type: new (...args: any[]) => U
): U[] {
  return arr.filter((item): item is U => item instanceof type);
}

function getUniqueElements<T>(arr: T[]): T[] {
  const unique: T[] = [];
  const seen = new Set<T>();

  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      unique.push(item);
    }
  }

  return unique;
}

class MultiGenericStore<T extends string, U extends number> {
  private store: Map<T, U> = new Map();

  set(key: T, value: U): void {
    this.store.set(key, value);
  }

  get(key: T): U | undefined {
    return this.store.get(key);
  }

  getAll(): Map<T, U> {
    return new Map(this.store);
  }
}


// mm