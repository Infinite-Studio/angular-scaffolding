describe('E2E: Home data table list', function() {

    beforeEach(function() {
        browser().navigateTo('/');
    });

    it('#REQ-HOME-001 : Should have 10 entries', function() {
        expect(repeater('div[app-table] tbody tr').count()).toBe(10);
    });

    it('#REQ-HOME-002 : Should change length of entries', function() {
        element('div[app-table] .dataTables_length select option[value="25"]').click();
        expect(repeater('div[app-table] tbody tr').count()).toBe(12);
    });

});