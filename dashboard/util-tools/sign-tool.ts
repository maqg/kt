import {APIRequest} from "./api/api-tools";

export class SignTool {
    private static add(x: number, y: number): number {
        return((x & 0x7FFFFFFF) + (y & 0x7FFFFFFF)) ^ (x & 0x80000000) ^ (y & 0x80000000);
    }
    private static SHA1hex(num: number): string {
        let sHEXChars = "0123456789abcdef";
        let str = "";
        for(let j = 7; j >= 0; j--)
            str += sHEXChars.charAt((num >> (j * 4)) & 0x0F);
        return str;
    }
    private static AlignSHA1(sIn: string): number[] {
        let nblk = ((sIn.length + 8) >> 6) + 1,
            blks = new Array(nblk * 16);
        let i;
        for(i = 0; i < nblk * 16; i++) blks[i] = 0;
        for(i = 0; i < sIn.length; i++)
            blks[i >> 2] |= sIn.charCodeAt(i) << (24 - (i & 3) * 8);
        blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
        blks[nblk * 16 - 1] = sIn.length * 8;
        return blks;
    }
    private static rol(num:number, cnt:number): number {
        return(num << cnt) | (num >>> (32 - cnt));
    }
    private static ft(t:number, b:number, c:number, d:number): number {
        if(t < 20) return(b & c) | ((~b) & d);
        if(t < 40) return b ^ c ^ d;
        if(t < 60) return(b & c) | (b & d) | (c & d);
        return b ^ c ^ d;
    }
    private static kt(t: number): number {
        return(t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
            (t < 60) ? -1894007588 : -899497514;
    }
    private static SHA1(sIn: string): string {
        let x = this.AlignSHA1(sIn);
        let w = new Array(80);
        let a = 1732584193;
        let b = -271733879;
        let c = -1732584194;
        let d = 271733878;
        let e = -1009589776;
        for(let i = 0; i < x.length; i += 16) {
            let olda = a;
            let oldb = b;
            let oldc = c;
            let oldd = d;
            let olde = e;
            for(let j = 0; j < 80; j++) {
                if(j < 16) w[j] = x[i + j];
                else w[j] = this.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                let t = this.add(this.add(this.rol(a, 5), this.ft(j, b, c, d)), this.add(this.add(e, w[j]), this.kt(j)));
                e = d;
                d = c;
                c = this.rol(b, 30);
                b = a;
                a = t;
            }
            a = this.add(a, olda);
            b = this.add(b, oldb);
            c = this.add(c, oldc);
            d = this.add(d, oldd);
            e = this.add(e, olde);
        }
        let SHA1Value = this.SHA1hex(a) + this.SHA1hex(b) + this.SHA1hex(c) + this.SHA1hex(d) + this.SHA1hex(e);
        return SHA1Value.toUpperCase();
    }
    private static SHA2(sIn: string) {
        return this.SHA1(sIn).toLowerCase();
    }
    static createSign(paras: APIRequest): string {

        let parasStr = "";
        let params: string[] = [];

        parasStr += "api=" + paras["api"];
        parasStr += "timestamp=" + paras["timestamp"];

        if (paras.hasOwnProperty("token")) {
            parasStr += "token=" + paras["token"];
        }

        for (let key in paras["paras"]) {
            params.push(key);
        }
        params.sort();

        for (let key of params) {
            parasStr += key + "=" + paras["paras"][key];
        }
        // console.log("got sign " + sign + " of " + parasStr);

        return this.SHA2(parasStr);
    }
}






