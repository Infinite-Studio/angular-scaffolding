describe('UNIT: Book Model', function() {

    var Book;

    beforeEach(module('app'));
    beforeEach(inject(function(_$httpBackend_, _Book_){
        Book = _Book_;
    }));

    it('#REQ-BOOK-001 : Should have a resume as [id]#[title] ([description])', function () {
        var book = new Book({
            id: 1,
            title: 'Super book',
            description: 'The book description...'
        });
        expect(book.getResume()).toBe('1#Super book (The book description...)');
    });

});