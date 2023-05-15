<template>
    <div></div>
</template>

<script>
export default {
    name: "AddPlanlist",
    data() {
        return {
            places: [],
        }
    },
    created() {
        let planTitle = document.createElement("input");
        planTitle.setAttribute("type", "text");
        planTitle.setAttribute("placeholder", "여행 이름을 정해주세요");
        planTitle.setAttribute("id", "planTitle");
        let planList = document.createElement("div");
        planList.setAttribute(
            "class",
            "alert alert-primary mt-3 text-center fw-bold"
        );
        planList.innerHTML = "여행 계획";

        const startDateInput = document.createElement("input");
        startDateInput.setAttribute("type", "date");
        startDateInput.setAttribute("id", "start_date");
        startDateInput.setAttribute("name", "start_date");

        const endDateInput = document.createElement("input");
        endDateInput.setAttribute("type", "date");
        endDateInput.setAttribute("id", "end_date");
        endDateInput.setAttribute("name", "end_date");

        let rightContent = document.getElementById("rightContent");
        rightContent.innerHTML = "";
        rightContent.appendChild(planTitle);
        rightContent.appendChild(startDateInput);
        rightContent.appendChild(endDateInput);
        rightContent.appendChild(planList);

        let planListDetail = document.createElement("div");
        planListDetail.setAttribute("id", "planListDetail");
        rightContent.appendChild(planListDetail);

        let button = document.createElement("button");
        button.setAttribute("class", "btn btn-outline-success");
        button.setAttribute("id", "savePlan");
        var t = document.createTextNode("계획 저장");
        button.appendChild(t);

        rightContent.appendChild(button);

        // 계획 저장 버튼
        document.getElementById("savePlan").addEventListener("click", () => {
            let planTitle = document.getElementById("planTitle").value;
            let start_date = document.getElementById("start_date").value;
            let end_date = document.getElementById("end_date").value;

            this.places.push(planTitle);
            this.places.push(start_date);
            this.places.push(end_date);

            fetch("/tour/saveplan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.places),
            }).then((window.location.href = "/"));
        });
    },
};
</script>
