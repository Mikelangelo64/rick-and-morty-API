'use sctrict'
// function findElement(element){
//     return function(parent){
//         return document.body.querySelector('.'+parent + '__' + element)
//     }
// }
function findElement(element){
    return document.body.querySelector('.'+element)
}


function sendRequest(url, id){
    return fetch(url+id).then(response => {
        return response.json()
    })
}

function getRandom(min, max){
    return Math.floor(min - 0.5 + Math.random() * (max - min +1))
}



let btnGetCh = document.body.querySelector('.btn__get__character')

btnGetCh.addEventListener('click', (e)=>{
    let id = getRandom(1, 826)

    sendRequest('https://rickandmortyapi.com/api/character/', id)
    .then(data => {
        let answ = {}
        for(let [key, item] of Object.entries(data)){
            if(key === 'name' || key === 'status' || key === 'gender'){
                answ['person-'+key+'__text'] = item
            }
            if(key === 'image'){
                //answ['card-person__img'] = item
                findElement('card-person__img').src = item
            }
            //console.log(key + ':::' +item)
        }
        return answ
    })
    .then(answ => {
        for([key, item] of Object.entries(answ)){
            console.log(item)
            // if(key === 'card-person__img'){
            //     findElement(key).src = item
            // }else{
                if(key === "person-status__text"){
                    let statusInfo = findElement('person-status__info')
                    if(item === 'Alive'){
                        console.log('HES ALIVE')
                        statusInfo.classList.remove('_status-dead')
                        statusInfo.classList.add('_status-alive')
                    }if(item === 'Dead'){
                        statusInfo.classList.remove('_status-alive')
                        statusInfo.classList.add('_status-dead')
                    }if(item === 'unknown'){
                        statusInfo.classList.remove('_status-dead')
                        statusInfo.classList.remove('_status-alive')
                    }
                }
                findElement(key).innerHTML = item
            //}
            
        }
        console.log(answ)
    })
})


console.dir(findElement('card-person__img'))


