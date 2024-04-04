let modals = document.querySelectorAll('.btn__modal')
let trigger = document.querySelector('.btn__delete')
modals.forEach((modal) => {
    modal.addEventListener('click', e => {
        const id = modal.getAttribute('data-id')
        trigger.href = `/dashboard/delete/${id}`
    })
})

setTimeout(()=>{
var alertMessage=document.getElementById('alert-message')
alertMessage.style.display='none';
},5000)
