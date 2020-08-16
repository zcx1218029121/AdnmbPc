<template>
    <v-app
    >
        <v-app-bar
                app
                clipped-left
                color="teal"
                dense
                @click="back"
        >
            <v-btn icon>
                <v-icon>mdi-close
                </v-icon>
            </v-btn>

            <v-toolbar-title v-text="data.content"></v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main class="main">
            <v-container class="">
                <v-card
                        v-masonry-tile
                        class="mx-auto item"
                >
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>
                                <v-chip
                                        class="ma-2"
                                        color="indigo"
                                        text-color="white"
                                >
                                    <v-avatar left>
                                        <v-icon>mdi-account-circle</v-icon>
                                    </v-avatar>
                                    pou
                                </v-chip>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <h4 v-text="data.userid"></h4>

                                <p v-text="data.now"></p>

                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-img v-if="data.img"
                           v-bind:src="'https://nmbimg.fastmirror.org/image/'+data.img+data.ext"
                           height="194"
                    ></v-img>

                    <v-card-text v-html="data.content">
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                text
                                color="deep-purple accent-4"
                                v-text=" '回复'"
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
                <v-card
                        v-masonry-tile

                        class="mx-auto item"
                        v-for="(item, index) in this.replys"
                >
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle>
                                <v-chip
                                        v-if="item.userid === data.userid"
                                        class="ma-2"
                                        color="indigo"
                                        text-color="white"
                                >
                                    <v-avatar left>
                                        <v-icon>mdi-account-circle</v-icon>
                                    </v-avatar>
                                    pou
                                </v-chip>
                                <h4 v-text="item.userid"></h4>
                                <p v-text="item.now"></p>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-img v-if="item.img"
                           v-bind:src="'https://nmbimg.fastmirror.org/image/'+item.img+item.ext"
                    ></v-img>

                    <v-card-text v-html="item.content">
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                text
                                color="deep-purple accent-4"
                                v-text=" '回复'"
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
                    <v-divider></v-divider>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
  export default {
    data: () => ({
      data: '',
      replys: [],
      sid: 0,
      loading: false,
      loadingMore: false,
      isScroll: true,
      pageIndex: 1
    }),
    mounted () {
      this.sid = this.$route.query.info
      this.init(this.sid)
      document.addEventListener('scroll', this.scrollMoreData)
    },
    methods: {
      back () {
        window.close()
      },
      init (sid) {
        this.data = []
        this.loading = true
        this.pageIndex = 1
        this.sid = sid
        this.$http.get('https://nmb.fastmirror.org/Api/thread', {
          params: {
            id: sid,
            page: this.pageIndex++
          }
        }).then(
          (res) => {
            this.data = res.data
            this.replys = [...this.replys, ...res.data.replys]
            this.loading = false
          }
        )
      },
      scrollMoreData () {
        const scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop
        const clientHeight = document.documentElement.clientHeight || window.screen.availHeight
        let scrollHeight = document.documentElement.scrollHeight
        if ((scrollTopHeight + clientHeight) >= scrollHeight && this.isScroll) {
          this.isScroll = false
          this.loadingMore = true
          this.init(this.sid)
        }
      }
    }
  }
</script>
