function sgContactForm () {
	return {
		restrict: 'E',
		templateUrl: 'templates/contact-form-template.html',
		controllerAs: 'sgContactForm',
		controller: function() {
			this.debug1 = false;
			this.debug2 = true;
			this.className = 'blue';
			this.name = '';
			this.email = '';
			this.message = 'hello from ngbind!';
			this.onSubmit = function() {
				debugger;
			};
		}
	}
}

module.exports = sgContactForm;
