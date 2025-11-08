// 1. Object keylarini katta harfga o'zgartirish (Object.entries va reduce bilan)
function upperCaseKeys(obj: object): object {
    return Object.entries(obj).reduce((acc, [k, v]) => {
        acc[k.toUpperCase()] = v;
        return acc;
    }, {} as any);
}
console.log(upperCaseKeys({ name: "Ali", age: 25, country: "Uzbekistan" }));

// 2. FizzBuzz (ternary bilan)
function fizzBuzz(n: number): string[] {
    return Array.from({ length: n }, (_, i) => {
        const x = i + 1;
        return x % 15 === 0 ? "FizzBuzz" : x % 3 === 0 ? "Fizz" : x % 5 === 0 ? "Buzz" : x + "";
    });
}
console.log(fizzBuzz(15));

// 3. Permutatsiyalar (rekursiv, Set bilan unikal qilish)
function getPermutations(str: string): string[] {
    if (str.length <= 1) return [str];
    const out = new Set<string>();
    for (let i = 0; i < str.length; i++) {
        for (const perm of getPermutations(str.slice(0, i) + str.slice(i + 1)))
            out.add(str[i] + perm);
    }
    return [...out];
}
console.log(getPermutations("abc"));

// 4. Ikki object farqlari (faqat oddiy keylar uchun)
function jsonDiff(a: object, b: object): object {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    const res: any = {};
    keys.forEach(k => {
        if ((a as any)[k] !== (b as any)[k])
            res[k] = { old: (a as any)[k], new: (b as any)[k] };
    });
    return res;
}
console.log(jsonDiff({ name: "Ali", age: 25 }, { name: "Ali", age: 26 }));

// 5. IP manzillarni saralash (split va map bilan)
function sortIPs(ips: string[]): string[] {
    return ips.sort((a, b) =>
        a.split('.').map(Number).reduce((acc, v, i) => acc * 256 + v - b.split('.').map(Number)[i], 0)
    );
}
console.log(sortIPs(["192.168.1.1", "10.0.0.1", "172.16.0.1", "192.168.0.1"]));

// 6. Stringni qisqartirish (oddiy for bilan)
function compressString(str: string): string {
    let res = "", cnt = 1;
    for (let i = 1; i <= str.length; i++) {
        if (str[i] === str[i - 1]) cnt++;
        else res += str[i - 1] + cnt, cnt = 1;
    }
    return res;
}
console.log(compressString("aaabbcddd"));

// 7. Sudoku validatsiyasi (Set va for bilan)
function isValidSudoku(b: number[][]): boolean {
    for (let i = 0; i < 9; i++) {
        let row = new Set(), col = new Set();
        for (let j = 0; j < 9; j++) {
            if (b[i][j] && row.has(b[i][j])) return false;
            if (b[i][j]) row.add(b[i][j]);
            if (b[j][i] && col.has(b[j][i])) return false;
            if (b[j][i]) col.add(b[j][i]);
        }
    }
    for (let r = 0; r < 9; r += 3)
        for (let c = 0; c < 9; c += 3) {
            let s = new Set();
            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++) {
                    let v = b[r + i][c + j];
                    if (v && s.has(v)) return false;
                    if (v) s.add(v);
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

// 8. Anagramlarni guruhlash (Map bilan)
function groupAnagrams(words: string[]): string[][] {
    const m = new Map<string, string[]>();
    for (const w of words) {
        const k = w.split('').sort().join('');
        if (!m.has(k)) m.set(k, []);
        m.get(k)!.push(w);
    }
    return [...m.values()];
}
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));