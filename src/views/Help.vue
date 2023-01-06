<template>
  <div class="content">
    <HeaderNavigation>Help</HeaderNavigation>

    <b-tabs class="help-content-component">
      <b-tab title="Contact us" active>
        <div class="component contact-us">
          <p>Want to get in touch? We'd love to hear from you.</p>
          <p>Choose a department and find out how you can reach us.</p>
          <div>
            <span class="accordion">Sales team >></span>
            <div class="panel">
              <div class="image-row inline">
                <div class="item">
                  <img src="../assets/img/team/James Beaumont.jpg" />
                  <p>James Beaumont</p>
                </div>
                <div class="item">
                  <img src="../assets/img/team/Nick Hare.png" />
                  <p>Nick Hare</p>
                </div>
                <div class="item">
                  <img src="../assets/img/team/Daniel Hunt.png" />

                  <p>Daniel Hunt</p>
                </div>
                <div class="item">
                  <img src="../assets/img/team/Jordan Watson.png" />

                  <p>Jordan Watson</p>
                </div>
              </div>
              <p>
                A dynamic team who have worked across the capital markets and
                sports for over 60 years at EPL clubs, Nike, Umbro, FinTech
                companies, private funds, Cisco and Garther.
              </p>
              <a href="mailto:sales@sportsfi.com">sales@sportsfi.com</a>
              <span>UK: +44 20 9876543</span>
              <span>USA: +1 76 9764836</span>
            </div>
            <span class="accordion">Legal team >></span>
            <div class="panel">
              <a href="mailto:legal@sportsfi.com">legal@sportsfi.com</a>
              <span>UK: +44 20 9876543</span>
              <span>USA: +1 76 9764836</span>
            </div>
            <span class="accordion">Credit team >></span>
            <div class="panel">
              <p>
                The team has over 100 years of experience across both the
                financial markets and institutions including J.P. Morgan,
                Hermes, Axis Bank, Barclays, Credit Suisse, Thincats and 23
                Capital.
              </p>
              <div class="image-row inline">
                <div class="item">
                  <img src="../assets/img/team/Zoe Shaw.png" />
                  <p>Zoe Shaw</p>
                </div>
                <div class="item">
                  <img src="../assets/img/team/Tushar Solaskar.png" />
                  <p>Tushar Solaskar</p>
                </div>
                <div class="item">
                  <img src="../assets/img/team/Farhan Ali.png" />

                  <p>Farhan Ali</p>
                </div>
                <div class="item">
                  <img src="../assets/img/team/James Paul.png" />

                  <p>James Paul</p>
                </div>
              </div>
              <br />
              <a href="mailto:support@sportsfi.com">support@sportsfi.com</a>
              <span>UK: +44 20 9876543</span>
              <span>USA: +1 76 9764836</span>
            </div>
            <span class="accordion">Technical support >></span>
            <div class="panel">
              <p>
                Leading the technology build out and production integration.
                Including the development of web 3.0 and blockchain technologies
                to enhance user engagement and adoption.
              </p>
              <a href="mailto:it@sportsfi.com">it@sportsfi.com</a>
              <span>UK: +44 20 9876543</span>
              <span>USA: +1 76 9764836</span>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="FAQ">
        <div class="component">
          <p>Text</p>
        </div>
      </b-tab>
      <b-tab title="Video tutorials">
        <div class="component">
          <p>Text</p>
        </div>
      </b-tab>
      <b-tab title="User manuals">
        <div class="component">
          <p>Text</p>
        </div>
      </b-tab>
      <b-tab title="Find out more">
        <div class="component">
          <p>Text</p>
        </div>
      </b-tab>
    </b-tabs>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import { horizontalScroll } from '../main';
export default {
  components: {
    HeaderNavigation,
    Footer,
  },
  mounted() {
    horizontalScroll();

    var acc = document.getElementsByClassName('accordion');
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active');

        var panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'block';
        }
      });
    }
  },
};
</script>
<style lang="scss" scoped>
//////////////////////////////////////
///// Layout
//////////////////////////////////////
.help-content-component {
  margin-top: 30px;
  .component {
    /*  TO BE REMOVED WHEN CONENT ARRIVES  */
    min-height: calc(100vh - 221px);
  }

  .contact-us {
    p:first-child {
      padding-top: 5px;
    }

    p:not(:first-child) {
      padding-top: 5px;
      font-size: 14px;
    }

    > div {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 30px 0 0;
    }

    .accordion {
      cursor: pointer;
      width: 100%;
      text-align: left;
      border: none;
      outline: none;
      font-weight: bold;
      font-size: 14px;
    }

    .accordion:not(:first-child) {
      padding-top: 15px;
    }

    .panel {
      display: none;
      overflow: hidden;
      font-size: 14px;
      padding-top: 15px;

      span,
      a {
        font-weight: bold;
      }

      span {
        display: flex;
        flex: 1;
        flex-direction: column;
      }
    }
  }
}

.image-row {
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  .item {
    text-align: center;
  }
  img {
    width: 70px;
    height: 70px;
    aspect-ratio: 1;
    border-radius: 50%;
    outline: 5px solid #89ccdd;
    border: 2px solid white;
    margin: 7px;
  }
}
</style>
