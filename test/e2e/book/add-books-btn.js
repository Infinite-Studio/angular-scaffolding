describe('E2E: Add Book btn', function() {

    beforeEach(function() {
        browser().navigateTo('/');
        element('div[app-menu] a[href="#/book"]').click();
    });

    it('#REQ-BOOK-003 : Add form btn should have the good label', function() {
        var addBookFormBtn = element('a[ng-click="addBookForm()"]');
        expect(addBookFormBtn.text()).toBe('Add a book');
    });

    it('#REQ-BOOK-004 : Should open a unique book creation modal', function() {
        var addBookFormBtn = element('a[ng-click="addBookForm()"]');
        expect(repeater('.modal-dialog').count()).toBe(0);
        addBookFormBtn.click();
        expect(repeater('.modal-dialog').count()).toBe(1);
    });

});