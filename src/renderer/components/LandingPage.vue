<template>

    <v-app id="inspire">
        <v-app-bar
                @touchmove.stop
                @scroll.stop=""
                @click.stop=""
                app
                clipped-left
                color="teal"
                dense
                style=" -webkit-app-region: drag;"

        >
            <v-app-bar-nav-icon

                    @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <span color="white" class="title" v-text="this.selectItem.name"></span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-row
                    align="center"
                    style="max-width: 650px"
            >

            </v-row>
            <v-btn icon @click="wclose"

            >
                <v-icon>mdi-close
                </v-icon>

            </v-btn>
        </v-app-bar>
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
        >
            <v-list dense>
                <v-list-item
                        v-for="item in items"
                        :key="item.text"
                        link
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
                <v-list>
                    <v-list-item
                            v-for="item in items2"
                            :key="item.id"
                            link
                            @click="routePlate(item)"
                    >

                        <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-list>
        </v-navigation-drawer>


        <v-main class="main" style="overflow: auto">
            <v-container class="fill-height">
                <plat @scroll.stop="" ref="plat" class="fill-height"
                      style="width: 100%;-webkit-app-region: no-drag;"></plat>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
  import Content from './Content/Content'

  export default {
    components: {
      'plat': Content
    },
    data: () => ({
      drawer: null,
      items: [
        {icon: 'mdi-home', text: '全部'},
        {icon: 'mdi-star', text: '收藏'},
        {icon: 'mdi-compass', text: '发现'}
      ],
      items2: [],
      selectItem: ''
    }),
    created () {
      this.$http.get('http://cover.acfunwiki.org/luwei.json?appid=e31c86032f0d607c&__t=1577944306659')
        .then((res) => {
          this.items2 = res.data.forum
          this.selectItem = this.items2[1]
        })
    },
    methods: {
      routePlate (item) {
        this.selectItem = item
        this.$refs.plat.init(item.id)
      },
      wclose () {
        window.close()
      }
    }
  }
</script>
<style>

</style>
