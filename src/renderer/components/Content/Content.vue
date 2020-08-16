<template>
    <div>
        <div v-masonry
             item-selector=".item"
             gutter='20'
            style=" -webkit-app-region: no-drag"
        >
            <v-card
                    @click.stop="route2(item)"
                    v-masonry-tile
                    width="344"
                    class="mx-auto item"
                    v-for="(item, index) in data"
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-subtitle>
                            <h4 v-text="item.userid"></h4>
                            <p v-text="item.now"></p>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-img v-if="item.img"
                       v-bind:src="'https://nmbimg.fastmirror.org/image/'+item.img+item.ext"
                       height="194"
                ></v-img>

                <v-card-text v-html="item.content">
                </v-card-text>

                <v-card-actions>
                    <v-btn
                            text
                            color="deep-purple accent-4"
                            v-text=" '回复'+item.replyCount"
                    >
                    </v-btn>
                    <v-btn
                            text
                            color="deep-purple accent-4"
                    >
                        收藏
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>

        <v-list-item
        >
            <v-list-item-avatar>
                <v-progress-circular
                        indeterminate
                        color="green"
                ></v-progress-circular>

            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title v-if="!isEnd"> 正在加载</v-list-item-title>
                <v-list-item-title v-else>--我也是有底线的--</v-list-item-title>
            </v-list-item-content>

        </v-list-item>
    </div>
</template>
<script>
  export default {
    name: 'Content',
    data: () => ({
      data: [],
      loading: false,
      loadingMore: false,
      isScroll: true,
      pageIndex: 1,
      pid: -1,
      isEnd: false
    }),
    created () {
      this.$http.get('https://adnmb2.com/Api/showf?id=121&page=1').then(
        (res) => {
          this.data = res.data
        }
      )
      document.addEventListener('scroll', this.scrollMoreData)
    },
    methods: {
      scrollMoreData () {
        const scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop
        const clientHeight = document.documentElement.clientHeight || window.screen.availHeight
        let scrollHeight = document.documentElement.scrollHeight
        if ((scrollTopHeight + clientHeight) >= scrollHeight && this.isScroll) {
          this.isScroll = false
          this.loadingMore = true
          this.$http.get('https://adnmb2.com/Api/showf', {
            params: {
              id: this.pid,
              page: ++this.pageIndex
            }

          }).then(res => {
            this.loadingMore = false
            if (res.data.length > 0) {
              this.isScroll = true
              this.data = [...this.data, ...res.data]
            } else {
              this.show = true
              this.isEnd = true
            }
          })
        }
      },
      init (pid) {
        this.data = []
        this.loading = true
        this.pageIndex = 1
        this.pid = pid
        this.$http.get('https://adnmb2.com/Api/showf', {
          params: {
            id: pid,
            page: 1
          }
        }).then(
          (res) => {
            this.data = res.data
            this.loading = false
          }
        )
      },
      route2 (item) {
        const {href} = this.$router.resolve({
          name: `info`,
          params: {
            info: item.id
          },
          query: {
            info: item.id
          }
        })
        window.open(href, '_blank')
      }
    },
    destroyed () {
      document.removeEventListener('scroll', this.scrollMoreData, false)
    }
  }
</script>

<style scoped>
    .img {
        margin-top: 20px;
        width: 10px;
        height: 100%;
    }

    .item {
        margin-top: 20px;
    }


</style>
