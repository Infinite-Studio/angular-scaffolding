describe('E2E: Menu label', function() {

    beforeEach(function() {
        browser().navigateTo('/');
    });

    it('#REQ-MENU-001 : Menu Home link should have the good label', function() {
        expect(element('div[app-menu] a[href="#/"]').text()).toContain('Home');
    });

    it('#REQ-MENU-002 : Menu Book list link should have the good label', function() {
        expect(element('div[app-menu] a[href="#/book"]').text()).toContain('Book List');
    });

});