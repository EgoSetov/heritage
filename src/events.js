import { v4 as uuidv4 } from 'uuid';
import { Client, Route, Review } from './db.js'
import { htmlEls, modalDevops } from './ather.js'
const {
	formClients,
	btnSubmitClient,
	btnSubmitRoute,
	formRoutes,
	formClientsDevops,
	formReviews,
	btnSubmitReviews,
	reviews,
	roursEl
} = htmlEls

const addRoute = async (data) => {
	try {
		const {
			title,
			desc,
			complexity,
			images,
			services,
			tourProgram,
		} = data
		const id = uuidv4()

		const res = await Route.add({
			id,
			...data
		})

		return {
			id,
			...data
		}
	} catch (error) {
		console.log(error);
	}

}

const addClients = async (data) => {
	try {
		const {
			FIO,
			email,
			phone,
			sex
		} = data
		const id = uuidv4()
		await Client.add({
			id,
			...data
		})

		return {
			id,
			...data
		}
	} catch (error) {
		console.log(error);
	}
}

const addReviews = async (data) => {
	try {
		const {
			FIO,
			comment,
			tour_name
		} = data
		const id = uuidv4()

		await Review.add({
			id,
			...data
		})
		return {
			id,
			...data
		}
	} catch (error) {
		console.log(error);
	}
}

formClients.addEventListener('submit', async (e) => {
	const data = new FormData(formClients)

	btnSubmitClient.disabled = true
	const newClient = await addClients({
		FIO: data.get('FIO'),
		phone: data.get('phone'),
		email: data.get('email') || null,
		sex: data.get('sex')
	})
	btnSubmitClient.disabled = false

	if (newClient.id) {
		alert('Заявка успешно создана!')
		formClients.reset()
	} else {
		alert('Не удалось создать заявку')
	}
	e.preventDefault()

})

formClientsDevops.addEventListener('submit', async (e) => {
	e.preventDefault()

	const data = new FormData(formClients)

	btnSubmitRoute.disabled = true
	const newClient = await addClients({
		FIO: data.get('FIO'),
		phone: data.get('phone'),
		email: data.get('email') || null,
		sex: data.get('sex')
	})
	btnSubmitRoute.disabled = false

	if (newClient.id) {
		alert('Заявка успешно создана!')
		formClientsDevops.reset()
		formClients.reset()
	} else {
		alert('Не удалось создать заявку')
	}

})

formRoutes.addEventListener('submit', async (e) => {
	e.preventDefault()
	const data = new FormData(formRoutes)
	btnSubmitRoute.disabled = true
	console.log({
		title: data.get('title'),
		desc: data.get('desc'),
		complexity: data.get('complexity'),
		images: data.get('images').split('|').map(el => el.trim()),
		services: data.get('services').split('|').map(el => el.trim()),
		tourProgram: data.get('tourProgram').split('|').map(tour => {
			return {
				title: (tour.split('&')[0] || '').trim(),
				desc: (tour.split('&')[1] || '').trim()
			}
		})
	});
	const newRoute = await addRoute({
		title: data.get('title'),
		desc: data.get('desc'),
		complexity: data.get('complexity'),
		images: data.get('images').split('|').map(el => el.trim()),
		services: data.get('services').split('|').map(el => el.trim()),
		tourProgram: data.get('tourProgram').split('|').map(tour => {
			return {
				title: (tour.split('&')[0] || '').trim(),
				desc: (tour.split('&')[1] || '').trim()
			}
		})
	})
	btnSubmitRoute.disabled = false
	if (newRoute.id) {
		roursEl.innerHTML += `
		<div id="${newRoute.id}" class="card" style="width: 18rem;">
			<img src="${newRoute['images'][0]}" class="card-img-top" alt="image">
			<div class="card-body">
				<h5 class="card-title">${newRoute['title']}</h5>
				<p class="card-text">${newRoute['desc']}</p>
				<button class="btn btn-primary btn-getRouteInfo">Подробнее</button>
			</div>
		</div>`
		formRoutes.reset()
	} else {
		alert('Не удалось добавить тур')
	}
})

formReviews.addEventListener('submit', async (e) => {
	e.preventDefault()
	const data = new FormData(formReviews)
	btnSubmitReviews.disabled = true
	const newRevies = await addReviews({
		FIO: data.get('FIO'),
		tour_name: data.get('tour_name'),
		comment: data.get('comment')
	})
	btnSubmitReviews.disabled = false
	if (newRevies.id) {
		reviews.innerHTML += `
		<div class="card text-bg-success mb-3" style="max-width: 18rem;">
			<div class="card-header">${newRevies['tour_name']}</div>
			<div class="card-body">
				<h5 class="card-title">${newRevies['FIO']}</h5>
				<p class="card-text">${newRevies['comment']}</p>
			</div>
		</div>
	`
		formReviews.reset()
		modalDevops.hide()
	} else {
		alert('Не удалось добавить отзыв')
	}
})