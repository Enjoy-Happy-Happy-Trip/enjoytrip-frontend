<template>
    <footer class="footer mt-4">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <!-- Left side content -->
                    <h3>About Us</h3>
                    <p>
                        HaoHao Trip is designed for users to easily create, share, and recommend their tour plans.
                        HaoHao means "Good Good" in Chinese, and our title name implies that we hope the best for the users of our service. 
                    </p>
                </div>
                <div class="col-md-6">
                    <!-- Right side content -->
                    <h3>Contact Us</h3>
                    <p>Address: 서울 강남구 테헤란로 212 멀티캠퍼스 역삼</p>
                    <p>Tel: 02-3429-5114</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterSection",
};
</script>

<style>
.footer {
    background-color: #f8f9fa;
    padding: 20px 0;
}

.footer h3 {
    font-size: 20px;
    font-weight: bold;
}

.footer p {
    font-size: 14px;
    line-height: 1.6;
}
</style>
