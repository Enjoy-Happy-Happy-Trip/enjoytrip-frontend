<template>
    <tr>
        <td v-text="index + 1"></td>
        <td v-text="article.user_id"></td>
        <td
            v-text="article.subject"
            style="cursor: pointer"
            @click="showArticle(article.article_no)"
        ></td>
        <td>{{ article.register_time | showRegTime }}</td>
    </tr>
</template>

<script>
export default {
    name: "BoardArticle",
    props: {
        article: {},
        index: Number,
    },
    methods: {
        showArticle(article_no) {
            this.$router.push(`/board/detail/${article_no}`);
        },
    },
    filters: {
        showRegTime(val) {
            return (val+"").substring(0, 10) + "";
        },
    },
};
</script>
