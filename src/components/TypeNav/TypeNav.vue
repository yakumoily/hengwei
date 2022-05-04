<template>
  <div class="type-nav">
    <div class="container">
      <div  @mouseenter="enterSort" @mouseleave="leaveSort">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-show="isShow" @click="sendQuery">
          <div class="all-sort-list2">
            <div class="item" v-for="item in categoryList" :key="item.categoryId">
              <h3 :categoryName="item.categoryName" :category1Id="item.categoryId" style="cursor:pointer;">
                {{item.categoryName}}
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl v-for="item2 in item.categoryChild" :key="item2.categoryId" class="fore">
                    <dt>
                      <a href="javascript:void(0);" :categoryName="item2.categoryName" :category2Id="item2.categoryId">{{item2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                        <a href="javascript:void(0);" :categoryName="item3.categoryName" :category3Id="item.categoryId">{{item3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    sendQuery (e) {
      if (e.target.getAttribute('categoryname')) {
        const query = {
          categoryName: e.target.getAttribute('categoryname')
        }
        if (this.$route.query.keyword) {
          query.keyword = this.$route.query.keyword
        }
        if (e.target.getAttribute('category1id')) {
          query.category1Id = e.target.getAttribute('category1id')
        } else if (e.target.getAttribute('category2id')) {
          query.category2Id = e.target.getAttribute('category2id')
        } else {
          query.category3Id = e.target.getAttribute('category3id')
        }
        this.$router.push({
          name: 'search',
          query,
          params: this.$route.params
        })
      }
    },
    enterSort () {
      if (this.$route.name !== 'home') {
        this.isShow = true
      }
    },
    leaveSort () {
      if (this.$route.name !== 'home') {
        this.isShow = false
      }
    }
  },
  computed: {
    // 拿取三级列表数据
    ...mapState('TypeNav', ['categoryList'])
  },
  watch: {
    '$route.name': {
      handler (newVal) {
        if (newVal === 'home') {
          this.isShow = true
        } else {
          this.isShow = false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            &:hover {
              background: #ff6700 !important;
              color: white;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
