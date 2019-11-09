Vue.component('entry', {
    props: [
        'title',
        'link',
        'authors',
        'venue',
    ],
    template: `
<div class="text-left">
    <div>
        <a v-if="this.link.length > 0" v-bind:href="{link}">{{ title }}</a>
        <span v-else>{{ title }}</span>
    </div>
    <ul>
        <li>{{ authors }}</li>
        <li>{{ venue }}</li>
    </ul>
</div>
    `
});