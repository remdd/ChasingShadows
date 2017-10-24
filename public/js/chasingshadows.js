$(function() {

	const IMGTIME = 300;
	const NAVTIME = 300;
	const THEMETIME = 300;
	var mainThemeFlag = true;

	//	Initial setup on page load
	$('#emailLinkIcon').tooltip();
	$('.bigText').bigtext({maxfontsize: 40});
	$('.bigTextSm').bigtext({maxfontsize: 30, minfontsize: 18});
	$('.showDiv').hide();

	//	Determine whether '/' or '/music' route was taken by visitor to site & render appropriate landing page & nav controls
	var musicTheme = ($('#allDiv').attr('data-maintheme') == 'false');
	if(musicTheme) {				//	Code to run on first load if '/music' route was taken
		mainThemeFlag = false;
		$('.instagramLink').attr('href', 'https://www.instagram.com/london_reflected/');
		$('.musicMiniNav').removeClass('noDisplay');
		$('#musicMiniLogo').removeClass('invisible');
		$('#musicBigNav').removeClass('invisible').fadeIn(THEMETIME);
		$('.coverImg').imagesLoaded(function() {
			var state = {
				showDiv: 'musicCover',
				mainTheme: mainThemeFlag,
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
		$('.coverImg').imagesLoaded(function() {
			var state = {
				showDiv: 'mainCover',
				mainTheme: mainThemeFlag,
				firstLoad: true
			}
			renderShowPane(state);
		});
	}

	function renderShowPane(state) {
		if(state.firstLoad) {					//	On first load of page, just render page without hiding & removing previous elements
			showSwitch(state);
			return;
		}
		if(state.mainTheme != mainThemeFlag) {		//	If state to be rendered does not use current theme, flip the displayed theme
			mainThemeFlag = !mainThemeFlag;
			flipTheme(state);
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

	function showSwitch(state) {				//	Render appropriate 'showDiv' for the state being passed
		switch (state.showDiv) {
			case 'mainCover':
				$('#mainCover').removeClass('invisible').hide().fadeIn(THEMETIME, function() {
					saveState(state);
				});
				break;
			case 'musicCover':
				$('#musicCover').removeClass('invisible').hide().fadeIn(THEMETIME, function() {
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
				$('.dropdown').collapse('hide');
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

	//	Flip button
	$('.flipBtn').click(function() {
		mainThemeFlag = !mainThemeFlag;
		var state = {
			mainTheme: mainThemeFlag
		}
		if(mainThemeFlag) {
			state.showDiv = 'mainCover';
		} else {
			state.showDiv = 'musicCover';
		}
		flipTheme(state);
		renderShowPane(state);
	});

	flipTheme = function(state) {
		console.log("Flipping!");
		$('.dropdown-toggle').dropdown('toggle');
		$('.flipBtn').css("pointer-events", "none");		// Disable further click events on click
		$('.flipBtn').toggleClass('flipped');
		$('body').toggleClass('blackTheme');
		$('.bigIcon').toggleClass('whiteIcons');
		$('#closePopUp').toggleClass('whiteIcons');
		if(!mainThemeFlag) {
			$('#mainBigNav').fadeOut(THEMETIME, function() {
				$('#mainBigNav, #mainMiniLogo').addClass('invisible');
				$('.mainMiniNav').addClass('noDisplay');
				$('.instagramLink').attr('href', 'https://www.instagram.com/london_reflected/');
				$('#musicBigNav, #musicMiniLogo').removeClass('invisible');
				$('.musicMiniNav').removeClass('noDisplay');
				$(".flipBtn").css("pointer-events", "auto");
			});
		} else {
			$('#musicBigNav').fadeOut(THEMETIME, function() {
				$('#musicBigNav, #musicMiniLogo').addClass('invisible');
				$('.musicMiniNav').addClass('noDisplay');
				$('.instagramLink').attr('href', 'https://www.instagram.com/chasing.light.and.shadows/');
				$('#mainBigNav, #mainMiniLogo').removeClass('invisible');
				$('.mainMiniNav').removeClass('noDisplay');
				$(".flipBtn").css("pointer-events", "auto");
			});
		}
	}

	function saveState(state) {			//	Save current state to browser history stack
		if(state && state.back) {		//	Prevent re-saving of the state if it is not 'new', ie is being accessed by browser 'back' command
			return;
		}
		var state = getState();
		history.pushState(state, '');	//	Push current state to browser history
	}

	function getState() {				//	Get state of current browser window
		var state = {
			showDiv: $('.showDiv:visible').attr('id'),
			mainTheme: mainThemeFlag
		};
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

	//	Handle browser 'back' commands
	window.onpopstate = function(e) {
		if(e && e.state) {
			e.state.back = true;			//	Set flag to indicate that this state is being accessed by a browser 'back' command (used to prevent re-saving)
			renderShowPane(e.state);
		}
	}	

	//	Display landing page on site logo click
	$('.logoMain').click(function() {
		if($('#mainCover').is(':visible') || $('#musicCover').is(':visible')) { return; }		//	Prevent re-rendering of landing page if already shown
		var state = {
			mainTheme: mainThemeFlag
		};
		if(mainThemeFlag) { state.showDiv = 'mainCover'; } else { state.showDiv = 'musicCover'; }
		renderShowPane(state);
	});

	//	Display 'about' page
	$('.aboutLink').click(function() {
		if(($('#mainAbout').is(':visible')) || $('#musicAbout').is(':visible')) { return; }		//	Prevent re-rendering of 'about' page if already shown
		var state = {
			mainTheme: mainThemeFlag
		};
		if(mainThemeFlag) { state.showDiv = 'mainAbout'; } else { state.showDiv = 'musicAbout'; }
		renderShowPane(state);
	})

	//	Display thumbnails when a gallery name is clicked
	$('.galLinkMain').click(function() {
		var state = {
			showDiv: 'showThumbnails',
			mainTheme: mainThemeFlag,
			galName: $(this).attr('data-gallery'),
			galCount: $(this).attr('data-pics'),
			thumbClass: $(this).attr('data-thumbClass'),
			galCol: $(this).attr('data-galCol')
		}
		renderShowPane(state);
	});
	//	Add & display thumbnails for a gallery
	addThumbnails = function(state) {
		for(var i = 1; i <= state.galCount; i ++) {
			var $imgDiv = $('#showThumbnails');
			if(parseInt(state.galCol) === 3) {				//	Display thumbnails in either 3 or 4 column layout per gallery class
				$imgDiv.append('<img class="thumbImg 3thumbImg" src="img/' + state.galName + '/Thumbs/' + state.galName + '_' + i + '.jpg">');
			} else {
				$imgDiv.append('<img class="thumbImg 4thumbImg" src="img/' + state.galName + '/Thumbs/' + state.galName + '_' + i + '.jpg">');
			}
			var $img = $imgDiv.children().last();			//	Add image & gallery attributes to each thumbnail
			$img.attr('data-galName', state.galName);
			$img.addClass(state.thumbClass);
			$img.attr('data-thumbClass', state.thumbClass);
			$img.attr('data-galCol', state.galCol);
			$img.attr('data-galCount', state.galCount);
			$img.attr('data-imgNo', i);
			$grid.masonry( 'addItems', $img );
		}
		$('.thumbImg, .3thumbImg').click(function() {		//	Add appropriate click listeners to each thumbnail for zooming individual images
			var state = {
				showDiv: 'showZoomImg',
				mainTheme: mainThemeFlag,
				galName: $(this).attr('data-galName'),
				galCount: $(this).attr('data-galCount'),
				thumbClass: $(this).attr('data-thumbClass'),
				imgNo: $(this).attr('data-imgNo'),
				galCol: $(this).attr('data-galCol')
			}
			renderShowPane(state);
		});
	};
	//	Clear gallery thumbnails
	removeThumbnails = function() {
		$('#showThumbnails').children().remove();
	}

	/*	Zoomed image controls 	*/
	$('#closePopUp').click(function() {
		var state = {
			showDiv: 'showThumbnails',
			mainTheme: mainThemeFlag,
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

	//	Initiate Masonry grid to display thumbnails
	var $grid = $('#showThumbnails').masonry({
		columnWidth: '.thumbImg',
		singleMode: true,
		itemSelector: '.thumbImg'
	});

	//	Check whether change to thumbnail layout is required if window is resized
	$(window).resize(function() {
		resizeThumbs();
	});

	//	Responsive resizing of thumbnails for smaller screens
	resizeThumbs = function() {
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

	//	Display contained galleries when a category title is clicked, hide contents of other categories
	$('.categoryLink').click(function(e) {
		if(e.target !== this) {return;}
		$('.galLink').not($(this).parent().parent().find('.galLink')).hide('fast');
		$(this).parent().parent().find('.galLink').toggle(NAVTIME);
	});

	//	Prevent context menu on right click images, at client's insistence!
	$("body").on("contextmenu", "img", function(e) {
		return false;
	});

});