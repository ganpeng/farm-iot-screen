<template>
  <div class="select-container">
    <div class="select">
      <div class="input-field">
        <input type="text">
      </div>
      <div class="option-field">
        <ul class="option-list">
          <li class="option-item">1</li>
          <li class="option-item">2</li>
          <li class="option-item">3</li>
          <li class="option-item">4</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Select'
}
</script>
<style lang="scss" scoped>
.select-container {
  width: 120px;
  .select {
    position: relative;
    .input-field {
      background-color: #182F68;
      border: 1px solid #2E4E9E;
      border-radius: 2px;
      input {
        width: 120px;
        height: 32px;
        line-height: 32px;
        outline: none;
        border: none;
        color: #F0F0F0;
        font-size: 12px;
        padding: 0 20px 0 10px;
      }
    }
    .option-field {
      position: absolute;
      top: 36px;
      min-width: 100%;
      height: 100px;
      background-color: #182F68;
      border: 1px solid #2E4E9E;
      overflow-y: scroll;
      cursor: pointer;
      .option-list {
        .option-item {
          color: #F0F0F0;
          height: 32px;    
          line-height: 32px;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>