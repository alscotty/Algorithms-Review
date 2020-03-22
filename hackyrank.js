// Complete the countNumbers function below. Adds
function countNumbers(arr) {
    arr.forEach(pair=>{
        let min=pair[0];
        let max=pair[1];
        let uniqs=0;

    let num;
        for(num=min; num<=max; num++){
            let num_obj={};
            let ind_nums=String(num).split("");
            ind_nums.forEach(num=>{
                if(!num_obj[num]){
                    num_obj[num]=0
                num_obj[num]++
                } else{
                num_obj[num]++
                }
            });
            if(Object.values(num_obj).every(num=> num<=1)){
                uniqs++
            }
        }
        console.log(uniqs);
    });

}