<template>
  <div class="lotterylist">
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
    <div class="lotteryItem">
      <div class="lottery-img"></div>
      <span>123</span>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  @import '../../common/scss/mixin.scss';

  .lotterylist{
    @include main;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .lotteryItem{
      width: 100px;
      height: 100px;
      background: lightblue;
      margin-top: 20px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .lottery-img{
        width: 80px;
        height: 80px;
        background: red;
      }
    }
  }
</style>