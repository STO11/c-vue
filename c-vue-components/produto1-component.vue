<template>

  
    <div class="col-md-2 col-sm-4">
        <div class="item item-thumbnail">
            <a href="product_detail.html" class="item-image">
                <img src="/assets/img/product/product-apple-tv.png" alt="" />
                <div class="discount">40% OFF</div>
            </a>
            <div class="item-info">
                <h4 class="item-title">
                    <a href="product.html">Apple Tv<br />32GB</a>
                </h4>
                <p class="item-desc">The future of television is here.</p>
                <div class="item-price">$149.00</div>
                <div class="item-discount-price">$249.00</div>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'produto1', 
        mounted() {
            console.log('Component mounted produto1.')
            //console.log(axios);
        }
    }
</script>

<style lang="scss" scoped>

</style>