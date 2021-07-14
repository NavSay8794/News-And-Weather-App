const sortingFxn = (arr1, arr2) =>{
    let result = []
    let i=0, j=0;

    while(i<arr1.length && j<arr2.length){
        if(arr1[i]< arr2[j]){
            result.push(arr1[i])
            i++
        }
        else{
            result.push(arr2[j])
            j++
        }
    }

    while(i<arr1.length){
        result.push(arr1[i])
        i++
    }

    while(j< arr2.length){
        result.push(arr2[j])
        j++
    }

    return result
}


const sortCaller = (arr)=>{
    if(arr.length <= 1){
        return arr
    }
    let mid = Math.floor(arr.length/2)
    let left = sortCaller(arr.slice(0,mid))
    let right = sortCaller(arr.slice(mid))

    return sortingFxn(left,right)
}

console.log(sortCaller([10,5,98,32,22,87,5,6,9]))