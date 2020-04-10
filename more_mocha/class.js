

module.exports = class Fib{

    findNthFib(numIdx){
        if(numIdx<0) return null;
        if(numIdx == 0) return 1;
        if(numIdx == 1) return 1;

        return this.findNthFib(numIdx - 1)+this.findNthFib(numIdx - 2)
    }

}