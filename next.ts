function upperCaseKeys(obj: object): object {
    const result: any = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key.toUpperCase()] = (obj as any)[key];
        }
    }
    return result;
}
console.log(upperCaseKeys({ name: "Ali", age: 25, country: "Uzbekistan" }));

function fizzBuzz(n: number): string[] {
    const result: string[] = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) result.push("FizzBuzz");
        else if (i % 3 === 0) result.push("Fizz");
        else if (i % 5 === 0) result.push("Buzz");
        else result.push(i.toString());
    }
    return result;
}
console.log(fizzBuzz(15));

function getPermutations(str: string): string[] {
    if (str.length <= 1) return [str];
    const result = new Set<string>();
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const rest = str.slice(0, i) + str.slice(i + 1);
        for (const perm of getPermutations(rest)) {
            result.add(char + perm);
        }
    }
    return Array.from(result);
}
console.log(getPermutations("abc"));

function jsonDiff(obj1: object, obj2: object): object {
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    const result: any = {};
    keys.forEach(key => {
        if ((obj1 as any)[key] !== (obj2 as any)[key]) {
            result[key] = { old: (obj1 as any)[key], new: (obj2 as any)[key] };
        }
    });
    return result;
}
console.log(jsonDiff({ name: "Ali", age: 25 }, { name: "Ali", age: 26 }));

function sortIPs(ips: string[]): string[] {
    return ips.sort((ipA, ipB) => {
        const partsA = ipA.split('.').map(Number);
        const partsB = ipB.split('.').map(Number);
        for (let i = 0; i < 4; i++) {
            if (partsA[i] !== partsB[i]) return (partsA[i] ?? 0) - (partsB[i] ?? 0);
        }
        return 0;
    });
}
console.log(sortIPs(["192.168.1.1", "10.0.0.1", "172.16.0.1", "192.168.0.1"]));

function compressString(str: string): string {
    let result = "";
    let count = 1;
    for (let i = 1; i <= str.length; i++) {
        if (str[i] === str[i - 1]) {
            count++;
        } else {
            result += (str[i - 1] ?? '') + count;
            count = 1;
        }
    }
    return result;
}
console.log(compressString("aaabbcddd"));

function isValidSudoku(board: number[][]): boolean {
    for (let i = 0; i < 9; i++) {
        const row = new Set<number>();
        const col = new Set<number>();
        for (let j = 0; j < 9; j++) {
            const rowVal = board[i]?.[j];
            const colVal = board[j]?.[i];
            if (rowVal && row.has(rowVal)) return false;
            if (rowVal) row.add(rowVal);
            if (colVal && col.has(colVal)) return false;
            if (colVal) col.add(colVal);
        }
    }
    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            const block = new Set<number>();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const value = board[row + i]?.[col + j];
                    if (value && block.has(value)) return false;
                    if (value) block.add(value);
                }
            }
        }
    }
    return true;
}
console.log(isValidSudoku([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]));

function groupAnagrams(words: string[]): string[][] {
    const map = new Map<string, string[]>();
    for (const word of words) {
        const key = word.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(word);
    }
    return Array.from(map.values());
}
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));