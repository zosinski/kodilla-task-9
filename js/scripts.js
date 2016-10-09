$(function(){

	var carousel = $('#carousel');
	var carouselList = $('#carousel ul');
	var slideWidth = 1200;
	var carouselSpeed = 3000;
	var slideSpeed = 500;
	var currentSlideId = 0;
	
	setCarouselWidth();
	createCarouselControls();
	var carouselInterval = setInterval(slideToTheRight, carouselSpeed);
	// slideToId(10);
	
	function setCarouselWidth() {
		var carouselWidth = carouselList.find('li').length * slideWidth;
		console.log(carouselWidth);
		carouselList.css({width: carouselWidth});
	}

	function createCarouselControls() {

		createArrowControls();
		createSlideMiniatures();
	}

	function createArrowControls() {
		var leftArrow = $('<i>', {class: 'fa fa-chevron-left left-arrow'});
		var rightArrow = $('<i>', {class: 'fa fa-chevron-right right-arrow'}); 
		carousel.append(leftArrow);
		carousel.append(rightArrow);
		leftArrow.click(slideToTheRight_manual);
		rightArrow.click(slideToTheLeft_manual);
	}

	function createSlideMiniatures() {
		var miniatureList = $('<ul>', {class: 'slide-miniature-list'});
		carouselList.find('li').each(function(index) {
			console.log(index);
			var slideImg = $('<img />', {src: $(this).find('img').attr('src')})
			var slideMiniature = $('<li>', {
				class: 'slide-miniature',
				id: "slide-" + index
			});
			slideMiniature.append(slideImg);
			miniatureList.append(slideMiniature);
			console.log(slideMiniature);
			slideMiniature.click(function(){slideToId(index)});
		});
		carousel.after(miniatureList);
		setCurrentSlideMiniature(0, 1);
	}

	function setCurrentSlideMiniature(targetSlideId, previousSlideId) {
		var targetMiniatureId = '#slide-' + targetSlideId;
		var previousMiniatureId = '#slide-' + previousSlideId;

		// KONRAD: Jak się odwołać do elementu, który jest dzieckiem #carousel? Jaka jest składnia?
		$(targetMiniatureId).addClass('current-slide'); 
		$(previousMiniatureId).removeClass('current-slide');
	}

	function slideToTheLeft_manual() {
		clearInterval(carouselInterval);
		slideToTheLeft();
		carouselInterval = setInterval(slideToTheLeft, carouselSpeed);
	}
	function slideToTheLeft() {
		var previousSlideId = currentSlideId;
		
		carouselList.animate({marginLeft: -slideWidth}, slideSpeed, moveFirstSlideToTheEnd);
		currentSlideId < carouselList.find('li').length - 1 ? currentSlideId++ : currentSlideId = 0;
	
		console.log(currentSlideId);
		setCurrentSlideMiniature(currentSlideId, previousSlideId);
	}

	function slideToTheRight_manual() {
		clearInterval(carouselInterval);
		slideToTheRight();
		carouselInterval = setInterval(slideToTheRight, carouselSpeed);
	}
	function slideToTheRight() {
		var previousSlideId = currentSlideId;
	
		moveLastSlideToTheBeginning();
		carouselList.css({marginLeft: '-1200px'});
		carouselList.animate({marginLeft: '0'}, slideSpeed);
		currentSlideId > 0 ? currentSlideId-- : currentSlideId = carouselList.find('li').length - 1;
	
		console.log(currentSlideId);
		setCurrentSlideMiniature(currentSlideId, previousSlideId);
	}

	function slideToId(targetSlideId) {
		console.log('targetId:' + targetSlideId);
		console.log('currentId:' + currentSlideId);

		if (currentSlideId == targetSlideId) { 
			console.log('ten sam slide');
			return; 
		} else {
			clearInterval(carouselInterval);
			var carouselSpeed_memory = carouselSpeed;
			var slideSpeed_memory = slideSpeed;
			carouselSpeed = 0;
			slideSpeed = 50;
		};

		while (currentSlideId < targetSlideId) {
			console.log(currentSlideId, targetSlideId, 'przewiń w lewo');
			slideToTheLeft();
			console.log(currentSlideId, targetSlideId);
		};
		
		while (currentSlideId > targetSlideId) {
			console.log(currentSlideId, targetSlideId, 'przewiń w prawo');
			slideToTheRight();
			console.log(currentSlideId, targetSlideId);
		};

		carouselSpeed = carouselSpeed_memory;
		slideSpeed = slideSpeed_memory;
		carouselInterval = setInterval(slideToTheLeft, carouselSpeed);
	}

	// Aleternatywna metoda przewijania po kliknięciu na miniaturę. Wybiera najkrótszą drogę.
	// function goToSlideId(targetSlideId) {
	// 	console.log('targetId:' + targetSlideId);
	// 	console.log('currentId:' + currentSlideId);

	// 	if (targetSlideId == currentSlideId) {
	// 		console.log('ten sam slide');
	// 	} else {
	// 		clearInterval(carouselInterval);

	// 		if currentSlideId > targetSlideId {
	// 			var distanceToLeft = currentSlideId - targetSlideId;
	// 			var distanceToRight = carouselList.find('li').length - 1 - 2 * currentSlideId + targetSlideId;
	// 			distanceToRight < distanceToLeft ? var slideDirection = 'left' : var slideDirection = 'right'; 
	// 		} else {
	// 			var distanceToLeft = currentSlideId + carouselList.find('li').length - 1 - targetSlideId;
	// 			var distanceToRight = targetSlideId - currentSlideId;
	// 			distanceToRight < distanceToLeft ? var slideDirection = 'left' : var slideDirection = 'right';
	// 		};

	// 		if (slideDirection == 'right') {
	// 			for (i = 1; i < ; i++) { 

	// 			}
	// 		}
	// 	}
	// }

	function moveFirstSlideToTheEnd() {
		// var firstSlide = carouselList.find('li:first');
		var firstSlide = carouselList.find('li:first');
		// var lastSlide = $(".carousel ul").find('li:last')
		carouselList.append(firstSlide);
		// $(".carousel ul").append(firstSlide);
		// lastSlide.after(firstSlide);
		carouselList.css({marginLeft: 0});
	}

	function moveLastSlideToTheBeginning() {
		var lastSlide = carouselList.find('li:last');
		var firstSlide = carouselList.find('li:first');

		firstSlide.before(lastSlide);
		// carouselList.css({marginRight: 0})
		// carouselList.css({marginRight: 0});
	}

});