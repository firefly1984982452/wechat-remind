<template>
	<view class="page">
        {{infos}}
	</view>
</template>

<script>
    import {
        mapState
    } from 'vuex';
	export default {
		// computed: mapState(['info']),
		computed: {
			info:{
				get:function(){
					return this.$store.state.info
				},
				set:function(){
					return this.$store.state.info
				}
			}
		},
		data() {
			return {
                infos:''
			}
		},
		onLoad() {
            this.infos = this.info;
		},
		methods: {
		},
	}
</script>

<style>
</style>
