/**
 * 导航栏Vue组件
 */

Vue.component('list', {
    props: [
        'keywords', //array
        'tags', //array
        'entryList', // all entries
        'sortedby',
        'reverse',
    ],
    created: function () {
        this.loadList();
    },
    data: function () {
        return {
            visibleList: [],
        };
    },
    computed: {
        empty: function () {
            return this.visibleList.length === 0;
        },
        totalTags: function () {
            if (this.tags === undefined) {
                return [];
            }
            return this.tags;
        },
        kws: function () {
            if (this.keywords === undefined) {
                return [];
            }
            return this.keywords;
        }
    },
    methods: {
        loadList: function () {
            let tmp = Array();
            if (this.kws.length > 0) {
                this.entryList.forEach(function (item) {
                    for (let i = 0; i < this.kws.length; i++) {
                        let kw = this.kws[i];
                        if (item.title.toLowerCase().indexOf(kw.toLowerCase()) >= 0 ||
                            item.authors.join(" ").indexOf(kw.toLowerCase()) >= 0 ||
                            item.venue.toLowerCase().indexOf(kw.toLowerCase()) >= 0) {
                            tmp.push(item);
                            break;
                        }
                    }
                }, this);
            } else {
                tmp = Array.from(this.entryList);
            }
            if (this.totalTags.length > 0) {
                this.visibleList = [];
                tmp.forEach(function (item) {
                    for (let i = 0; i < item.tags.length; i++) {
                        if (this.totalTags.includes(item.tags[i])) {
                            this.visibleList.push(item);
                            break;
                        }
                    }
                }, this);
            } else {
                this.visibleList = Array.from(tmp);
            }

            let vue = this;
            let sortedBy = this.sortedby;
            this.visibleList.sort(((a, b) => {
                if (sortedBy === 'title') {
                    if (vue.reverse) {
                        return a.title > b.title ? -1 : 1;
                    } else {
                        return a.title < b.title ? -1 : 1;
                    }
                } else if (sortedBy === 'conference') {
                    if (vue.reverse) {
                        return a.venue > b.venue ? -1 : 1;
                    } else {
                        return a.venue < b.venue ? -1 : 1;
                    }
                } else if (sortedBy === 'author') {
                    if (vue.reverse) {
                        return a.authors.join(' ') > b.authors.join(' ') ? -1 : 1;
                    }else {
                        return a.authors.join(' ') < b.authors.join(' ') ? -1 : 1;
                    }
                }
            }));
        },
    },
    watch: {
        keywords: function (val) {
            // WHERE筛选条件变化事件
            this.loadList();
        },
        tags: function (val) {
            // ORDER BY条件变化事件
            this.loadList();
        },
        entryList: function (val) {
            this.loadList();
        },
        sortedby: function (val) {
            this.loadList();
        },
        reverse: function (val) {
            this.loadList();
        }
    },
    template: `
    <div>
        <table class="table text-center">
            <tbody>
            <template v-if="!empty">
                <tr v-for="(entry, index) in visibleList">
                    <td>
                        <entry v-bind:title="entry.title" v-bind:link="entry.link" v-bind:authors="entry.authors.join(', ')" v-bind:venue="entry.venue"></entry>
                    </td>
                </tr>
            </template>
            <template v-else>
                <tr>
                    <td class="text-center">
                        Data not found
                    </td>
                </tr>
            </template>
            </tbody>
            
            
        </table>
    </div>
    `,
});
