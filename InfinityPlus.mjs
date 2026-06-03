export default class InfinityPlus {
    constructor(mantissa = 1, exponent = 0, precision = 2) {
        this.mantissa = mantissa
        this.exponent = exponent
        this.precision = precision
        this.number = `${mantissa.toFixed(precision)}e${exponent}`
        this.abs()
        this.fix()
        this.rfix()
    }
    update() {
        if (this.exponent <= 999999) {this.number = `${this.mantissa.toFixed(this.precision)}e${this.exponent}`}
        else {this.number = `${this.mantissa.toFixed(this.precision)}e${this.exponent.toExponential(0).replace("e+", "e")}`}
    }
    fix() {
        return new Promise((resolve, reject) => {
            while (this.mantissa >= 10) {
                this.mantissa /= 10
                this.exponent++
            }
            if (this.mantissa === 0) {this.mantissa++}
            this.update()
            resolve([this.mantissa,this.exponent])
        })
    }
    rfix() {
        return new Promise((resolve, reject) => {
            while (this.mantissa < 1 && this.mantissa > 0) {
                this.mantissa *= 10
                this.exponent--
            }
            if (this.mantissa === 0) {this.mantissa++}
            this.update()
            resolve([this.mantissa,this.exponent])
        })
    }
    async add(mant, exp) {
        const lexp = Math.max(this.exponent, exp)
        let sexp = Math.min(this.exponent, exp)
        let smant = (lexp === this.exponent) ? mant : this.mantissa
        while (sexp < lexp) {
            smant /= 10
            sexp++
        }
        if (lexp === this.exponent) {this.mantissa += smant} else {this.mantissa = mant + smant; this.exponent = lexp}
        await this.fix()
        this.update()
        return [this.mantissa, this.exponent]
    }
    async subtract(mant, exp) {
        const lexp = Math.max(this.exponent, exp)
        let sexp = Math.min(this.exponent, exp)
        let smant = (lexp === this.exponent) ? mant : this.mantissa
        while (sexp < lexp) {
            smant /= 10
            sexp++
        }
        if (lexp === this.exponent) {this.mantissa -= smant} else {this.mantissa = mant - smant; this.exponent = lexp}
        await this.rfix()
        this.update()
        return [this.mantissa, this.exponent]
    }
    async multiply(mant, exp) {
        this.exponent += exp
        this.mantissa *= mant
        await this.fix()
        this.update()
        return [this.mantissa, this.exponent]
    }
     async divide(mant, exp) {
        this.exponent -= exp
        this.mantissa /= mant
        await this.rfix()
        this.update()
        return [this.mantissa, this.exponent]
    }
    async power(exp) {
        this.exponent *= exp
        this.mantissa **= exp
        await this.fix()
        this.update()
        return [this.mantissa, this.exponent]
    }
    async root(n) {
        this.mantissa **= 1/n
        this.exponent /= n
        if (this.mantissa < 1 && this.mantissa > 0) {
            await this.rfix()
        }
        else {
            await this.fix()
        }
        let intExp = Math.floor(this.exponent)
        if (this.exponent - intExp !== 0) {
            let deExp = this.exponent - intExp
            this.mantissa *= 10 ** deExp
            this.exponent = intExp
        }
        this.update()
        return [this.mantissa, this.exponent]
    }
    log10() {
        return Math.log10(this.mantissa) + this.exponent
    }
    log2() {
        return Math.log2(this.mantissa) + this.exponent * Math.log2(10)
    }
    ln() {
        return Math.log(this.mantissa) + this.exponent * Math.log(10)
    }
    async abs() {
        if (this.mantissa < 0) {this.mantissa = -this.mantissa}
        await this.fix()
        this.update()
        return [this.mantissa, this.exponent]
    }
    lessThan(mant, exp) {
        if (this.exponent < exp) {return true}
        else if (this.exponent > exp) {return false}
        else if (this.mantissa < mant) {return true}
        return false
    }
    greaterThan(mant, exp) {
        if (this.exponent > exp) {return true}
        else if (this.exponent < exp) {return false}
        else if (this.mantissa > mant) {return true}
        return false
    }
    equalTo(mant, exp) {
        if (this.exponent === exp && this.mantissa === mant) {return true}
        else {return false}
    }
    async floor() {
       this.mantissa = Math.floor(this.mantissa)
        await this.rfix()
        this.update()
        return [this.mantissa, this.exponent]
    }
    async ceiling() {
        this.mantissa = Math.ceil(this.mantissa)
        await this.fix()
        this.update()
        return [this.mantissa, this.exponent]
    }
    async round() {
        if (this.mantissa < 5.50) {await this.floor()}
        else {await this.ceiling()}
        this.update()
        return [this.mantissa, this.exponent]
    }
    toNumber() {
        if (this.lessThan(1.78,308)) {return this.mantissa * 10 ** this.exponent}
        else {return null}
    }
    seeNumber() {
        return this.number
    }
    static numberToIP(number, precision = 2) {
        if (!isFinite(number)) {return new InfinityPlus(1,308, precision)}
        let exp = Math.floor(Math.log10(number))
        let mant = (number / 10**exp)
        return new InfinityPlus(mant, exp, precision)
    }
    clone() {
        return new InfinityPlus(this.mantissa, this.exponent, this.precision)
    }
}
