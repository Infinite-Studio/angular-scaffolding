describe('E2E: Book list', function() {

    beforeEach(function() {
        browser().navigateTo('/');
        element('div[app-menu] a[href="#/book"]').click();
    });

    it('#REQ-BOOK-010 : Should go into on books list by menu', function() {
        expect(browser().location().path()).toBe('/book');
    });

    it('#REQ-BOOK-011 : Should have 3 element into the list', function() {
        expect(repeater('ul li').count()).toBe(3);
    });

});