
class Entry {
    constructor(id, title, link, authors, venue, tags) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.authors = authors;
        this.venue = venue;
        this.tags = tags;
    }
}

class EntryList {
    constructor(entries) {
        this.list = entries;
    }

    addEntry(entry) {
        for (let i = 0; i < this.list.length; i++) {
            if (entry.id === this.list[i].id) {
                return false;
            }
        }
        this.list.push(entry);
        return true;
    }

    deleteEntry(id) {
        let i = -1;
        this.list.forEach(function (item, index) {
            if (item.id === id) {
                i = index;
            }
        });
        if (i !== -1) {
            this.list.splice(i, 1);
        }
    }
}