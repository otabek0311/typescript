// 1-masala
 
type ExcludeKeys<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

function LogClass<T extends { new (...args: any[]): {} }>(value: T, context: any) {
  return class extends value {
    constructor(...args: any[]) {
      console.log("Class initialized");
      super(...args);
    }
  };
}

// 2-masala

function LogMethod(value: any, context: any) {
  return function (this: any, ...args: any[]) {
    console.log(`Method ${String(context.name)} called with args:`, args);
    const result = value.apply(this, args);
    console.log(`Method ${String(context.name)} returned:`, result);
    return result;
  };
}

function LogAsync(value: any, context: any) {
  return async function (this: any, ...args: any[]) {
    console.log(`Async method ${String(context.name)} called with args:`, args);
    const result = await value.apply(this, args);
    console.log(`Async method ${String(context.name)} resolved with:`, result);
    return result;
  };
}

function ValidateString(value: any, context: any) {
  return function (this: any, ...args: any[]) {
    for (const arg of args) {
      if (typeof arg !== "string" || arg.trim().length === 0) {
        throw new Error(
          `Invalid string argument for method ${String(context.name)}`
        );
      }
    }
    return value.apply(this, args);
  };
}

// 3-masala

function Timestamp<T extends { new (...args: any[]): {} }>(
  value: T,
  context: any
) {
  return class extends value {
    createdAt: Date;

    constructor(...args: any[]) {
      super(...args);
      this.createdAt = new Date();
    }
  };
}

// 4-masala

function Readonly(value: any, context: any) {
  context.addInitializer(function (this: any) {
    Object.defineProperty(this, context.name, {
      writable: false,
      configurable: false,
    });
  });
}

// 5-masala

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UpdatableProduct = Partial<Product>;
type ReadonlyProduct = Readonly<Product>;

type PartialUser = Partial<User>;
type SafeUser = ExcludeKeys<User, "password">;
type UserIdAndName = Pick<User, "id" | "name">;

// 6-masala

const product1: Product = {
  id: 1,
  name: "Phone",
  price: 150,
  description: "Smartphone",
};

const product2: Product = {
  id: 2,
  name: "Laptop",
  price: 90,
  description: "Office laptop",
};

const product3: Product = {
  id: 3,
  name: "Tablet",
  price: 250,
  description: "Tablet device",
};

const products: Product[] = [product1, product2, product3];

const updatableProductExample: UpdatableProduct = {
  price: 200,
};

const readonlyProductExample: ReadonlyProduct = product1;

// 7-masala

namespace MathOperations {
  export function add(a: number, b: number): number {
    return a + b;
  }

  export function subtract(a: number, b: number): number {
    return a - b;
  }

  export function multiply(a: number, b: number): number {
    return a * b;
  }

  export function divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  }
}

const sumResult = MathOperations.add(10, 5);
const subtractResult = MathOperations.subtract(10, 5);
const multiplyResult = MathOperations.multiply(10, 5);

let divideResult: number | undefined;
try {
  divideResult = MathOperations.divide(10, 2);
} catch (error) {
  console.error(error);
}

try {
  MathOperations.divide(10, 0);
} catch (error) {
  console.error("Divide by zero error:", error);
}

// 8-masala

@LogClass
@Timestamp
class UserClass {
  @Readonly
  id: number;

  name: string;
  email: string;
  password: string;
  createdAt!: Date;

  constructor(id: number, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  @LogMethod
  @ValidateString
  updateName(newName: string): void {
    this.name = newName;
  }
}

function updateUser(user: UserClass, updates: PartialUser): UserClass {
  return { ...user, ...updates } as UserClass;
}

const initialUser: UserClass = new UserClass(
  1,
  "Alice",
  "alice@example.com",
  "secret"
);
const updatedUser = updateUser(initialUser, { name: "Updated Alice" });

const basicUser: UserIdAndName = {
  id: 2,
  name: "Bob",
};

const safeUser: SafeUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

try {
  initialUser.id = 5;
} catch (error) {
  console.error("Readonly property change error:", error);
}

console.log("User created at:", (initialUser as any).createdAt);

// 9-masala

function filterByProperty<T>(items: T[], key: keyof T, value: any): T[] {
  return items.filter((item) => item[key] === value);
}

function filterGreaterThan<T>(
  items: T[],
  key: keyof T,
  threshold: number
): T[] {
  return items.filter((item) => {
    const propertyValue = item[key];
    return typeof propertyValue === "number" && propertyValue > threshold;
  });
}

const filteredByName = filterByProperty(products, "name", "Phone");
const expensiveProducts = filterGreaterThan(products, "price", 100);

// 10-masala

function handleUnknownValue(value: unknown) {
  if (typeof value === "number") {
    return value * 2;
  }
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  if (Array.isArray(value)) {
    return value.length;
  }
  return value;
}

const unknownNumberResult = handleUnknownValue(10);
const unknownStringResult = handleUnknownValue("hello");
const unknownArrayResult = handleUnknownValue([1, 2, 3]);

// 11-masala

function fail(message: string): never {
  throw new Error(message);
}

function checkPositiveNumber(value: number): void {
  if (value < 0) {
    fail("Value should not be negative");
  }
}

checkPositiveNumber(5);

// 12-masala

class ApiService {
  @LogAsync
  async fetchData(data: SafeUser): Promise<SafeUser> {
    return new Promise<SafeUser>((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  }
}

const apiService = new ApiService();

apiService.fetchData(safeUser).then((response) => {
  console.log("Fetched data:", response);
});
