<template>
  <div class="component documents">
    <div class="documents-header inline">
      <icon name="document" />
      <h3>Documents</h3>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UserDocument',
  components: {},
  props: {},
};
</script>

<style lang="scss" scoped>
.documents {
  grid-area: documents;
}
.component.documents {
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
  height: 100%;
}
.documents-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 39px;
  padding-left: 20px;
  border-radius: 8px 8px 0 0;
  background: var(--main-gradient);
}
.documents-header h3 {
  color: white;
  font-weight: 700;
  margin: 0 0 0 12px;
}
/* .component {
  background-color: white;
  border-radius: 8px;
  position: relative;
  padding: 20px;
  /* height: max-content; */
/* }*/

::v-deep {
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  .tabs {
    margin-top: 19px;
    height: calc(100% - 19px);
    .nav.nav-tabs {
      padding-left: 10px !important;
    }
  }

  .tab-content {
    height: calc(100% - 37px);
    overflow-y: auto;
  }

  .nav-tabs,
  .nav-tabs .nav-link.active,
  .nav-tabs .nav-item.show .nav-link {
    border-color: white;
    border-bottom: none;
    margin-bottom: 0;
  }

  .nav-tabs a.nav-link {
    background: transparent;
  }
  .nav-tabs a.nav-link.active {
    font-weight: 700;
    color: var(--primary);
    border-bottom: 2px solid var(--primary);
  }
  .nav-tabs a {
    font-size: 14px;
    font-weight: 400;
    color: #707d8c;
    margin-right: 8px;
    padding: 10px 10px 3px 5px;
    border: none;
  }
  .nav-tabs .nav-item {
    border-bottom: 1px solid #d9dfe5;
  }
  .nav-tabs a:hover {
    color: #586574;
  }
}
/*

////// SCSS Conversion
////// There is the same code on top just converted to SCSS

::v-deep .nav-tabs,
::v-deep .nav-tabs .nav-link.active,
::v-deep .nav-tabs .nav-item.show .nav-link {
  border-color: white;
  border-bottom: none;
  margin-bottom: 0;
}

::v-deep .nav-tabs a.nav-link.active {
  font-weight: 700;
  color: #4289da;
  border-bottom: 2px solid #4289da;
}

::v-deep .nav-tabs a {
  font-size: 14px;
  font-weight: 400;
  color: #707d8c;
  margin-right: 8px;
  padding: 10px 10px 3px 5px;
  border: none;
}
::v-deep .nav-tabs .nav-item {
  border-bottom: 1px solid #d9dfe5;
}
::v-deep .nav-tabs a:hover {
  color: #586574;
}
*/
</style>
