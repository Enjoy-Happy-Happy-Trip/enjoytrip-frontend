<template>
    <tr>
        <th v-text="attraction.title"></th>
        <td><img :src="attraction.firstImage" alt="이미지 파일 없음" style="width:700px; height:400px"></td>
    </tr>
</template>

<script>
export default {
    name: "ScheduleAttraction",
    props: {
        attraction: {},
    },
}
</script>
