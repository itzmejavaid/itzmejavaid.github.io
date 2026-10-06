/**
 * ============================================================================
 * MAIN APPLICATION JAVASCRIPT (js/main.js)
 * Fully commented segment-by-segment and line-by-line implementation.
 * Handles page animations, scroll behaviors, mobile navigation, counters & modals.
 * ============================================================================
 */

// Initialize AOS (Animate On Scroll) library with default settings
AOS.init({
	duration: 800,  // Animation duration in milliseconds (0.8 seconds)
	easing: 'slide' // Easing curve for the scroll transition
});

// Immediately Invoked Function Expression (IIFE) scoping jQuery to $
(function($) {

	// Enforce strict JavaScript evaluation to catch silent errors and undeclared variables
	"use strict";

	// --------------------------------------------------------------------------
	// SEGMENT 1: PARALLAX BACKGROUNDS (STELLAR.JS)
	// --------------------------------------------------------------------------
	// Initializes the Stellar.js plugin for background parallax scrolling effects
	$(window).stellar({
		responsive: true,          // Recalculates offsets on viewport resize
		parallaxBackgrounds: true, // Enables parallax on background-image elements
		parallaxElements: true,    // Enables parallax on individual DOM elements
		horizontalScrolling: false,// Disables horizontal parallax scrolling
		hideDistantElements: false,// Keeps elements visible even when far offscreen
		scrollProperty: 'scroll'   // Uses standard window scroll event
	});

	// --------------------------------------------------------------------------
	// SEGMENT 2: FULL-HEIGHT VIEWPORT CALCULATION
	// --------------------------------------------------------------------------
	// Function that matches any .js-fullheight element height to window inner height
	var fullHeight = function() {
		// Set element height to current window height on execution
		$('.js-fullheight').css('height', $(window).height());
		// Bind resize listener to recalculate whenever window dimensions change
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});
	};
	// Execute fullHeight calculation on load
	fullHeight();

	// --------------------------------------------------------------------------
	// SEGMENT 3: FULLSCREEN PAGE LOADING SPINNER
	// --------------------------------------------------------------------------
	// Function that removes the initial loading screen spinner once page is ready
	var loader = function() {
		// Asynchronous short timeout to allow browser paint to settle
		setTimeout(function() { 
			// Check if the loader element exists in the DOM
			if($('#ftco-loader').length > 0) {
				// Remove the 'show' class to trigger CSS fadeout and hide the spinner
				$('#ftco-loader').removeClass('show');
			}
		}, 1); // Executes after 1 millisecond
	};
	// Execute the loader handler
	loader();

	// --------------------------------------------------------------------------
	// SEGMENT 4: SCROLLAX FRAMEWORK
	// --------------------------------------------------------------------------
	// Initialize Scrollax for smooth scrolling effects on data-scrollax elements
	$.Scrollax();

	// --------------------------------------------------------------------------
	// SEGMENT 5: MOBILE BURGER NAVIGATION MENU TOGGLE
	// --------------------------------------------------------------------------
	// Handles toggling the hamburger menu on smaller viewports
	var burgerMenu = function() {
		// Attach click event to the hamburger button
		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			// Prevent default link click action
			event.preventDefault();

			// Check if the navigation menu is currently visible
			if ( $('#ftco-nav').is(':visible') ) {
				// If visible, remove the active state from the toggler
				$(this).removeClass('active');
			} else {
				// If hidden, add the active animated state to the toggler
				$(this).addClass('active');	
			}
		});
	};
	// Execute burger menu binding
	burgerMenu();

	// --------------------------------------------------------------------------
	// SEGMENT 6: SMOOTH ANCHOR LINK SCROLLING
	// --------------------------------------------------------------------------
	// Smoothly scrolls to in-page section anchors when navbar links are clicked
	var onePageClick = function() {
		// Delegate click event to all navbar links targeting an in-page anchor (#)
		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
			// Prevent browser's abrupt jump to hash anchor
			event.preventDefault();

			// Extract target section ID from the href attribute
			var href = $.attr(this, 'href');

			// Animate the html and body scrollTop position
			$('html, body').animate({
				// Scroll to target element offset minus 70px to account for sticky navbar height
				scrollTop: $($.attr(this, 'href')).offset().top - 70
			}, 500, function() {
				// Optional completion callback
			});
		});
	};
	// Execute smooth one page click listener
	onePageClick();
	
	// --------------------------------------------------------------------------
	// SEGMENT 7: CAROUSEL SLIDER (OWL CAROUSEL)
	// --------------------------------------------------------------------------
	// Initializes Owl Carousel sliders when multiple slides are present
	var carousel = function() {
		// Only initialize owlCarousel on .home-slider if there is more than 1 slide item
		if ($('.home-slider .slider-item').length > 1) {
			$('.home-slider').owlCarousel({
				loop: true,                 // Infinite looping between slides
				autoplay: true,             // Automatically transition slides
				margin: 0,                  // Zero margin between slide cards
				animateOut: 'fadeOut',      // CSS fadeOut transition on slide exit
				animateIn: 'fadeIn',        // CSS fadeIn transition on slide entry
				nav: false,                 // Disables default navigation arrows
				autoplayHoverPause: false,  // Continues autoplay even when cursor hovers
				items: 1,                   // Displays 1 item at a time
				navText: ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
				responsive: {
					0: { items: 1 },         // 1 item on mobile
					600: { items: 1 },       // 1 item on tablet
					1000: { items: 1 }       // 1 item on desktop
				}
			});
		}
	};
	// Execute carousel initialization
	carousel();

	// --------------------------------------------------------------------------
	// SEGMENT 8: DROPDOWN MENU HOVER INTERACTIONS
	// --------------------------------------------------------------------------
	// Automatically opens navigation dropdown menus on hover for desktop users
	$('nav .dropdown').hover(function(){
		var $this = $(this);
		$this.addClass('show');                          // Add Bootstrap 'show' class
		$this.find('> a').attr('aria-expanded', true);   // Set accessible aria state
		$this.find('.dropdown-menu').addClass('show');   // Display dropdown menu panel
	}, function(){
		var $this = $(this);
		$this.removeClass('show');                       // Remove Bootstrap 'show' class
		$this.find('> a').attr('aria-expanded', false);  // Reset accessible aria state
		$this.find('.dropdown-menu').removeClass('show');// Hide dropdown menu panel
	});

	// --------------------------------------------------------------------------
	// SEGMENT 9: WINDOW SCROLL SPY & STICKY NAVBAR STYLING
	// --------------------------------------------------------------------------
	// Monitors window scroll position to dynamically add/remove styling on navbar
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),              // jQuery wrapped window object
				st = $w.scrollTop(),         // Current vertical scroll position in pixels
				navbar = $('.ftco_navbar'),  // Reference to main navigation element
				sd = $('.js-scroll-wrap');   // Reference to scroll wrap elements

			// When user scrolls down more than 150px
			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled'); // Apply sticky dark navbar styling
				}
			} 
			// When user returns near the very top of the page (< 150px)
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep'); // Revert to transparent navbar
				}
			} 
			// When user scrolls down further than 350px
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake'); // Apply active awake state for smooth transitions
				}
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			// When user scrolls back up above 350px
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	// Execute scroll listener
	scrollWindow();

	// --------------------------------------------------------------------------
	// SEGMENT 10: ANIMATED NUMERICAL COUNTER (WAYPOINTS + ANIMATENUMBER)
	// --------------------------------------------------------------------------
	// Triggers animated count-up numbers when counter section scrolls into view
	var counter = function() {
		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function( direction ) {
			// Trigger only when scrolling down and not previously animated
			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				// Define separator factory for comma-formatted numbers
				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
				// Iterate over every element with .number class
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number'); // Read target number from data-number attribute
					// Animate number count-up over 7000ms (7 seconds)
					$this.animateNumber({
						number: num,
						numberStep: comma_separator_number_step
					}, 7000);
				});
			}
		}, { offset: '95%' } ); // Trigger when element is 95% from viewport top
	};
	// Execute counter trigger
	counter();

	// --------------------------------------------------------------------------
	// SEGMENT 11: SCROLL REVEAL CONTENT ANIMATIONS (WAYPOINTS + ANIMATE.CSS)
	// --------------------------------------------------------------------------
	// Sequentially triggers entrance animations on .ftco-animate elements
	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {
			// Check if element has scrolled into view and is not yet animated
			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function(){
					// Stagger each queued item with an exponential delay
					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect'); // Read desired effect
							// Apply respective Animate.css class
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated'); // Default fadeInUp
							}
							el.removeClass('item-animate'); // Remove temporary staging class
						}, k * 50, 'easeInOutExpo' ); // 50ms stagger per element
					});
				}, 100);
			}
		}, { offset: '95%' } );
	};
	// Execute content waypoint listener
	contentWayPoint();

	// --------------------------------------------------------------------------
	// SEGMENT 12: MAGNIFIC POPUP LIGHTBOX (IMAGES & GALLERIES)
	// --------------------------------------------------------------------------
	// Initializes image modal lightbox overlay for certificate and portfolio previews
	$('.image-popup').magnificPopup({
		type: 'image',                // Sets popup type to image
		closeOnContentClick: true,    // Closes popup when clicking on the image
		closeBtnInside: false,        // Positions close button outside image container
		fixedContentPos: true,        // Locks viewport position while lightbox is open
		mainClass: 'mfp-no-margins mfp-with-zoom', // Custom classes for marginless zoom
		gallery: {
			enabled: true,              // Enables next/previous navigation through images
			navigateByImgClick: true,   // Click image to advance to next item
			preload: [0,1]              // Preload next image in sequence
		},
		image: {
			verticalFit: true           // Constrains image to viewport height
		},
		zoom: {
			enabled: true,              // Enables zoom in/out effect on open/close
			duration: 300               // Zoom animation duration in milliseconds
		}
	});

	// --------------------------------------------------------------------------
	// SEGMENT 13: MAGNIFIC POPUP (IFRAMES & VIDEO EMBEDS)
	// --------------------------------------------------------------------------
	// Handles YouTube, Vimeo, and Google Maps responsive modal overlays
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,               // Disables popup on small viewports (<700px)
		type: 'iframe',               // Sets popup type to iframe embed
		mainClass: 'mfp-fade',        // Fade animation class
		removalDelay: 160,            // Delay before removal to allow fadeOut
		preloader: false,             // Disables preloader graphic
		fixedContentPos: false        // Allows flexible scrolling
	});

})(jQuery); // End IIFE
