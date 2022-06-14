// импорт зависимостей
import { myModal, htmlEls } from './ather.js'
import { collection, query, where, getDocs } from "firebase/firestore";
import { Route, db, Review } from './db.js'
const { roursEl, modalRoute, reviews } = htmlEls

// функция позволяющая получить данные из коллекции Routes и занести их в DOM дерево
const getRoutes = async () => {
	try {
		await Route.get()
			.then(data => {
				return data.docs.map(doc => doc.data())
			})
			.then(data => {
				data.forEach(el => {
					roursEl.innerHTML += `
				<div id="${el.id}" class="card" style="width: 18rem;">
					<img src="${el['images'][0]}" class="card-img-top" alt="image">
					<div class="card-body">
						<h5 class="card-title">${el['title']}</h5>
						<p class="card-text tour">${el['desc']}</p>
						<button class="btn btn-primary btn-getRouteInfo">Подробнее</button>
					</div>
				</div>`
				})
			})

		document.querySelectorAll('.btn-getRouteInfo').forEach(el => {
			el.addEventListener('click', async (e) => {
				const id = e.target.parentElement.parentElement.getAttribute('id')
				const routesRef = collection(db, "Routes");
				const q = query(routesRef, where("id", "==", id));
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					const info = doc.data()
					const tourProgram = info['tourProgram'].map((propgram, index) => (
						`<div class="accordion-item">
						<h2 class="accordion-header" id="headingThree">
							<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index + 1}" aria-expanded="false" aria-controls="collapse${index + 1}">
								<div class="numberDay">${index + 1} день</div> <strong>${propgram['title']}</strong>
							</button>
						</h2>
						<div id="collapse${index + 1}" class="accordion-collapse collapse" aria-labelledby="heading${index + 1}" data-bs-parent="#accordionExample">
							<div class="accordion-body">
								${propgram['desc']}
							</div>
						</div>
					</div>`
					))
					modalRoute.innerHTML = `
						<div class="modal-content">
							<div class="modal-header">
								<span><h1 class="modal-title" id="exampleModalLabel">${info['title']}</h1> <span>Сложность <strong>${info['complexity']} / 5</strong></span> </span>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
								<p>${info['desc']}</p>
								<div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
								
								<!-- slider start -->
								<div class="carousel-inner">
									<div class="carousel-item active">
										<img src="${info['images'][0]}" class="d-block w-100" alt="image">
									</div>
									<div class="carousel-item">
										<img src="${info['images'][1]}" class="d-block w-100" alt="image">
									</div>
									<div class="carousel-item">
										<img src="${info['images'][2]}" class="d-block w-100" alt="image">
									</div>
								</div>
								<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
									<span class="carousel-control-prev-icon" aria-hidden="true"></span>
									<span class="visually-hidden">Previous</span>
								</button>
								<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
									<span class="carousel-control-next-icon" aria-hidden="true"></span>
									<span class="visually-hidden">Next</span>
								</button>
								</div>
								<!-- slider end -->

								<!-- accordion start -->
								<h1 class="accordion-title">Программа тура</h1>
								<div class="accordion" id="accordionExample">
								${tourProgram.join(' ')}
								</div>
								<!-- accordion end -->

								<h1 class="accordion-title">Дополнительные услуги</h1>
								<ul class="list-group">
									${info['services'].map(service => (
										`<li class="list-group-item">${service}</li>`
									)).join(' ')}
													
								</ul>
								</div>
						</div>
				`
					if (doc.id) return myModal.show()
				});
			})
		})
	} catch (error) {
		console.log(error);
		alert('Не удалось получить туры')
	}

}

// функция позволяющая получить данные из коллекции Reviews и занести их в DOM дерево
const getReviews = async () => {
	try {
		await Review.get()
			.then(data => {
				return data.docs.map(doc => doc.data())
			})
			.then(data => {
				data.forEach(review => {
					reviews.innerHTML += `
						<div class="card" style="width: 18rem;">
							<img src="${review['image_url']}" class="card-img-top" alt="person">
							<div class="card-body">
								<h4 class="card-title">${review['tour_name']}</h4>
								<hr />
								<h6 class="card-title">${review['FIO']}</h6>
								<p class="card-text">${review['comment']}</p>
							</div>
						</div>
					`
				})
			})


	} catch (error) {
		console.log(error);
		alert('Не удалось получить отзывы')
	}
}

// вызов функций, чтобы получить все данные сразу же
getRoutes()
getReviews()