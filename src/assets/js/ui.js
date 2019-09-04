class Ui {
	constructor() {
		// Ui elements
		this.header = document.getElementById('main-header');
		// Buttons
	}

	// Active link / page
	activePage(e) {
		if(e.type === 'click') {
			// If click on links make active
			if(e.target.hasAttribute('data-navbar-link')) {
		
				// Remove all active links if we have one already active
				document.querySelectorAll('.active').forEach(link => link.classList.remove('active'));
				
				// Make page / link active
				e.target.classList.add('active');

				// Click on icon
			} else if(e.target.parentElement.hasAttribute('data-navbar-link')) {

				// Remove all active links if we have one already active
				document.querySelectorAll('.active').forEach(link => link.classList.remove('active'));
				
				// Make page / link active
				e.target.parentElement.classList.add('active');

			}

			// If we click on logo
			if(e.target.parentElement.parentElement.parentElement.classList.contains('logo') || e.target.parentElement.parentElement.classList.contains('logo')) {
				// Remove all active links if we have one already active
				document.querySelectorAll('.active').forEach(link => link.classList.remove('active'));
			}
		}
	
		if(e.type === 'mousedown') {
			// Pressing click animation
			if(e.target.parentElement.tagName === 'LI' && e.target.hasAttribute('data-navbar-link')) { 

				document.querySelectorAll('.shrink-link').forEach(link => link.classList.remove('shrink-link'));

				e.target.parentElement.classList.add('shrink-link');

				// Click on icon
			} else if(e.target.parentElement.parentElement.tagName === 'LI' && e.target.parentElement.hasAttribute('data-navbar-link')) {

				document.querySelectorAll('.shrink-link').forEach(link => link.classList.remove('shrink-link'));

				e.target.parentElement.parentElement.classList.add('shrink-link');

			}

			// Releasing click animation
		} else if(e.type === 'mouseup') {
			
			if(e.target.parentElement.tagName === 'LI' && e.target.hasAttribute('data-navbar-link')) {

				document.querySelectorAll('.shrink-link').forEach(link => link.classList.remove('shrink-link'));

				e.target.parentElement.classList.remove('shrink-link');

				// Click on icon
			} else if(e.target.parentElement.parentElement.tagName === 'LI' && e.target.parentElement.hasAttribute('data-navbar-link')) {

				document.querySelectorAll('.shrink-link').forEach(link => link.classList.remove('shrink-link'));

				e.target.parentElement.parentElement.classList.remove('shrink-link');

			}
		}
	}

}

export const ui = new Ui();