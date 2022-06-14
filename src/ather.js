// инициализация модального окна, для дальнейшего взаимодействия с ним, скрыть/показать
const myModal = new bootstrap.Modal('#exampleModal', {
	keyboard: false
})

// инициализация модального окна, для дальнейшего взаимодействия с ним, скрыть/показать
const modalDevops = new bootstrap.Modal('#forDevops', {
	keyboard: false
})

// занескннния элементов DOM дерева в переменные, для удобства взаимодействия
const roursEl = document.querySelector('.rours')
const modalRoute = document.querySelector('.modal-xl')
const modalforDevops = document.querySelector('#forDevops')
const formClients = document.querySelector('form.formClients')
const formClientsDevops = document.querySelectorAll('form.formClients')[1]
const formRoutes = document.querySelector('form.formRoutes')
const formReviews = document.querySelector('form.formReviews')
const btnSubmitClient = formClients.querySelector('button')
const btnSubmitRoute = formRoutes.querySelector('button')
const btnSubmitReviews = formReviews.querySelector('button')
const reviews = document.querySelector('.reviews')
const btnForDevops = document.querySelector('.btnForDevops')
const htmlEls = {
	roursEl,
	modalRoute,
	formClients,
	formClientsDevops,
	formRoutes,
	formReviews,
	btnSubmitClient,
	btnSubmitRoute,
	btnSubmitReviews,
	reviews,
	modalforDevops,
	btnForDevops
}

// обработка события Нажатия на кнопку
btnForDevops.addEventListener('click', async () => {
	modalDevops.show()
})

// экспорт переменных
export {
	myModal,
	modalDevops,
	htmlEls
}