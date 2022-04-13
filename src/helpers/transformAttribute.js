export default function transformAttribute(data) {
    // console.log('masuk')
    let tmpData = data
    if(data.price === 0){
        tmpData.price = 'Free'
    }
    else if (data.price <= 0.3){
        tmpData.price = "Low"
    }
    else if (data.price <= 0.7){
        tmpData.price = "Medium"
    }
    else{
        tmpData.price = "High"
    }
    if(data.accessibility <= 0.3){
        tmpData.accessibility = 'Easy'
    }
    else if (data.accessibility <= 0.7){
        tmpData.accessibility = "Medium"
    }
    else{
        tmpData.accessibility = "Hard"
    }
    return tmpData;
}
