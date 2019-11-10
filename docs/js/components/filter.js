Vue.component('filter-component', {
    props: [
        "tags",
    ],
    data: function () {
        return {
            "sortedBy": "title",
            "checkedTags": [],
            "searchPayload": "",
            "reverse": false,
        }
    },
    methods: {
        changeSortedBy: function (column) {
            this.$emit("sortedby", column);
            this.sortedBy = column;
            // console.log(column);
        },
        changeTags: function (tag) {
            this.checkedTags = [];
            this.tags.forEach(function (tag) {
                if ($("#" + tag).prop("checked")) {
                    if (this.checkedTags.indexOf(tag) < 0) {
                        this.checkedTags.push(tag);
                    }
                }
            }, this);
            if (this.checkedTags.length === 0) {
                alert("All tags are removed: showing everything.")
            }
            this.$emit("tags", this.checkedTags);
            // console.log(this.checkedTags)
        },
    },
    watch: {
        searchPayload: function (val) {
            if (val.length > 0) {
                let tmp = val.trim().split(' ');
                let kws = [];
                for (let i = 0; i < tmp.length; i++) {
                    if (tmp[i].length > 0) {
                        kws.push(tmp[i].trim())
                    }
                }
                this.$emit("keywords", kws);
                // console.log(kws)
            }
        },
        reverse: function (val) {
            this.$emit("reverse", val);
        }
    },
    template: `
<form class="mt-3">
    <div class="form-group">
        <label for="searchTextBox" class="font-weight-bold">Keywords:</label>
        <input type="text" class="form-control" id="searchTextBox" aria-describedby="searchHelp"
               placeholder="Search Paper..." v-model="searchPayload">
        <small id="searchHelp" class="form-text text-muted">Search papers by keywords. Keywords should be
            separated by blank space.</small>
    </div>
    <template v-if="tags.length > 0">
        <label class="font-weight-bold">Tags:</label>
        <br/>
        <div class="form-group form-check-inline" v-for="tag in tags">
            <input type="checkbox" class="form-check-input" v-bind:id="tag" v-on:click="changeTags(tag)">
            <label class="form-check-label" v-bind:for="tag">{{ tag }}</label>
        </div>
    </template>
    
    <br/>
    <label class="font-weight-bold">Sort:</label>
    <br/>
    <div class="d-inline mr-3">Sorted by: </div>
    <div class="btn-group" role="group" aria-label="sortBy">
        <button type="button" v-bind:class="['btn', 'btn-sm', sortedBy === 'title'? 'btn-primary' : 'btn-outline-primary']" v-on:click="changeSortedBy('title')">Title</button>
        <button type="button" v-bind:class="['btn', 'btn-sm', sortedBy === 'conference'? 'btn-primary' : 'btn-outline-primary']" v-on:click="changeSortedBy('conference')">Conference</button>
        <button type="button" v-bind:class="['btn', 'btn-sm', sortedBy === 'author'? 'btn-primary' : 'btn-outline-primary']" v-on:click="changeSortedBy('author')">Author</button>
    </div>
    <div class="ml-3 form-check-inline align-middle">
        <input type="checkbox" class="form-check-input" v-model="reverse" id="reverse">
        <label class="form-check-label" for="reverse">reverse order</label>
    </div>
</form>
    `
});