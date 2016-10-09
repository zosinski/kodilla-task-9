$(function(){

	var carousel = $('#carousel');
	var carouselList = $('#carousel ul');
	var slideWidth = 1200;
	var carouselSpeed = 4000; // interwał pomiędzy przewinięciem slajdów
	var slideSpeed = 500; // czas animacji przewijania slajdu
	var currentSlideId = 0;
	
	setCarouselWidth();
	createCarouselControls();
	var carouselInterval = setInterval(function(){slide('left')}, carouselSpeed);
	
	// Przypisuje kontenerowi ze slajdami szerokość
	// równą iloczynowi liczby slajdów i stałej szerokości pojedyczego slajdu
	function setCarouselWidth() {
		var carouselWidth = carouselList.find('li').length * slideWidth;
		carouselList.css({width: carouselWidth});
	}

	function createCarouselControls() {
		createArrowControls();
		createSlideMiniatures();
	}

	// Tworzy i dodaje strzałki do przewijania
	function createArrowControls() {
		var leftArrow = $('<i>', {class: 'fa fa-chevron-left left-arrow'});
		var rightArrow = $('<i>', {class: 'fa fa-chevron-right right-arrow'}); 
		carousel.append(leftArrow);
		carousel.append(rightArrow);
		leftArrow.click(function(){manualSlide('right')});
		rightArrow.click(function(){manualSlide('left')});
	}

	// Tworzy i dodaje do DOM miniatury slajdów na podstawie listy UL z grafikami w karuzeli
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
			// slideMiniature.click(function(){slideToId(index)});
			slideMiniature.click(function(){goToSlideId(index)});
		});
		carousel.after(miniatureList);
		setCurrentSlideMiniature(0, 1);
	}

	// Wyróżnienie miniatury odpowiadającej bieżącemu slajdowi
	function setCurrentSlideMiniature(targetSlideId, previousSlideId) {
		var targetMiniatureId = '#slide-' + targetSlideId;
		var previousMiniatureId = '#slide-' + previousSlideId;

		// KONRAD: Jak się odwołać do elementu, który jest dzieckiem #carousel? Jaka jest składnia?
		$(targetMiniatureId).addClass('current-slide'); 
		$(previousMiniatureId).removeClass('current-slide');
	}

	function slide(slideDirection) {
		var previousSlideId = currentSlideId;
		
		if (slideDirection == 'left') {
			carouselList.animate({marginLeft: -slideWidth}, slideSpeed, moveFirstSlideToTheEnd);
			currentSlideId < carouselList.find('li').length - 1 ? currentSlideId++ : currentSlideId = 0;		
		} else {
			moveLastSlideToTheBeginning();
			carouselList.css({marginLeft: '-1200px'});
			carouselList.animate({marginLeft: '0'}, slideSpeed);
			currentSlideId > 0 ? currentSlideId-- : currentSlideId = carouselList.find('li').length - 1;
		};
	
		setCurrentSlideMiniature(currentSlideId, previousSlideId);
	}

	// funkcja wywoływana przez strzałki, kasuje interwał, przewija slajd
	// i wznawia przewijanie w kieruku klikniętej strzałki
	function manualSlide(slideDirection) {
		clearInterval(carouselInterval);
		slide(slideDirection);
		carouselInterval = setInterval(function(){slide(slideDirection)}, carouselSpeed);
	}

	// Funkcja wywoływana przez kliknięcie na miniaturę. Wersja 1 
	function slideToId(targetSlideId) {
		console.log('targetId:' + targetSlideId);
		console.log('currentId:' + currentSlideId);

		if (currentSlideId == targetSlideId) { 
			console.log('ten sam slide');
			return; 
		};

		clearInterval(carouselInterval);
		var carouselSpeed_memory = carouselSpeed;
		var slideSpeed_memory = slideSpeed;
		carouselSpeed = 0;
		slideSpeed = 50;

		// KONRAD: jaka składania żeby móc zadeklarować slideDirection?
		currentSlideId < targetSlideId ? slideDirection = 'left' : slideDirection = 'right';

		while (currentSlideId != targetSlideId) {
			slide('slideDirection');
		};

		carouselSpeed = carouselSpeed_memory;
		slideSpeed = slideSpeed_memory;
		carouselInterval = setInterval(function(){slide(slideDirection)}, carouselSpeed);
	}

	// Aleternatywna metoda przewijania po kliknięciu na miniaturę. Wybiera najkrótszą drogę.
	function goToSlideId(targetSlideId) {
		console.log('targetId:' + targetSlideId);
		console.log('currentId:' + currentSlideId);

		if (targetSlideId == currentSlideId) {
			console.log('ten sam slide');
			return;
		};

		clearInterval(carouselInterval);
		var carouselSpeed_memory = carouselSpeed;
		var slideSpeed_memory = slideSpeed;
		carouselSpeed = 0;
		slideSpeed = 50;

		if (currentSlideId > targetSlideId) {
			var distanceToLeft = currentSlideId - targetSlideId;
			var distanceToRight = carouselList.find('li').length - currentSlideId + targetSlideId;
		} else {
			var distanceToLeft = currentSlideId + carouselList.find('li').length - targetSlideId;
			var distanceToRight = targetSlideId - currentSlideId;
		};
		
		if (distanceToRight < distanceToLeft) {
			var slideDirection = 'left'; 
			var distance = distanceToRight;
		} else {
			var slideDirection = 'right'; 
			var distance = distanceToLeft;
		}
		console.log('distance: ', distance, 'direction: ', slideDirection);

		for (i = 0; i < distance ; i++) { 
			slide(slideDirection);
		};
		
		carouselSpeed = carouselSpeed_memory;
		slideSpeed = slideSpeed_memory;
		carouselInterval = setInterval(function(){slide(slideDirection)}, carouselSpeed);
	}

	function moveFirstSlideToTheEnd() {
		var firstSlide = carouselList.find('li:first');
		
		carouselList.append(firstSlide);
		carouselList.css({marginLeft: 0});
	}

	function moveLastSlideToTheBeginning() {
		var lastSlide = carouselList.find('li:last');
		var firstSlide = carouselList.find('li:first');

		firstSlide.before(lastSlide);
	}

});