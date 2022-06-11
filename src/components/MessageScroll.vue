<template>
  <div class="message-scroll-container">
      <dv-scroll-board class="my-scroll-boad" :config="config"/>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  name: 'MessageScroll',
  props: {
    messageList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    config() {
      return {
        data: this.searilizeData(this.messageList),
        oddRowBGC: 'transparent',
        evenRowBGC: 'transparent',
        rowNum: 1,
        waitTime: 5000,
        align: ['left']        
      };
    }
  },
  methods: {
    searilizeData(data) {
      let res = data.map((message) => {
        let content = `<div class="message-item">
                  <div class="message-icon border-icon35"></div>
                  <svg-icon class="title-icon" icon-class="notice_icon"></svg-icon>
                  <span class="text">[${message.noticeTitle}]&nbsp;${_.escape(message.noticeDetail)}</span>
                </div>`;
        return [content];
      });
      return res;
    }
  }  
}
</script>
<style lang="scss">
.message-scroll-container {
  height: 0.62rem;
  overflow: hidden;
  padding: 0 0.1rem;
    .message-item {
      display: flex;
      align-items: center;
      list-style: none;
      line-height: 0.18rem;
      height: 0.62rem;
      color: #fff;
      .message-icon {
        width: 0.16rem;
        height: 0.2rem;
        margin-right: 0.1rem;
      }
      .text {
        flex: 1;
        text-align: left;
        font-size: 0.14rem;
        box-sizing: border-box;
        word-wrap: break-word;
        word-break: break-all;
        white-space: normal;
        overflow: auto;
        text-overflow: default;
      }
    }
}
</style>