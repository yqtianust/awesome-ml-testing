Vue.component('entry', {
    props: [
        'title',
        'link',
        'authors',
        'venue',
        'keywords',
    ],
    computed: {
        "hTitle": function () {
            let reg = new RegExp("(" + this.keywords.join("|") + ")", "gi");
            return this.title.replace(reg, "<span style='background-color: #8ca0f754'>$1</span>");
        },
        "hAuthors": function () {
            let reg = new RegExp("(" + this.keywords.join("|") + ")", "gi");
            return this.authors.replace(reg, "<span  style='background-color: #8ca0f754'>$1</span>");
        },
        "hVenue": function () {
            let reg = new RegExp("(" + this.keywords.join("|") + ")", "gi");
            return this.venue.replace(reg, "<span style='background-color: #8ca0f754'>$1</span>");
        },
    },

    template: `
<div class="text-left">
    <div>
        <a v-if="this.link.length > 0" v-bind:href="link" v-html="hTitle"></a>
        <span v-else v-html="hTitle"></span>
    </div>
    <ul>
        <li v-html="hAuthors"></li>
        <li v-html="hVenue"></li>
    </ul>
</div>
    `
});