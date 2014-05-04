describe('E2E: Book Form', function() {

    beforeEach(function() {
        browser().navigateTo('/');
        element('div[app-menu] a[href="#/book"]').click();
        element('a[ng-click="addBookForm()"]').click();
    });

    it('#REQ-BOOK-005 : Add form modal title should have the good label', function() {
        expect(element('.modal-dialog h4').text()).toBe('Add Book');
    });

    it('#REQ-BOOK-006 : Add form title label should have the good label', function() {
        expect(element('.modal-dialog label[for="bookTitle"]').text()).toBe('Title');
    });

    it('#REQ-BOOK-007 : Add form title placeholder should have the good label', function() {
        expect(element('.modal-dialog input[name="bookTitle"]').attr('placeholder')).toBe('The title of the book');
    });

    it('#REQ-BOOK-008 : Add form description label should have the good label', function() {
        expect(element('.modal-dialog label[for="bookDescription"]').text()).toBe('Description');
    });

    it('#REQ-BOOK-009 : Add form description placeholder should have the good label', function() {
        expect(element('.modal-dialog textarea[name="bookDescription"]').attr('placeholder')).toBe('A description of the book');
    });

    it('#REQ-BOOK-010 : Add form should be closed', function() {
        element('.modal-dialog button[type="button"]').click();
        expect(repeater('.modal-dialog').count()).toBe(0);
    });

    it('#REQ-BOOK-011 : Add form should add element into list', function() {
        expect(repeater('ul li').count()).toBe(3);
        input('book.title').enter('Title');
        input('book.description').enter('description');
        element('.modal-dialog button[type="submit"]').click();
        sleep(1);
        expect(repeater('.modal-dialog').count()).toBe(1);
        expect(repeater('ul li').count()).toBe(3);
    });

});