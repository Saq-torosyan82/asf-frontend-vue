<template>
  <div class="modal-wrapper">
    <div class="modal-base">
      <div class="modal-header">
        <h5>Edit your data</h5>
        <div @click="$emit('closed')">
          <icon name="close" />
        </div>
      </div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Personal information" active
            ><b-card-text>
              <h2>Address</h2>
              <SelectInput label="Country" name="country">
                <select>
                  <option value="" disabled selected hidden>
                    Choose your country from the list
                  </option>
                  <option class="option" value="1">Australia</option>
                  <option class="option" value="2">United Kingdom</option>
                  <option class="option" value="3">
                    United States Of America
                  </option>
                </select>
              </SelectInput>
              <CustomInput label="Street address" name="street-address">
                <input type="text" placeholder="Street address" />
              </CustomInput>
              <b-row>
                <b-col
                  ><CustomInput label="State (optional)" name="state">
                    <input type="text" placeholder="State" /> </CustomInput
                ></b-col>
                <b-col
                  ><CustomInput label="City" name="City">
                    <input type="text" placeholder="City" /> </CustomInput
                ></b-col>
                <b-col
                  ><CustomInput label="ZIP - Post code" name="zipcode">
                    <input type="text" placeholder="Post code" /> </CustomInput
                ></b-col> </b-row></b-card-text
          ></b-tab>
          <b-tab title="Athlete information"
            ><b-card-text>
              <h2>Athlete information</h2>
              <b-row>
                <b-col>
                  <SelectInput label="Current team" name="club">
                    <select>
                      <option value="" disabled selected hidden>Arsenal</option>
                      <option class="option" value="1">Arsenal</option>
                      <option class="option" value="2">Arsenal</option>
                      <option class="option" value="3">Arsenal</option>
                      <option class="option" value="4">Arsenal</option>
                      <option class="option" value="5">Arsenal</option>
                      <option class="option" value="6">Arsenal</option>
                    </select>
                  </SelectInput>
                </b-col>
                <b-col>
                  <SelectInput label="Agent" name="agent">
                    <select>
                      <option value="" disabled selected hidden>Agent</option>
                      <option class="option" value="1">Arsenal</option>
                      <option class="option" value="2">Arsenal</option>
                      <option class="option" value="3">Arsenal</option>
                      <option class="option" value="4">Arsenal</option>
                      <option class="option" value="5">Arsenal</option>
                      <option class="option" value="6">Arsenal</option>
                    </select>
                  </SelectInput>
                </b-col>
              </b-row>

              <h2>Endorsement deals</h2>
              <div class="endorsement-deals">
                <div class="deal">
                  <img src="../assets/img/dashboard/hummel.png" alt="" />
                  <p>Hummel</p>
                  <div class="actions">
                    <a href="#" class="edit"><icon name="edit-icon" />Edit</a>
                    <a href="#" class="delete"><icon name="close" />Delete</a>
                  </div>
                </div>
                <div class="deal">
                  <img src="../assets/img/dashboard/kappa.png" alt="" />
                  <p>Kappa</p>
                  <div class="actions">
                    <a href="#" class="edit"><icon name="edit-icon" />Edit</a>
                    <a href="#" class="delete"><icon name="close" />Delete</a>
                  </div>
                </div>
                <div class="deal">
                  <img src="../assets/img/dashboard/lacoste.png" alt="" />
                  <p>Lacoste</p>
                  <div class="actions">
                    <a href="#" class="edit"><icon name="edit-icon" />Edit</a>
                    <a href="#" class="delete"><icon name="close" />Delete</a>
                  </div>
                </div>
                <div class="deal">
                  <img src="../assets/img/dashboard/lecoq.png" alt="" />
                  <p>Le Coq Sportif</p>
                  <div class="actions">
                    <a href="#" class="edit"><icon name="edit-icon" />Edit</a>
                    <a href="#" class="delete"><icon name="close" />Delete</a>
                  </div>
                </div>
                <a href="#" class="link-text">+ Add a new deal</a>
              </div>
              <a href="#" class="button">Save</a>
            </b-card-text></b-tab
          >
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import SelectInput from '@/components/SelectInput.vue';
import CustomInput from '@/components/CustomInput.vue';
export default {
  components: { SelectInput, CustomInput },
};
</script>

<style scoped>
a {
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
}
a.button {
  display: block;
  width: 200px;
  padding: 17px 0;
  margin: 30px auto 0;
  background-color: var(--primary);
  color: white;
  text-align: center;
  border-radius: 4px;
}
a.link-text {
  color: #3a9eba;
  display: block;
  text-align: center;
}

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: 105;
  background-color: rgba(37, 50, 66, 0.75);
}
.modal-base {
  width: 750px;
  min-height: 500px;
  background: #ffffff;
  border-radius: 6px;
  margin: 50px auto auto;
  text-align: center;
  padding: 48px;
}
.modal-header {
  padding: 0 1rem 1rem;
  border-bottom: 1px solid #d9dbde;
}
.modal-header h5 {
  margin-bottom: 0;
}
.modal-header svg {
  height: 16px;
  width: 16px;
  cursor: pointer;
}
.modal-base ::v-deep .card {
  border: none;
  text-align: left;
}

.modal-base ::v-deep .nav {
  background-color: white;
  border-right: 1px solid #d9dbde;
  padding-left: 0;
}
.modal-base::v-deep .nav-link {
  font-size: 16px;
  font-weight: 700;
  color: #a8adb3;
}
.modal-base::v-deep .nav-link.active {
  color: #3a9eba;
  background-color: white;
}

/*CONTENT*/
.modal-base h2 {
  font-size: 16px;
  font-weight: 700;
  margin: 40px 0 0;
}
.modal-base h2:first-of-type {
  margin-top: 10px;
}
/*Endorsement deals*/
.deal {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.deal:first-of-type {
  margin-top: 16px;
}
.deal img {
  border-radius: 50%;
  border: 1px solid #e9e9e9;
}
.deal p {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 0 10px;
}
.deal .actions {
  margin-left: auto;
}
.deal a {
  margin-left: 16px;
}
.deal a svg {
  margin-right: 6px;
  margin-bottom: 2.5px;
  height: 12px;
  width: 12px;
}
.deal a.edit,
a.edit ::v-deep svg path {
  color: #3a9eba;
  fill: #3a9eba;
}
.deal a.delete,
a.delete ::v-deep svg path {
  color: #f61c0d;
  fill: #f61c0d;
}
/* Personal information */
.input-wrap {
  margin-top: 16px;
}
</style>
