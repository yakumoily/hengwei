<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked == 1" @change="changeIsChecked(item)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">{{item.sourceType}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeGoodsNum('mins',item,-1)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" @blur="changeGoodsNum('input',item,$event)">
            <a href="javascript:void(0)" class="plus" @click="changeGoodsNum('plus',item,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuPrice * item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:void(0);" class="sindelet" @click="deleteGood(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="allCheck" @change="allCheckBtn">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:void(0);" @click="deleteChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{jian}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="javascript:void(0);" @click="tipTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { reqDeleteGood, reqChangeCheckdState } from '@/api'
export default {
  name: 'ShopCart',
  data () {
    return {
      allCheck: true,
      jian: 0,
      totalPrice: 0
    }
  },
  methods: {
    ...mapActions('Detail', ['getChangeGoodsNum']),
    // 删除商品
    async deleteGood (num) {
      const res = await reqDeleteGood(num)
      if (res.code === 200) {
        this.$store.dispatch('ShopCart/getShopCartList')
      }
    },
    // 改变商品选中状态
    async changeIsChecked (item) {
      if (item.isChecked === 1) {
        item.isChecked = 0
      } else {
        item.isChecked = 1
      }
      const res = await reqChangeCheckdState(item.skuId, item.isChecked)
      if (res.code === 200) {
        this.$store.dispatch('ShopCart/getShopCartList')
      }
    },
    // 全选
    allCheckBtn () {
      const newArr = []
      this.cartList.forEach(async item => {
        if (this.allCheck) {
          item.isChecked = 1
        } else {
          item.isChecked = 0
        }
        const res = reqChangeCheckdState(item.skuId, item.isChecked)
        newArr.push(res)
      })
      Promise.all(newArr).then(() => {
        this.$store.dispatch('ShopCart/getShopCartList')
      })
    },
    // 删除选择的商品
    deleteChecked () {
      this.cartList.forEach(item => {
        if (item.isChecked === 1) {
          this.deleteGood(item.skuId)
        }
      })
    },
    async changeGoodsNum (type, item, num) {
      try {
        if (type === 'plus') {
          await this.getChangeGoodsNum({ skuId: item.skuId, skuNum: num })
        } else if (type === 'mins') {
          await this.getChangeGoodsNum({ skuId: item.skuId, skuNum: num })
        } else {
          const i = +num.target.value - item.skuNum
          await this.getChangeGoodsNum({ skuId: item.skuId, skuNum: i })
        }
        this.$store.dispatch('ShopCart/getShopCartList')
      } catch (error) {
        console.log(error)
      }
    },
    // 提交订单
    async tipTrade () {
      // const res = await reqTipTrade()
      // if (res.code === 200) {
      //   console.log(res)
      //   this.$router.push(`/pay?tradeNo=${res.data.tradeNo}`)
      // }
      this.$router.push('/trade')
    }
  },
  watch: {
    cartList: {
      handler (newVal) {
        // 全选按钮随商品是否全选改变自身状态
        this.allCheck = newVal.every(item => item.isChecked === 1)
        // 计算总件数
        this.jian = newVal.reduce((num, item) => {
          if (item.isChecked === 1) {
            num += item.skuNum
          }
          return num
        }, 0)
        // 计算总价格
        this.totalPrice = newVal.reduce((num, item) => {
          if (item.isChecked === 1) {
            num += item.skuNum * item.skuPrice
          }
          return num
        }, 0)
      }
    }
  },
  computed: {
    ...mapState('ShopCart', ['cartList'])
  },
  created () {
    this.$store.dispatch('ShopCart/getShopCartList')
  }
}
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
