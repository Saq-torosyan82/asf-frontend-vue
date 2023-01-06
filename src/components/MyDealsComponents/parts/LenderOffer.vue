<template>
  <div class="">
    <h5 class="counterparties-header">Choose the offer</h5>
    <p>
      Please choose the offer from the list below.<br />Keep in mind that when
      you accept an offer, all the other will be automatically rejected.
    </p>
    <div class="offer-list">
      <div class="offer">
        <input type="radio" />
        <h5 class="lender-name">Lender Name 1</h5>
        <div class="offer-document">
          <div class="document-type">
            <p>PDF</p>
          </div>
          <div class="document-info">
            <p class="document-name">Terms and Service 1</p>
            <p>dd.mm.yyyy</p>
          </div>
        </div>

        <div class="actions">
          <span>
            <icon name="download-document" />
            <a href="#" class="link-text">Download</a>
          </span>
          <a href="#" class="link-text">Reject</a>
        </div>
      </div>
      <div class="offer">
        <input type="radio" />
        <h5 class="lender-name">Lender Name 2</h5>
        <div class="offer-document">
          <div class="document-type">
            <p>PDF</p>
          </div>
          <div class="document-info">
            <p class="document-name">Terms and Service 2</p>
            <p>dd.mm.yyyy</p>
          </div>
        </div>

        <div class="actions">
          <span>
            <icon name="download-document" />
            <a href="#" class="link-text">Download</a>
          </span>
          <a href="#" class="link-text">Reject</a>
        </div>
      </div>
      <div class="offer">
        <input type="radio" />
        <h5 class="lender-name">Lender Name 3</h5>
        <div class="offer-document">
          <div class="document-type">
            <p>PDF</p>
          </div>
          <div class="document-info">
            <p class="document-name">Terms and Service 3</p>
            <p>dd.mm.yyyy</p>
          </div>
        </div>

        <div class="actions">
          <span>
            <icon name="download-document" />
            <a href="#" class="link-text">Download</a>
          </span>
          <a href="#" class="link-text">Reject</a>
        </div>
      </div>
      <div class="offer">
        <input type="radio" />
        <h5 class="lender-name">Lender Name 4</h5>
        <div class="offer-document">
          <div class="document-type">
            <p>PDF</p>
          </div>
          <div class="document-info">
            <p class="document-name">Terms and Service 4</p>
            <p>dd.mm.yyyy</p>
          </div>
        </div>

        <div class="actions">
          <span>
            <icon name="download-document" />
            <a href="#" class="link-text">Download</a>
          </span>
          <a href="#" class="link-text">Reject</a>
        </div>
      </div>
    </div>
    <div class="offer-footer">
      <SquareButton
        background="#3a9eba"
        color="#ffffff"
        maxWidth="170px"
        :disabled="true"
        >Accept the deal</SquareButton
      >
      <SquareButton background="#ffffff" color="#3a9eba" maxWidth="170px"
        >Stop the deal</SquareButton
      >
    </div>
  </div>
</template>
<script>
import SquareButton from '@/components/SquareButton.vue';
export default {
  components: {
    SquareButton,
  },
};
</script>
<style scoped>
p {
  font-size: 12px;
  margin-bottom: 0;
}
.offer {
  width: 100%;
  display: inline-flex;
  align-items: center;
  margin-top: 20px;
}
h5.lender-name {
  font-weight: bold;
  font-size: 14px;
  color: #707d8c;
  margin-left: 12px;
  margin-bottom: 0;
}

.offer-document {
  display: inline-flex;
  align-items: center;
}
.document-type {
  background: linear-gradient(156.09deg, #d0e4fb -9.74%, #f3f7fc 111.18%);
  border-radius: 6px;
  padding: 10px 7px;
  margin-right: 16px;
}
.document-type p {
  font-size: 10px;
  font-weight: bold;
  color: #4289da;
}
.document-info p {
  font-size: 12px;
  color: #93a0ae;
  font-weight: 600;
  line-height: 16px;
}
p.document-name {
  color: #253242;
}

.offer-document,
.actions {
  margin-left: auto;
}
.actions svg {
  margin: 0 6px 1px 0;
}
.actions span {
  margin-right: 20px;
}
.offer-footer button {
  margin-top: 24px;
  display: inline;
  box-shadow: none;
}
</style>
