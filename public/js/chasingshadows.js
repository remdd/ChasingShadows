$(function() {

	const IMGTIME = 300;
	const NAVTIME = 300;
	const THEMETIME = 300;
	var mainTheme = true;

	$('#emailLinkIcon').tooltip();
	$('.bigText').bigtext({maxfontsize: 40});
	$('.bigTextSm').bigtext({maxfontsize: 30, minfontsize: 18});

	//	Code to run on first load if '/music' route is taken
	var musicTheme = ($('#allDiv').attr('data-maintheme') == 'false');
	if(musicTheme) {
		mainTheme = false;
		$('.showDiv').hide();
		$('.instagramLink').attr('href', 'https://www.instagram.com/london_reflected/');
		$('.musicMiniNav').removeClass('noDisplay');
		$('#musicMiniLogo').removeClass('invisible');
		$('#musicBigNav').removeClass('invisible').fadeIn(THEMETIME);
		$('#coverImg').attr('src', 'img/CoverMusic.jpg');
		$('#coverImg').imagesLoaded(function() {
			var state = {
				showDiv: 'musicCover',
				firstLoad: true
			}
			renderShowPane(state);
		});
		$('.flipBtn').toggleClass('flipped');
		$('body').toggleClass('blackTheme');
		$('.bigIcon').toggleClass('whiteIcons');
		$('#closePopUp').toggleClass('whiteIcons');
	} else {
		//	Code to run if '/' route is taken
		$('.showDiv').hide();
		$('.instagramLink').attr('href', 'https://www.instagram.com/chasing.light.and.shadows/');
		$('.mainMiniNav').removeClass('noDisplay');
		$('#mainMiniLogo').removeClass('invisible');
		$('#mainBigNav').removeClass('invisible').fadeIn(THEMETIME);
		$('#coverImg').attr('src', 'img/Cover.jpg');
		$('#coverImg').imagesLoaded(function() {
			var state = {
				showDiv: 'mainCover',
				firstLoad: true
			}
			renderShowPane(state);
		});
	}


	$('.flipBtn').click(function() {
		$('.dropdown-toggle').dropdown('toggle');
		$('.picControls').fadeOut(IMGTIME);
		$('.flipBtn').css("pointer-events", "none");		// Disable further click events on click
		$('.flipBtn').toggleClass('flipped');
		$('.showDiv').each(function() {
			if($(this).hasClass('invisible')) {
				return;
			} else {
				$('body').toggleClass('blackTheme');
				$('.bigIcon').toggleClass('whiteIcons');
				$('#closePopUp').toggleClass('whiteIcons');
				$(this).fadeOut(THEMETIME,function() {
					$(this).hide().addClass('invisible');
					removeThumbnails();
					if(mainTheme) {
						$('#mainBigNav').fadeOut(THEMETIME, function() {
							$('#mainBigNav').addClass('invisible');
							$('#mainMiniNav').addClass('invisible');
							$('#mainMiniLogo').addClass('invisible');
							$('.instagramLink').attr('href', 'https://www.instagram.com/london_reflected/');
							$('.mainMiniNav').addClass('noDisplay');
							$('#coverImg').attr('src', 'img/CoverMusic.jpg');
							$('#coverImg').imagesLoaded(function() {
								$('#cover').removeClass('invisible').hide().fadeIn(THEMETIME);
								$('#musicBigNav').removeClass('invisible');
								$('#musicMiniLogo').removeClass('invisible');
								$('.musicMiniNav').removeClass('noDisplay');
								$(".flipBtn").css("pointer-events", "auto");		// Re-enable click events
							});
						});
					} else {
						$('#musicBigNav').fadeOut(THEMETIME, function() {
							$('#musicBigNav').addClass('invisible');
							$('#musicMiniNav').addClass('invisible');
							$('#musicMiniLogo').addClass('invisible');
							$('.instagramLink').attr('href', 'https://www.instagram.com/chasing.light.and.shadows/');
							$('.musicMiniNav').addClass('noDisplay');
							$('#coverImg').attr('src', 'img/Cover.jpg');
							$('#coverImg').imagesLoaded(function() {
								$('#cover').removeClass('invisible').hide().fadeIn(THEMETIME);
								$('#mainBigNav').removeClass('invisible');
								$('#mainMiniLogo').removeClass('invisible');
								$('.mainMiniNav').removeClass('noDisplay');
								$(".flipBtn").css("pointer-events", "auto");		// Re-enable click events
							});
						});
					}
					mainTheme = !mainTheme;
					$('.bigText').bigtext({maxfontsize: 40});
				});
			}
		});
		saveState();
	});

	//	Initiate Masonry grid to display thumbnails
	var $grid = $('#showThumbnails').masonry({
		columnWidth: '.thumbImg',
		singleMode: true,
		itemSelector: '.thumbImg'
	});

	//	Show contained galleries when a category title is clicked, hide contents of other categories
	$('.categoryLink').click(function(e) {
		if(e.target !== this) {return;}
		$('.galLink').not($(this).parent().parent().find('.galLink')).hide('fast');
		$(this).parent().parent().find('.galLink').toggle(NAVTIME);
	});

	//	Clear gallery thumbnails
	removeThumbnails = function() {
		$('#showThumbnails').children().remove();
	}
	//	Add & display thumbnails for a gallery
	addThumbnails = function(state) {
		for(var i = 1; i <= state.galCount; i ++) {
			var $imgDiv = $('#showThumbnails');
			if(parseInt(state.galCol) === 3) {
				$imgDiv.append('<img class="thumbImg 3thumbImg" src="img/' + state.galName + '/Thumbs/' + state.galName + '_' + i + '.jpg">');
			} else {
				$imgDiv.append('<img class="thumbImg 4thumbImg" src="img/' + state.galName + '/Thumbs/' + state.galName + '_' + i + '.jpg">');
			}
			var $img = $imgDiv.children().last();
			$img.attr('data-galName', state.galName);
			$img.addClass(state.thumbClass);
			$img.attr('data-thumbClass', state.thumbClass);
			$img.attr('data-galCol', state.galCol);
			$img.attr('data-galCount', state.galCount);
			$img.attr('data-imgNo', i);
			$grid.masonry( 'addItems', $img );
		}
		$('.thumbImg, .3thumbImg').click(function() {
			var state = {
				showDiv: 'showZoomImg',
				galName: $(this).attr('data-galName'),
				galCount: $(this).attr('data-galCount'),
				thumbClass: $(this).attr('data-thumbClass'),
				imgNo: $(this).attr('data-imgNo'),
				galCol: $(this).attr('data-galCol')
			}
			renderShowPane(state);
		});
	};

	/*	Popup image controls 	*/
	$('#closePopUp').click(function() {
		var state = {
			showDiv: 'showThumbnails',
			galName: $('#zoomImg').attr('data-galName'),
			galCount: $('#zoomImg').attr('data-galCount'),
			thumbClass: $('#zoomImg').attr('data-thumbClass'),
			galCol: $('#zoomImg').attr('data-galCol')
		}
		renderShowPane(state);
	});
	$('#prevBtn').click(function() {
		var state = getState();
		$('.picControl').css("pointer-events", "none");
		if(parseInt(state.imgNo) === 1) {
			state.imgNo = state.galCount;
		} else {
			state.imgNo--;
		}
		renderShowPane(state);
	});
	$('#nextBtn').click(function() {
		var state = getState();
		$('.picControl').css("pointer-events", "none");
		if(parseInt(state.imgNo) === parseInt(state.galCount)) {
			state.imgNo = 1;
		} else {
			state.imgNo++;
		}
		renderShowPane(state);
	});

	//	Display landing page on site logo click
	$('.logoMain').click(function() {
		if($('#cover').is(':visible')) {
			return;
		}
		var state = {};
		if(mainTheme) {
			state.showDiv = 'mainCover';
		} else {
			state.showDiv = 'musicCover';
		}
		renderShowPane(state);
	});

	//	Display 'about' page
	$('.aboutLink').click(function() {
		if(($('#mainAbout').is(':visible')) || $('#musicAbout').is(':visible')) {
			return;
		}
		var state = {};
		if(mainTheme) {
			state.showDiv = 'mainAbout';
		} else {
			state.showDiv = 'musicAbout';
		}
		renderShowPane(state);
	})

	//	Display thumbnails when a gallery name is clicked
	$('.galLinkMain').click(function() {
		var state = {
			showDiv: 'showThumbnails',
			galName: $(this).attr('data-gallery'),
			galCount: $(this).attr('data-pics'),
			thumbClass: $(this).attr('data-thumbClass'),
			galCol: $(this).attr('data-galCol')
		}
		renderShowPane(state);
	});

	function renderShowPane(state) {
		if(state.firstLoad) {
			showSwitch(state);
			return;
		}
		$('.picControl').css('pointer-events', 'none');
		$('.picControls').fadeOut(IMGTIME);
		$('.showDiv').each(function() {
			if($(this).is(':visible')) {
				$(this).fadeOut(function() {
					$(this).addClass('invisible');
					removeThumbnails();
					showSwitch(state)
				});
			}
		});
	}

	function showSwitch(state) {
		console.log(state);
		switch (state.showDiv) {
			case 'mainCover':
				$('#cover').removeClass('invisible').hide().fadeIn(THEMETIME, function() {
					saveState(state);
				});
				break;
			case 'musicCover':
				$('#cover').removeClass('invisible').hide().fadeIn(THEMETIME, function() {
					saveState(state);
				});
				break;
			case 'mainAbout':
				$('#mainAbout').removeClass('invisible').hide().fadeIn(IMGTIME, function() {
					saveState(state);
				});
				break;
			case 'musicAbout':
				$('#musicAbout').removeClass('invisible').hide().fadeIn(IMGTIME, function() {
					saveState(state);
				});
				break;
			case 'showThumbnails':
				$('.dropdown-toggle').dropdown('toggle');
				addThumbnails(state);
				$('#showThumbnails').imagesLoaded(function() {
					$('#showThumbnails').removeClass('invisible').hide().fadeIn(IMGTIME);
					resizeThumbs();
					$grid.masonry();
					saveState(state);
				});
				break;
			case 'showZoomImg':
				$('#zoomImg').attr('data-galName', state.galName);
				$('#zoomImg').attr('data-imgNo', state.imgNo);
				$('#zoomImg').attr('data-galCount', state.galCount);
				$('#zoomImg').attr('data-thumbClass', state.thumbClass);
				$('#zoomImg').attr('data-galCol', state.galCol);
				$('#zoomImg').attr('src', 'img/' + state.galName + '/' + state.galName + '_' + state.imgNo + '.jpg');
				$('#showZoomImg').imagesLoaded(function() {
					$('#showZoomImg').removeClass('invisible').hide().fadeIn(IMGTIME);
					$('.picControls').fadeIn(IMGTIME, function() {
						$('.picControl').css('pointer-events', 'auto');
						saveState(state);
					});
				});
				break;
			default:
				break;
		}
	}

	function resizeThumbs() {
		if ($(window).width() > 767) {
	        $('.4thumbImg').removeClass('big4ThumbImg');
	        $('.4thumbImg').addClass('small4ThumbImg');
	        $('.3thumbImg').removeClass('big3ThumbImg');
	        $('.3thumbImg').addClass('small3ThumbImg');
	    } else {
	        $('.4thumbImg').removeClass('small4ThumbImg');
	        $('.4thumbImg').addClass('big4ThumbImg');
	        $('.3thumbImg').removeClass('small3ThumbImg');
	        $('.3thumbImg').addClass('big3ThumbImg');
	    }
		$grid.masonry();
	};

	function saveState(state) {
		if(state && state.back) {
			return;
		}
		var state = getState();
		history.pushState(state, '');
		console.log(history.length);
		console.log(state);
	}

	function getState() {
		var state = {};
		state.showDiv = $('.showDiv:visible').attr('id');
		if(state.showDiv === 'cover' && mainTheme) {
			state.showDiv = 'mainCover'
		} else if(state.showDiv === 'cover' && !mainTheme) {
			state.showDiv = 'musicCover'
		}
		state.mainTheme = mainTheme;
		if(state.showDiv === 'showThumbnails') {
			state.galName = $('.thumbImg').first().attr('data-galName');
			state.galCount = $('.thumbImg').first().attr('data-galCount');
			state.thumbClass = $('.thumbImg').first().attr('data-thumbClass');
			state.galCol = $('.thumbImg').first().attr('data-galCol');
		} else if(state.showDiv === 'showZoomImg') {
			state.imgNo = $('#zoomImg').attr('data-imgNo');
			state.galName = $('#zoomImg').attr('data-galName');
			state.galCount = $('#zoomImg').attr('data-galCount');
			state.thumbClass = $('#zoomImg').attr('data-thumbClass');
			state.galCol = $('#zoomImg').attr('data-galCol');
		}
		return state;
	}

	window.onpopstate = function(e) {
		if(e.state) {
			e.state.back = true;
			console.log("Pop state!");
			console.log(e.state);
			renderShowPane(e.state);
		}
	}

	$(window).resize(function() {
		resizeThumbs();
	});

	//	Prevent context menu on right click images, at client's insistence!
	$("body").on("contextmenu", "img", function(e) {
		return false;
	});

});