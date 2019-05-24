<template>
  <div class="lotterylist">
    <div class="lotteryItem" v-for="(item,index) in data" :key="index+'lottery'">
      <div class="lottery-img">
        <img :src="'http://localhost:3333'+item.icon2" alt>
      </div>
      <span>{{item.cn}}</span>
    </div>
    <add-new-game :game-id="lotteryId" @updateclick="uploadGame()"/>
  </div>
</template>

<script>
import AddNewGame from '../../components/LotterListChild/AddNewGame/AddNewGame.vue'

export default {
  components: {
    AddNewGame
  },
  data() {
    return {
      data: [],
      lotteryId: ''
    };
  },
  methods: {
    uploadGame(){
      this.$http
      .get(this.$api.findAllGames)
      .then(resp => {
        if (resp.data.success) {
          this.data = resp.data.data[0].games;
          this.lotteryId = resp.data.data[0]._id;
        } else {
          console.log(resp.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.uploadGame();
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.lotterylist {
  @include main;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  .lotteryItem {
    width: 110px;
    height: 110px;
    margin-top: 20px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .lottery-img {
      width: 90px;
      height: 90px;
    }
  }
}
</style>