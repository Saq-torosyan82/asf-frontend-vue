<template>
  <div>
    <div class="club-general component">
      <div class="club-header">
        <h3 class="club-header">Team</h3>
        <a href="#" class="link-text" @click="showModal = true"
          ><icon name="edit-icon" />Edit</a
        >
      </div>
      <div class="club-image"></div>
      <div class="club-name">
        <h3>Borussia Dortmund</h3>
        <img src="@/assets/img/Country-flag.png" alt="Flag" />
      </div>
      <h3 class="section-header">Company information</h3>

      <b-row>
        <b-col>
          <div class="text-with-label">
            <label>Name</label>
            <p>Skye Graham</p>
          </div>
        </b-col>
        <b-col>
          <div class="text-with-label">
            <label>Job</label>
            <p>CEO</p>
          </div>
        </b-col>
      </b-row>
      <div class="text-with-label">
        <label>Owners</label>
        <p>Borussia Dortmund GmbH & Co KGaA</p>
      </div>
      <div class="text-with-label">
        <label>Manager</label>
        <p>Reingard Rauball</p>
      </div>
      <hr />
      <h3 class="section-header">Basic information</h3>
      <b-row>
        <b-col>
          <div class="text-with-label">
            <label>League (20/21)</label>
            <p>Bundesliga 1</p>
          </div>
        </b-col>
        <b-col>
          <div class="text-with-label">
            <label>Year of foundation</label>
            <p>1909</p>
          </div>
        </b-col>
      </b-row>
      <div class="sponsors">
        <div>
          <p class="sponsor-label">League</p>
          <img src="@/assets/img/dashboard/Bundesliga_logo.png" />
        </div>

        <div>
          <p class="sponsor-label">Confederation</p>
          <img src="@/assets/img/dashboard/uefa-logo.png" />
        </div>

        <div>
          <p class="sponsor-label">Football association</p>
          <img
            src="@/assets/img/dashboard/german-football-association_logo.png"
          />
        </div>
      </div>

      <hr />
      <h3 class="section-header">Address</h3>
      <div class="text-with-label">
        <label>Street</label>
        <p>Rheinlanddamm 207-209</p>
      </div>
      <b-row>
        <b-col>
          <div class="text-with-label">
            <label>City</label>
            <p>Dortmund</p>
          </div>
        </b-col>
        <b-col>
          <div class="text-with-label">
            <label>ZIP - Post code</label>
            <p>44137</p>
          </div>
        </b-col>
      </b-row>
      <hr />
      <h3 class="section-header">Home stadium</h3>
      <div class="text-with-label">
        <label>Stadium name</label>
        <p>Signal Iduna Park</p>
      </div>
      <b-row>
        <b-col>
          <div class="text-with-label">
            <label>Capacity</label>
            <p>81,365</p>
          </div>
        </b-col>
        <b-col>
          <div class="text-with-label">
            <label>Year appened</label>
            <p>1974</p>
          </div>
        </b-col>
      </b-row>
      <div class="text-with-label">
        <label>City</label>
        <p>Dortmund</p>
      </div>
      <hr />
      <h3 class="section-header">Current sponsors</h3>
      <div class="sponsors">
        <div>
          <p class="sponsor-label">Shirt sponsor</p>
          <img src="@/assets/img/dashboard/1n1.png" />
          <p class="sponsor-name">1&1</p>
        </div>

        <div>
          <p class="sponsor-label">Sleeve sponsor</p>
          <img src="@/assets/img/dashboard/opel.png" />
          <p class="sponsor-name">Opel</p>
        </div>

        <div>
          <p class="sponsor-label">Kit sponsor</p>
          <img src="@/assets/img/dashboard/puma.png" />
          <p class="sponsor-name">Puma</p>
        </div>
        <div>
          <p class="sponsor-label">Main partners</p>
          <img src="@/assets/img/dashboard/signaliduna.png" />
          <p class="sponsor-name">Signal Iduna Park</p>
        </div>

        <div>
          <img src="@/assets/img/dashboard/bwin.png" />
          <p class="sponsor-name">Bwin</p>
        </div>

        <div>
          <img src="@/assets/img/dashboard/opel.png" />
          <p class="sponsor-name">Opel</p>
        </div>
        <div>
          <img src="@/assets/img/dashboard/hankok.png" />
          <p class="sponsor-name">Hankook</p>
        </div>
      </div>

      <hr />
      <h3 class="section-header">Social media followers</h3>
      <table class="social-followers">
        <tr>
          <td class="icon"><icon name="facebook-color" /></td>
          <td class="name">Facebook</td>
          <td>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{ width: 90 + '%' }"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </td>
          <td class="legend">15,14M</td>
        </tr>
        <tr>
          <td class="icon">
            <icon name="instagram-color" />
          </td>
          <td class="name">Instagram</td>
          <td>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{ width: 65 + '%' }"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </td>
          <td class="legend">11,86M</td>
        </tr>
        <tr>
          <td class="icon"><icon name="twitter-color" /></td>
          <td class="name">Twitter</td>
          <td>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{ width: 45 + '%' }"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </td>
          <td class="legend">6,65M</td>
        </tr>
        <tr>
          <td class="icon"><icon name="youtube-color" /></td>
          <td class="name">YouTube</td>
          <td>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{ width: 15 + '%' }"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </td>
          <td class="legend">0.69M</td>
        </tr>
      </table>

      <label>Followers as of 2020-11-01</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeneralClubInfo',
};
</script>

<style scoped>
.club-image {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: 0 auto;
  border: 8px solid #dbe7f4;
  box-sizing: content-box;
  background-position: center;
  /*background-image: url("./assets/img/dashboard/bvb.png");*/
  background-size: cover;
  overflow: hidden;
}
</style>
